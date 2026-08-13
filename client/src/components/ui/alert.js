import React from 'react';
import { cn } from '../../lib/utils';

const alertVariants = {
  default: 'border-border bg-card text-card-foreground shadow-glass',
  success: 'border-success/30 bg-success/10 text-success-foreground',
  warning: 'border-warning/30 bg-warning/10 text-warning-foreground',
  error: 'border-destructive/30 bg-destructive/10 text-destructive-foreground',
  info: 'border-secondary/30 bg-secondary/10 text-secondary-foreground',
};

export const Alert = React.forwardRef(({ className, variant = 'default', icon: Icon, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative flex items-start gap-3 rounded-xl border p-4 text-sm',
        alertVariants[variant] || alertVariants.default,
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="mt-0.5 shrink-0 text-lg" aria-hidden="true">
          <Icon />
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
});
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-semibold leading-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
