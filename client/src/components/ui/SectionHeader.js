import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Reusable section header: eyebrow pill + gradient title + subtitle.
 * Follows the Awon design system (see awon-design skill).
 */
const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  eyebrowIcon: EyebrowIcon,
}) => {
  const alignment =
    align === 'start'
      ? 'text-start items-start'
      : 'text-center items-center';

  return (
    <div className={cn('mb-10 flex flex-col md:mb-12', alignment, className)}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {EyebrowIcon && <EyebrowIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={cn(
            'text-gradient text-3xl font-extrabold tracking-tight md:text-4xl',
            titleClassName
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
