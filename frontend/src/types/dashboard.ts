import type { LucideIcon } from 'lucide-react';

export type CaseStatus = 'progressing' | 'needs-attention' | 'inactive' | 'new';

export type DifficultyKey = 'dyslexia' | 'dysgraphia' | 'dyscalculia' | 'attention';

export interface ProgressPoint {
  label: string;
  score: number;
}

export interface WeakArea {
  skill: string;
  score: number;
}

export interface ChildCase {
  id: string;
  nickname: string;
  ageGroup: string;
  difficulty: DifficultyKey;
  lastActivity: string;
  mastery: number;
  status: CaseStatus;
  progress: ProgressPoint[];
  weakAreas: WeakArea[];
}

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  to?: string;
  href?: string;
  badge?: number;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  isActionable?: boolean;
}