import React from 'react';

interface SectionHeadingProps {
  id: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-[640px]">
      <h2 id={id} className="text-3xl font-bold leading-snug text-ink md:text-[36px]">
        {title}
      </h2>
      {description && <p className="mt-3 text-ink-soft">{description}</p>}
    </div>);

}