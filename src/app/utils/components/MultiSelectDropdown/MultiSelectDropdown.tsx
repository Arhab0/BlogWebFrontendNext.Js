import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import Checkbox from "../Checkbox/Checkbox";

interface Props {
  options: any;
  selectedIds: any;
  name: string;
  handleDropdownChange: (name: string, Ids: any) => void;
  isDisabled?: boolean;
  clearable?: boolean;
  label?: string;
  keyWord?: string;
  showAllCheckbox?: boolean;
}

const MultiSelectDropdown = ({
  options,
  selectedIds,
  name,
  handleDropdownChange,
  isDisabled,
  clearable,
  label,
  keyWord = "value",
  showAllCheckbox,
}: Props) => {
  const animatedComponents = makeAnimated();
  const [selectAll, setSelectAll] = useState(false);
  const [defaultVal, setDefaultValue] = useState([]);
  const [domOptions, setDomOptions] = useState(options);

  useEffect(() => {
    setDomOptions([...options]);
  }, [options]);

  useEffect(() => {
    const defaultOption = domOptions.filter((option: any) => {
      return selectedIds.includes(option.value);
    });
    // console.log("called",defaultOption.length,domOptions.length);
    // if (defaultOption.length !=domOptions.length-1)
    //   setDomOptions([{ value: "All", label: "All" },...domOptions]);
    // console.log(defaultOption)
    setDefaultValue(defaultOption);
  }, [domOptions, selectedIds]);

  function updateData(event: any) {
    let array: any = [];
    let optArr: any = [];
    let yes = false;
    for (let i = 0; i < event.length; i++) {
      if (event[i].value == "All") {
        yes = true;
        break;
      }
    }
    if (yes == true) {
      domOptions.forEach((element: any) => {
        if (element[keyWord] !== undefined) {
          array.push(element[keyWord]);
          optArr.push(element);
        }
      });
    } else {
      event.forEach((element: any) => {
        array.push(element[keyWord]);
        optArr.push(element);
      });
    }
    if (array.length == 0) {
      setSelectAll(false);
    }
    setDefaultValue(optArr);
    handleDropdownChange(keyWord, array);
  }

  function SelectRecords(checked: boolean) {
    if (checked) {
      let array: any = [];
      let optArr: any = [];
      let yes = false;
      domOptions.forEach((element: any) => {
        if (element[keyWord] !== undefined) {
          array.push(element[keyWord]);
          optArr.push(element);
        }
      });
      setDefaultValue(optArr);
      handleDropdownChange(keyWord, array);
    } else {
      setDefaultValue([]);
      handleDropdownChange(keyWord, []);
    }
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: 12,
      padding: 0,
      display: "flex",
      minHeight: "25px",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      display: "flex",
      minHeight: "25px",
      maxHeight: "80px",
      overflowY: "auto",
      alignItems: "center",
      padding: "0 4px",
      position: "relative",
      scrollbarWidth: "thin",
      scrollbarColor: "#c0c0c0 transparent",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      width: 1,
      // height: "auto",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: 12,
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
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: 12,
      padding: "4px 8px",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected
        ? "#2159ade6"
        : state.isFocused
        ? "#e6f7ff"
        : "white",
      cursor: "pointer",
      ":active": {
        backgroundColor: state.isSelected ? "#2159ad" : "#e6f7ff",
      },
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
    multiValue: (provided: any) => ({
      ...provided,
      fontSize: 10,
      display: "flex",
      justifyContent: "space-between",
      width: "min-content",
      // backgroundColor: "#e6f7ff",
      // borderRadius: "2px",
      // margin: "2px",
      // padding: "0 4px",
      // lineHeight: "1.2", // Reduce line height
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      fontSize: 10,
      padding: "0",
      margin: "0",
      // lineHeight: "1.2", // Match line height
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      // padding: "0 4px",
      cursor: "pointer",
      height: "auto",
      // ":hover": {
      //   backgroundColor: "#e6f7ff",
      //   color: "#2159ad",
      // },
    }),
  };
  const CustomMenu = (props: any) => {
    return <components.Menu {...props} className="custom-menu" />;
  };

  const CustomMenuList = (props: any) => {
    return <components.MenuList {...props} className="custom-menu-list" />;
  };

  return (
    <div className="flex-1 font-barlow">
      <label
        className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4"
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        classNamePrefix="select"
        isDisabled={isDisabled}
        isClearable={clearable}
        value={defaultVal}
        isSearchable={true}
        options={domOptions}
        onChange={(e) => {
          updateData(e);
        }}
        components={{
          ...animatedComponents,
          Menu: CustomMenu,
          MenuList: CustomMenuList,
        }}
        styles={customStyles}
      />
      {showAllCheckbox && (
        <div className="w-full flex justify-end mt-1">
          <Checkbox
            value={selectAll}
            label="Select All"
            name="career"
            setter={(n, v) => {
              setSelectAll(v);
              SelectRecords(v);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
