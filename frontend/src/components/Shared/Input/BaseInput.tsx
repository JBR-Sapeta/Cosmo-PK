import { type ReactElement, type ChangeEvent, useState } from 'react';
import styles from './BaseInput.module.css';
import { isEmpty } from 'ramda';
import clsx from 'clsx';

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  label?: { id: string; text: string };
} & Partial<HTMLInputElement>;

export function BaseInput({
  id,
  value,
  name,
  error,
  className,
  onChange,
  type,
  placeholder,
  label,
}: Props): ReactElement {
  const [focused, setFocused] = useState<boolean>(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const containerClassName = clsx(styles.baseInput, className, {
    [styles.hasError]: !isEmpty(error),
  });

  return (
    <div className={containerClassName}>
      {label && <label htmlFor={label.id}>{label.text}</label>}
      <input
        id={label?.id || id || ''}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <span>{error}</span>
    </div>
  );
}
