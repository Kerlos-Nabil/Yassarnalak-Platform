import React from "react";
import { CirclePauseIcon, SparklesIcon, TrendingUpIcon, TriangleAlertIcon, BoxIcon } from "lucide-react";
import { statusLabels } from "../../data/dashboard";
import { CaseStatus } from "../../types/dashboard";
const statusStyles: Record<CaseStatus, {
  className: string;
  icon: BoxIcon;
}> = {
  progressing: {
    className: 'bg-success-tint text-success-ink',
    icon: TrendingUpIcon
  },
  'needs-attention': {
    className: 'bg-notice text-warning-ink',
    icon: TriangleAlertIcon
  },
  inactive: {
    className: 'bg-error-tint text-error',
    icon: CirclePauseIcon
  },
  new: {
    className: 'bg-primary-light text-primary',
    icon: SparklesIcon
  }
};
interface StatusBadgeProps {
  status: CaseStatus;
}
export function StatusBadge({
  status
}: StatusBadgeProps) {
  const {
    className,
    icon: Icon
  } = statusStyles[status];
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm font-bold ${className}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {statusLabels[status]}
    </span>;
}