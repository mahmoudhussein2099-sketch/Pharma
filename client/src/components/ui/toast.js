import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';

const ToastContext = React.createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  toast: () => {},
});

let toastCount = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, description, action, duration = 4000, variant = 'default' }) => {
      const id = ++toastCount;
      const newToast = { id, title, description, action, variant, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [removeToast]
  );

  const toast = useCallback(
    (message, options = {}) => {
      if (typeof message === 'string') {
        return addToast({ ...options, title: message });
      }
      return addToast(message);
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts.length) return null;
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-4 z-[600] flex flex-col gap-3 md:top-6 md:end-4 md:max-w-sm"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  );
};

const variantClasses = {
  default: 'border-border bg-card text-card-foreground shadow-glass',
  success: 'border-success/30 bg-success/10 text-success-foreground',
  warning: 'border-warning/30 bg-warning/10 text-warning-foreground',
  error: 'border-destructive/30 bg-destructive/10 text-destructive-foreground',
  info: 'border-secondary/30 bg-secondary/10 text-secondary-foreground',
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const Toast = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-testid="toast"
      className={cn(
        'pointer-events-auto w-full rounded-xl border p-4 text-sm shadow-lg',
        'animate-in slide-in-from-top-2 fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-8 data-[state=closed]:zoom-out-95',
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = 'Toast';

export const ToastItem = ({ toast, onRemove }) => {
  const { toast: toastCtx } = useToast();

  const handleRemove = useCallback(() => {
    onRemove(toast.id);
  }, [toast.id, onRemove]);

  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(handleRemove, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, handleRemove]);

  return (
    <Toast
      variant={toast.variant}
      className="relative pr-10"
      role="status"
      aria-live="polite"
    >
      {toast.title && (
        <div className="font-semibold" data-testid="toast-title">
          {toast.title}
        </div>
      )}
      {toast.description && (
        <div
          className="mt-1 text-sm opacity-90"
          data-testid="toast-description"
        >
          {toast.description}
        </div>
      )}
      {toast.action && (
        <button
          type="button"
          className={cn(
            'absolute end-2 top-2 rounded-md p-1 font-medium text-xs underline-offset-4 hover:underline'
          )}
          onClick={() => {
            toast.action.onClick?.();
            handleRemove();
          }}
        >
          {toast.action.label}
        </button>
      )}
      <button
        type="button"
        aria-label="Close"
        className="absolute end-2 top-2 rounded-full p-1 opacity-60 hover:opacity-100"
        onClick={handleRemove}
      >
        ✕
      </button>
    </Toast>
  );
};

export const ToastAction = ({ toast, ...props }) => {
  if (!toast?.action) return null;
  return <button {...props} />;
};

export const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold', className)}
    {...props}
    data-testid="toast-title"
  />
));
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-1 text-sm opacity-90', className)}
    {...props}
    data-testid="toast-description"
  />
));
ToastDescription.displayName = 'ToastDescription';

export const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute end-2 top-2 rounded-full p-1 opacity-60 hover:opacity-100',
      className
    )}
    {...props}
  >
    ✕
  </button>
));
ToastClose.displayName = 'ToastClose';
