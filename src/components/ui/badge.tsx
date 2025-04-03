import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { BADGE_VARIANTS } from '@/utils/constants/badge-constants';

// 1. تعريف الأنماط باستخدام class-variance-authority
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// 2. تعريف الـ Props
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// 3. دمج الأنماط مع الثوابت
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant }), // الأنماط الديناميكية من cva
          BADGE_VARIANTS[variant || 'default'], // الأنماط الثابتة من constants
          className // الأنماط الإضافية من المستخدم
        )}
        {...props}
      />
    );
  }
);

// 4. إضافة اسم للمكون للمساعدة في التصحيح
Badge.displayName = 'Badge';

export default Badge;
