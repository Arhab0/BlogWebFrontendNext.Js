import React, { useEffect, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import styles from "../DateInputTag/InputTag.module.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "./DatePickerStyles.css";

interface DateRange {
  startDate: string;
  endDate: string;
}

interface Props {
  name: string;
  label?: string;
  setter: (name: string, value: DateRange) => void;
  value: DateRange;
  disabled?: boolean;
  isRequired?: boolean;
}

// Convert string (yyyy-mm-dd) to Date or null
const parseDate = (date: string): Date | null => {
  return date ? new Date(date) : null;
};

// Convert Date to string (yyyy-mm-dd) or empty string
const formatDate = (date: Date | null): string => {
  return date ? date.toISOString().split("T")[0] : "";
};

const DateRangePicker: React.FC<Props> = ({
  name,
  label,
  setter,
  value,
  disabled,
  isRequired,
}) => {
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: parseDate(value.startDate),
    endDate: parseDate(value.endDate),
  });

  // Sync local state with parent when value changes
  useEffect(() => {
    console.log(value)
    setDateRange({
      startDate: parseDate(value.startDate),
      endDate: parseDate(value.endDate),
    });
  }, [value]);

  const handleChange = (newValue: DateValueType | null) => {
    if (!newValue || !newValue.startDate || !newValue.endDate) {
      setDateRange({ startDate: null, endDate: null }); // Ensure valid format
      setter(name, { startDate: "", endDate: "" }); // Send empty strings to parent
      return;
    }
  
    const formattedValue: DateRange = {
      startDate: formatDate(newValue.startDate as Date),
      endDate: formatDate(newValue.endDate as Date),
    };
  
    setDateRange(newValue); // Update local state
    setter(name, formattedValue); // Send formatted value to parent
  };
  

  return (
    <div className={`${styles.inputGroup} flex flex-col space-y-1`}>
      {label && (
        <label
          className="text-xs text-[#1E1E1E] font-alata font-normal leading-4"
          htmlFor={name}
        >
          {label}
          {isRequired && <span className="text-red-900"> *</span>}
        </label>
      )}
      <Datepicker
        value={dateRange}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default DateRangePicker;
