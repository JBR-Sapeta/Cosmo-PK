/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { ReactElement, ChangeEvent } from 'react';
import type { IconType } from 'react-icons';
import { isEmpty, isNil } from 'ramda';
import clsx from 'clsx';
import styles from './BaseInput.module.css';

type Props = {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: { id: string; text: string };
  Icon?: IconType;
  error?: string;
} & Partial<HTMLInputElement>;

export function BaseInput({
  id,
  value,
  name,
  className,
  onChange,
  type,
  placeholder,
  label,
  Icon,
  error,
}: Props): ReactElement {
  const [focused, setFocused] = useState<boolean>(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const containerClassName = clsx(styles.container, className);

  const inputFieldClassName = clsx(styles.inputField, {
    [styles.inputActive]: focused,
    [styles.inputError]: !isEmpty(error),
  });

  return (
    <div className={containerClassName}>
      {label && <label htmlFor={label.id}>{label.text}</label>}
      <div className={inputFieldClassName}>
        {Icon && (
          <div>
            <Icon />
          </div>
        )}
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
      </div>
      {<span>{!isNil(error) && error}</span>}
    </div>
  );
}
