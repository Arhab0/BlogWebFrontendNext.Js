import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterDropdown.module.css";

interface Option {
  label: string;
  value: number | string;
}

interface SearchableDropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdownContent" ref={dropdownRef}>
      <label className="text-xs text-[#1E1E1E] mb-1 font-alata font-normal leading-4" >
        {placeholder}
      </label>
      <div onClick={() => setIsOpen(!isOpen)} className={`${styles.input} flex justify-between`}>
        <span >{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="h-2">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="dropdown">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
            autoFocus
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="option"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="noResults">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
