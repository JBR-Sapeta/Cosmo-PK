import { type ReactElement, type ChangeEvent, useState } from 'react';
import styles from './BaseInput.module.css';
import {isEmpty} from 'ramda';
import clsx from 'clsx';

type BaseInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  label?: { id: string; text: string };
} & Partial<HTMLInputElement>;

export function BaseInput({
  id,
  value,
  error,
  className,
  onChange,
  type,
  placeholder,
  label,
}: BaseInputProps): ReactElement {
  const [focused, setFocused] = useState<boolean>(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const containerClassName = clsx(styles.baseInput, className, {
    [styles.hasError]: !isEmpty(error),
  });

  console.log(focused);
  return (
    <div className={containerClassName}>
      {label && <label htmlFor={label.id}>{label.text}</label>}
      <input
        id={label?.id || id || ''}
        type={type}
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
