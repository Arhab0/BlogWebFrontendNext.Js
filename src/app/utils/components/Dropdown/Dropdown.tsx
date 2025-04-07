import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import styles from "../InputTag/InputTag.module.css";

interface Props {
  options: any;
  activeId: number | string | null | boolean;
  name: string;
  handleDropdownChange: (
    name: string,
    value: number | string //| boolean
  ) => void;
  isDisabled?: boolean;
  clearable?: boolean;
  label?: string;
  placeHolder?: string;
  isRequired?: boolean;
}

const Dropdown = ({
  options,
  activeId,
  name,
  handleDropdownChange,
  isDisabled,
  clearable,
  label,
  placeHolder,
  isRequired,
}: Props) => {
  const [defaultVal, setDefaultValue] = useState();

  useEffect(() => {
    const defaultOption = options.find(
      (option: any) => option.value === activeId
    );
    setDefaultValue(defaultOption);
  }, [options, activeId]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: 12,
      minHeight: "34px",
      height: "34px",
      maxHeight: "34px",
      padding: 0,
      display: "flex",
      outline: "none",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "34px",
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      height: "auto",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      lineHeight: "34px",
      margin: 0,
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: 12,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected
        ? "#2159ade6"
        : state.isFocused
        ? "#e6f7ff"
        : "white",
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      fontSize: "12px",
      color: "#999",
      padding: 4,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: 4,
      height: "20px",
      width: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      padding: 4,
      height: "20px",
      width: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }),
  };
  const CustomMenu = (props: any) => {
    return <components.Menu {...props} className="custom-menu" />;
  };

  const CustomMenuList = (props: any) => {
    return <components.MenuList {...props} className="custom-menu-list" />;
  };

  return (
    <div className={`${styles.inputGroup}`}>
      {label && (
        <label
          className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
          htmlFor={name}
        >
          {label}
          {isRequired && <span className="text-red-900">*</span>}
        </label>
      )}
      <Select
        className="basic-single bg-[#f6f8fc]"
        classNamePrefix="select"
        isDisabled={isDisabled}
        // isFixed={true}
        isClearable={clearable}
        value={defaultVal}
        isSearchable={true}
        options={options}
        placeholder={placeHolder}
        onChange={(e: any) => {
          handleDropdownChange(name, e !== null ? e.value : null);
        }}
        components={{
          Menu: CustomMenu,
          MenuList: CustomMenuList,
        }}
        styles={customStyles}
      />
    </div>
  );
};
export default Dropdown;
