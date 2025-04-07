import React, { KeyboardEvent } from "react";
import styles from "./InputTag.module.css";
interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder?: string;
  range?: number;
  value: any;
  disabled?: boolean;
  type?: string;
  subfield?: string;
  isRequired?: boolean;
  onEnterPress?: () => void;
}

const ViewInfo = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  range,
  disabled = true,
  type,
  subfield,
  isRequired,
  onEnterPress,
}: Props) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div className={`${styles.inputGroup} flex-1`}>
      <div className="flex items-center gap-2">
        <label
          className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
          htmlFor={name}
        >
          {label}
          {isRequired && <span className="text-red-900">*</span>}
        </label>
        {subfield && (
          <span className="text-gray-400 mb-1 text-[10px] text-center">{`( ${subfield} )`}</span>
        )}
      </div>
      <input
        className={styles.input}
        id={name}
        name={name}
        value={value}
        type={type ?? "text"}
        placeholder={placeHolder}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          if (e.target.value.length <= (range ?? 255)) {
            setter(name, e.target.value);
          } else {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default ViewInfo;
