import { useEffect, useMemo, useRef, useState } from 'react';
import { MAX_OPTIONS, MIN_OPTIONS, exerciseTemplates } from '../data/studio';
import type { DraftErrors, ExerciseDraft, ExerciseTemplate, SaveState, TemplateId } from '../types/studio';

let idSeed = 0;
const makeId = () => `opt-${++idSeed}`;

function draftFromTemplate(template: ExerciseTemplate, base?: ExerciseDraft): ExerciseDraft {
  const options = template.defaults.options.map((text) => ({ id: makeId(), text }));
  return {
    templateId: template.id,
    question: template.defaults.question,
    audioText: template.defaults.audioText,
    options,
    correctId: options[0].id,
    difficulty: base?.difficulty ?? 'easy',
    assigneeId: base?.assigneeId ?? ''
  };
}

function validate(draft: ExerciseDraft): DraftErrors {
  const errors: DraftErrors = {};
  if (!draft.question.trim()) errors.question = 'اكتب نص السؤال.';
  if (!draft.audioText.trim()) errors.audioText = 'اكتب الكلمة التي سيسمعها الطفل.';
  if (draft.options.some((o) => !o.text.trim())) errors.options = 'املأ جميع الخيارات أو احذف الفارغ منها.';
  if (!draft.assigneeId) errors.assigneeId = 'اختر الطفل الذي سيُكلَّف بالتمرين.';
  return errors;
}

export function useStudioForm() {
  const [draft, setDraft] = useState<ExerciseDraft>(() => draftFromTemplate(exerciseTemplates[1]));
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [showErrors, setShowErrors] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const errors = useMemo(() => validate(draft), [draft]);
  const visibleErrors: DraftErrors = showErrors ? errors : {};
  const template = exerciseTemplates.find((t) => t.id === draft.templateId) ?? exerciseTemplates[0];

  const update = (patch: Partial<ExerciseDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setSaveState('idle');
  };

  const selectTemplate = (id: TemplateId) => {
    const next = exerciseTemplates.find((t) => t.id === id);
    if (!next || id === draft.templateId) return;
    setDraft((d) => draftFromTemplate(next, d));
    setSaveState('idle');
  };

  const updateOption = (id: string, text: string) =>
  update({ options: draft.options.map((o) => o.id === id ? { ...o, text } : o) });

  const addOption = () => {
    if (draft.options.length >= MAX_OPTIONS) return;
    update({ options: [...draft.options, { id: makeId(), text: '' }] });
  };

  const removeOption = (id: string) => {
    if (draft.options.length <= MIN_OPTIONS) return;
    const options = draft.options.filter((o) => o.id !== id);
    update({ options, correctId: id === draft.correctId ? options[0].id : draft.correctId });
  };

  const runSave = (pending: SaveState, done: SaveState) => {
    setSaveState(pending);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaveState(done), 800);
  };

  const saveDraft = () => runSave('saving', 'saved');

  const publish = () => {
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      return;
    }
    runSave('publishing', 'published');
  };

  return {
    draft,
    template,
    errors: visibleErrors,
    hasErrors: showErrors && Object.keys(errors).length > 0,
    saveState,
    update,
    selectTemplate,
    updateOption,
    addOption,
    removeOption,
    saveDraft,
    publish
  };
}