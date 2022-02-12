import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';
import { Link, LinkProps } from 'remix';

export type ButtonClassNameProps = {
  isActive?: boolean;
  primary?: boolean;
  full?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

// secondary text-blue-700 bg-blue-100
export function buttonClassName({
  isActive = false,
  size = 'md',
  primary = false,
  full = false,
  className,
}: ButtonClassNameProps) {
  return clsx(
    'inline-flex items-center border shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75',
    primary ? 'border-transparent text-white' : 'border-gray-300 text-gray-700',
    primary
      ? isActive
        ? 'bg-blue-700'
        : 'bg-blue-600 hover:bg-blue-700'
      : isActive
      ? 'bg-gray-200'
      : 'bg-white hover:bg-gray-50',
    {
      'px-2.5 py-1.5 text-xs rounded': size == 'sm',
      'px-3 py-2 text-sm leading-4 rounded-md': size == 'md',
      'px-4 py-2 text-sm rounded-md': size == 'lg',
      'w-full flex justify-center': full,
    },
    className
  );
}

export type ButtonProps = ComponentPropsWithRef<'button'> &
  ButtonClassNameProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, size, primary, full, className, type = 'button', ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName({ size, primary, full, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export type ButtonLinkProps = LinkProps & ButtonClassNameProps;

export const LinkButton = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, size, primary, full, className, to, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        to={to}
        className={buttonClassName({
          size,
          primary,
          full,
          className,
        })}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
