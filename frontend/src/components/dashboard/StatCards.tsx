import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { statCards } from '../../data/dashboard';

export function StatCards() {
  return (
    <ul className="grid grid-cols-2 gap-5 xl:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <li
            key={card.id}
            className={`flex flex-col rounded-card border p-5 ${
            card.isActionable ? 'border-accent bg-notice' : 'border-line bg-surface'}`
            }>
            
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-ink-soft">{card.label}</span>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                card.isActionable ? 'bg-accent text-ink' : 'bg-primary-light text-primary'}`
                }>
                
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold text-ink">{card.value}</p>
            {card.isActionable ?
            <Link to="/studio" className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold text-ink hover:underline">
                {card.note}
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
              </Link> :

            <p className="mt-auto pt-2 text-sm text-ink-soft">{card.note}</p>
            }
          </li>);

      })}
    </ul>);

}