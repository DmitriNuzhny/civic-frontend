"use client";

import React, { useId, useState, useRef, useEffect } from "react";

import { clsx } from "clsx";

import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import { TooltipIcon } from "./tooltip";

interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactElement;
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  tooltip?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  icon,
  options,
  value,
  onChange,
  placeholder = "Please select a strategy",
  disabled = false,
  searchable = false,
  searchPlaceholder = "Search...",
  tooltip,
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Reset search and highlight when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex].value);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <div className="flex gap-2 items-center">
          <label
            htmlFor={selectId}
            className="block text-sm font-medium"
          >
            {label}
          </label>
          {tooltip && <TooltipIcon content={tooltip} />}
        </div>
      )}
      <div className="relative" ref={dropdownRef}>
        <div
          id={selectId}
          className={clsx(
            "w-full px-3 h-12 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0FE2D4] focus:border-[#0FE2D4] transition-all duration-200 cursor-pointer flex items-center justify-between",
            "bg-[#030714] text-white",
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-[#384051]",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={handleToggle}
        >
          <span
            className={clsx(selectedOption ? "text-white" : "text-[#AAAAAA]")}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {/* Dropdown arrow */}
          {isOpen ? (
            <ChevronUpIcon className="text-white h-5 w-5" />
          ) : (
            <ChevronDownIcon className="text-white h-5 w-5" />
          )}
        </div>
        {/* Dropdown options */}
        {isOpen && (
          <div
            className="absolute z-50 flex flex-col gap-1 w-full mt-1 bg-[#030714] border border-[#384051] rounded-lg shadow-lg max-h-60 overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            {searchable && (
              <div className="p-2 border-b border-[#384051]">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] h-4 w-4" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-[#030714] border border-[#384051] rounded-md text-white placeholder:text-[#AAAAAA] outline-none focus:border-[#0FE2D4] focus:ring-1 focus:ring-[#0FE2D4]"
                  />
                </div>
              </div>
            )}
            {/* Options list */}
            <div className="overflow-y-auto max-h-48 p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, index) => (
                  <div
                    key={opt.value}
                    className={clsx(
                      "px-3 py-2 cursor-pointer transition-colors duration-150 rounded-md",
                      "hover:bg-[#212A38]",
                      "text-white",
                      opt.disabled && "opacity-50 cursor-not-allowed",
                      opt.value === value && "bg-[#212A38]",
                      index === highlightedIndex && "bg-[#212A38]"
                    )}
                    onClick={() =>
                      !opt.disabled && handleOptionClick(opt.value)
                    }
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {opt.label}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-[#AAAAAA] text-sm">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-white">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
export { Select };
