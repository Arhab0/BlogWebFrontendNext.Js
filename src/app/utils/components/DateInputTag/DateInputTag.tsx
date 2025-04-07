import React from "react";
import styles from "./InputTag.module.css";

interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder?: string;
  value: any;
  disabled?: boolean;
  isRequired?: boolean;
  before?: string;
  after?: string;
}

const DateInputTag = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  disabled,
  isRequired,
  before,
  after,
}: Props) => {
  return (
    <div className={`${styles.inputGroup}`}>
      {label && (
        <label
          className="text-xs text-[#1E1E1E] font-alata font-normal leading-4"
          htmlFor={name}
        >
          {label}
          {isRequired && <span className="text-red-900">*</span>}
        </label>
      )}
      <input
        className={styles.input}
        id={name}
        type="date"
        disabled={disabled}
        name={name}
        value={value || ""}
        placeholder={placeHolder}
        min={after || undefined} // Apply only if `after` is provided
        max={before || undefined} // Apply only if `before` is provided
        onChange={(e) => {
          setter(name, e.target.value);
        }}
      />
    </div>
  );
};

export default DateInputTag;
