import React from 'react';
import { Sidebar } from './Sidebar';

interface SpecialistLayoutProps {
  children: React.ReactNode;
}

export function SpecialistLayout({ children }: SpecialistLayoutProps) {
  return (
    <div className="min-h-screen w-full min-w-[1024px] bg-cream">
      <Sidebar />
      <div className="ms-64 min-h-screen">{children}</div>
    </div>);

}