import React, { useState, useRef } from "react";
import styles from "./InputTag.module.css";

interface PinInputProps {
  name: string;
  label: string;
  setter: (name: string, value: any) => void;
  length?: number;
  onComplete?: (pin: string) => void;
  onEnterPress?: () => void;
}

const PinInput = ({
  length = 4,
  onComplete,
  label,
  name,
  setter,
  onEnterPress,
}: PinInputProps) => {
  const [pin, setPin] = useState(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      // Allow only numeric input
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      setter(name, newPin);

      // Move focus to the next input if value is not empty and it's not the last input
      if (value && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      // Trigger the onComplete callback if all inputs are filled
      if (newPin.every((digit) => digit !== "") && onComplete) {
        onComplete(newPin.join(""));
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (
      e.key === "Enter" &&
      onEnterPress &&
      pin[index] == length - 1 &&
      pin[index] != ""
    ) {
      onEnterPress();
    }
  };
  return (
    <div className={`${styles.inputGroup}`}>
      <label
        className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="flex gap-x-3" data-hs-pin-input="">
        {pin.map((_, index) => (
          <input
            placeholder="x"
            key={index}
            type="text"
            name={name}
            maxLength={1}
            value={pin[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            className={`block w-[38px] text-center border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${styles.input}`}
            data-hs-pin-input-item=""
            autoFocus={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default PinInput;
