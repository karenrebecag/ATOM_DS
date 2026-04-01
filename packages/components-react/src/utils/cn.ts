/**
 * Utility for merging class names conditionally
 * Lightweight alternative to clsx/classnames
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((x): x is string | number => {
      if (typeof x === 'string') return x.length > 0;
      if (typeof x === 'number') return true;
      return false;
    })
    .join(' ');
}
