import { type ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './GradientButton.module.css';

type GradientButtonProps = {
  size: 'small' | 'medium';
  children: ReactNode;
  className?: string;
  onClick?: () => VoidFunction;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function GradientButton({
  size,
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: GradientButtonProps): ReactElement {
  const buttonClassNames = clsx(styles.button, styles[size], className, {
    [styles.disabled]: disabled,
  });

  return (
    <button
      className={buttonClassNames}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
