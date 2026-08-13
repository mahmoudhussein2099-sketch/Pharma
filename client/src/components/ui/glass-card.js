import React from 'react';
import { cn } from '../../lib/utils';

const glassVariants = {
  base: 'rounded-2xl border bg-[var(--glass-bg)]',
  bordered: 'border-[var(--glass-border)]',
  elevated: 'shadow-glass dark:shadow-glass-dark',
  premium: 'shadow-premium',
  interactive: 'transition-all duration-normal hover:shadow-xl',
  float: 'animate-float',
};

export const GlassCard = React.forwardRef(
  ({ className, variant = 'base', hover = false, ...props }, ref) => {
    const classes = cn(
      'backdrop-blur-xl',
      glassVariants.base,
      glassVariants.bordered,
      glassVariants.elevated,
      variant === 'premium' && glassVariants.premium,
      hover && glassVariants.interactive,
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          background: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
        }}
        {...props}
      />
    );
  }
);
GlassCard.displayName = 'GlassCard';

export const GlassCardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
GlassCardHeader.displayName = 'GlassCardHeader';

export const GlassCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
GlassCardTitle.displayName = 'GlassCardTitle';

export const GlassCardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
GlassCardDescription.displayName = 'GlassCardDescription';

export const GlassCardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0', className)}
    {...props}
  />
));
GlassCardContent.displayName = 'GlassCardContent';

export const GlassCardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
GlassCardFooter.displayName = 'GlassCardFooter';
