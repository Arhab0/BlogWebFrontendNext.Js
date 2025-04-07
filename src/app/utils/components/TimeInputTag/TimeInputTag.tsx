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

const TimeInputTag = ({
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
    <div className={styles.inputGroup}>
      {label && (
        <label
          className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
          htmlFor={name}
        >
          {label} {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          id={name}
          type="time"
          disabled={disabled}
          name={name}
          value={value || ""}
          placeholder={placeHolder}
          min={after || undefined}
          max={before || undefined}
          onChange={(e) => setter(name, e.target.value)}
        />
      </div>
    </div>
  );
};

export default TimeInputTag;
