import React, { useRef, useState } from 'react';
import { CheckCircle2Icon, FileTextIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { maxFileMb } from '../../data/signup';

interface FileDropProps {
  id: string;
  label: string;
  hint?: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export function FileDrop({ id, label, hint, file, onChange }: FileDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const accept = (f: File | undefined) => {
    if (!f) return;
    const okType = /(pdf|png|jpe?g)$/i.test(f.name);
    if (!okType) {
      setError('الملفات المقبولة: PDF أو صورة (JPG / PNG)');
      return;
    }
    if (f.size > maxFileMb * 1024 * 1024) {
      setError(`الحجم الأقصى ${maxFileMb} ميجا`);
      return;
    }
    setError('');
    onChange(f);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-ink">
        {label}
      </label>
      {hint && <p className="text-sm text-ink-soft">{hint}</p>}

      {file ?
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-success/40 bg-success-tint p-4">
          <CheckCircle2Icon className="h-6 w-6 shrink-0 text-success-ink" aria-hidden="true" />
          <FileTextIcon className="h-5 w-5 shrink-0 text-success-ink" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate text-base font-semibold text-ink">{file.name}</span>
          <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="إزالة الملف"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white">
          
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div> :

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {e.preventDefault();setDragging(true);}}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files[0]);
        }}
        className={`mt-2 flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors duration-200 ${
        dragging ? 'border-primary bg-primary-light' : 'border-line bg-surface hover:border-primary hover:bg-primary-light/50'}`
        }>
        
          <UploadCloudIcon className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="text-base font-bold text-ink">اضغط للرفع أو اسحب الملف هنا</span>
          <span className="text-sm text-ink-soft">PDF أو صورة — حتى {maxFileMb} ميجا</span>
        </button>
      }
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="sr-only"
        onChange={(e) => accept(e.target.files?.[0])} />
      
      {error && <p role="alert" className="mt-2 text-sm font-semibold text-error">{error}</p>}
    </div>);

}
