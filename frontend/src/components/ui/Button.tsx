import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
type ButtonSize = 'md' | 'lg' | 'xl';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-soft',
  secondary: 'border-2 border-primary bg-transparent text-primary hover:bg-primary-light',
  accent: 'bg-accent text-ink hover:bg-accent-hover hover:shadow-soft',
  ghost: 'bg-transparent text-primary hover:bg-primary-light'
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-[48px] px-6 text-base',
  lg: 'min-h-[56px] px-8 text-lg',
  xl: 'min-h-[64px] px-10 text-xl'
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  fullWidth,
  className = '',
  ariaLabel
}: ButtonProps) {
  const classes = [
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold',
  'transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
  'hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60',
  '[&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0',
  variantClasses[variant],
  sizeClasses[size],
  fullWidth ? 'w-full' : '',
  className].
  join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>);

  }
  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>);

  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {children}
    </button>);

}