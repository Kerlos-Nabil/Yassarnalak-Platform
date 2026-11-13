import type { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface IconTextItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface DifficultyItem extends IconTextItem {
  href: string;
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  focus: string;
  avatar: string;
}

export interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}