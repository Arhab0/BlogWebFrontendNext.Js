import React from "react";
import styles from "./InputTag.module.css";
interface Props {
  name?: string;
  label?: string;
  setter: (name: string, value: any) => void;
  placeHolder: string;
  value: any;
  disabled?: boolean;
  subfield?: string;
}

const SearchInputTag = ({
  name,
  label,
  setter,
  value,
  placeHolder,
  disabled,
  subfield,
}: Props) => {
  return (
    <div className={`${styles.inputGroup} flex-1`}>
      {label && (
        <div className="flex items-center gap-2">
          <label
            className="text-xs text-[#1E1E1E] mb-0 font-alata font-normal leading-4"
            htmlFor={name}
          >
            {label}
          </label>
          {subfield && (
            <span className="text-gray-400 mb-0 text-[10px] text-center">{`( ${subfield} )`}</span>
          )}
        </div>
      )}
      <div className={styles.input}>
        <input
          className={`border-r border-r-[#dfdfdf] w-[80%]`}
          id={name}
          name={name}
          value={value}
          placeholder={placeHolder}
          disabled={disabled}
          onChange={(e) => {
            setter(name??"", e.target.value);
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5002 14.7502L11.2429 11.4929M11.2429 11.4929C11.8001 10.9357 12.242 10.2743 12.5436 9.54631C12.8451 8.81834 13.0003 8.03811 13.0003 7.25015C13.0003 6.4622 12.8451 5.68197 12.5436 4.95399C12.242 4.22602 11.8001 3.56457 11.2429 3.0074C10.6857 2.45024 10.0243 2.00827 9.29631 1.70673C8.56834 1.4052 7.78811 1.25 7.00015 1.25C6.2122 1.25 5.43197 1.4052 4.70399 1.70673C3.97602 2.00827 3.31457 2.45024 2.7574 3.0074C1.63216 4.13265 1 5.65881 1 7.25015C1 8.84149 1.63216 10.3677 2.7574 11.4929C3.88265 12.6182 5.40881 13.2503 7.00015 13.2503C8.59149 13.2503 10.1177 12.6182 11.2429 11.4929Z"
              stroke="#8D8A8A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchInputTag;
