"use client";

import React, { useId, useState, useRef, useEffect } from "react";

import { clsx } from "clsx";
import { CalendarIcon } from "@/components/icons/buytokenIcons/calendarIcon";
import { cn } from "@/lib/utils";
import { TooltipIcon } from "./tooltip";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactElement;
  tooltip?: string;
}

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isOpen,
  onClose,
  onDateSelect,
  selectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [viewDate, setViewDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to be last (6)
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setCurrentDate(newDate);
    onDateSelect(newDate);
    onClose();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newViewDate = new Date(viewDate);
    if (direction === "prev") {
      newViewDate.setMonth(newViewDate.getMonth() - 1);
    } else {
      newViewDate.setMonth(newViewDate.getMonth() + 1);
    }
    setViewDate(newViewDate);
  };

  const navigateYear = (direction: "prev" | "next") => {
    const newViewDate = new Date(viewDate);
    if (direction === "prev") {
      newViewDate.setFullYear(newViewDate.getFullYear() - 1);
    } else {
      newViewDate.setFullYear(newViewDate.getFullYear() + 1);
    }
    setViewDate(newViewDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      viewDate.getMonth() === selectedDate.getMonth() &&
      viewDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 z-50 bg-[#030714] border border-[#384051] rounded-xl shadow-lg p-4 min-w-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigateYear("prev")}
            className="p-1 hover:bg-[#212A38] rounded transition-colors"
            title="Previous Year"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#AAAAAA]"
            >
              <path
                d="M11 17L6 12L11 7M18 17L13 12L18 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 hover:bg-[#212A38] rounded transition-colors"
            title="Previous Month"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#AAAAAA]"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-lg font-medium text-white">
          {viewDate.getFullYear()} {monthNames[viewDate.getMonth()]}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigateMonth("next")}
            className="p-1 hover:bg-[#212A38] rounded transition-colors"
            title="Next Month"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#AAAAAA]"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => navigateYear("next")}
            className="p-1 hover:bg-[#212A38] rounded transition-colors"
            title="Next Year"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#AAAAAA]"
            >
              <path
                d="M13 17L18 12L13 7M6 17L11 12L6 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-[#AAAAAA]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays().map((day, index) => (
          <div key={index} className="h-10 flex items-center justify-center">
            {day && (
              <button
                onClick={() => handleDateClick(day)}
                className={clsx(
                  "w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-[#212A38]",
                  isSelected(day)
                    ? "bg-[#0FE2D4] text-[#030714] hover:bg-[#0FE2D4]"
                    : isToday(day)
                    ? "bg-[#212A38] text-white"
                    : "text-white"
                )}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  icon,
  type,
  value,
  onChange,
  tooltip,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    type === "date" && value ? new Date(value as string) : undefined
  );
  const [inputValue, setInputValue] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync selectedDate with value prop changes
  useEffect(() => {
    if (type === "date") {
      if (value) {
        try {
          const date = new Date(value as string);
          if (!isNaN(date.getTime())) {
            setSelectedDate(date);
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const year = date.getFullYear();
            setInputValue(`${month}/${day}/${year}`);
          }
        } catch (e) {
          setSelectedDate(undefined);
          setInputValue("");
        }
      } else {
        setSelectedDate(undefined);
        setInputValue("");
      }
    }
  }, [value, type]);

  // Sync inputValue with selectedDate when it changes from date picker
  useEffect(() => {
    if (type === "date" && selectedDate) {
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      setInputValue(`${month}/${day}/${year}`);
    }
  }, [selectedDate, type]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    if (onChange) {
      const event = {
        target: { value: formattedDate },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(event);
    }
  };

  const formatDisplayDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const parseDateInput = (input: string): Date | null => {
    // Remove any non-digit characters except /
    const cleaned = input.replace(/[^\d/]/g, "");

    // Match MM/DD/YYYY format
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = cleaned.match(dateRegex);

    if (!match) return null;

    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Validate date
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    const date = new Date(year, month - 1, day);

    // Check if date is valid
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Allow empty input
    if (newValue === "") {
      setSelectedDate(undefined);
      if (onChange) {
        const event = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      return;
    }

    // Try to parse the date as user types
    const parsedDate = parseDateInput(newValue);

    if (parsedDate) {
      setSelectedDate(parsedDate);
      const formattedDate = parsedDate.toISOString().split("T")[0];
      if (onChange) {
        const event = {
          target: { value: formattedDate },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }
  };

  const handleDateInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();

    // If user typed something but it's not valid, restore the last valid date or clear
    if (inputValue && inputValue !== "") {
      const parsedDate = parseDateInput(inputValue);

      if (!parsedDate) {
        // Invalid input - restore the formatted date if we have one, or clear
        if (selectedDate) {
          // Trigger a re-render with the formatted date
          const event = {
            target: { value: formatDisplayDate(selectedDate) },
          } as React.ChangeEvent<HTMLInputElement>;
          handleDateInputChange(event);
        } else {
          // Clear invalid input
          const event = {
            target: { value: "" },
          } as React.ChangeEvent<HTMLInputElement>;
          handleDateInputChange(event);
        }
      } else if (parsedDate) {
        // Valid date - ensure it's formatted correctly
        const event = {
          target: { value: formatDisplayDate(parsedDate) },
        } as React.ChangeEvent<HTMLInputElement>;
        handleDateInputChange(event);
      }
    }

    // Call original onBlur if provided
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const handleCalendarIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "date") {
      setIsDatePickerOpen(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2" ref={containerRef}>
      {label && (
        <div className="flex gap-2 items-center">
          <label
            htmlFor={inputId}
            className="block text-sm font-medium"
          >
            {label}
          </label>
          {tooltip && <TooltipIcon content={tooltip} />}
        </div>
      )}
      <div className="relative">
    <input
          id={inputId}
          type={type === "date" ? "text" : type}
          value={type === "date" ? inputValue : value ?? ""}
          onChange={type === "date" ? handleDateInputChange : onChange}
          onBlur={type === "date" ? handleDateInputBlur : props.onBlur}
          placeholder={type === "date" ? "MM/DD/YYYY" : props.placeholder}
      className={cn(
            "w-full px-3 h-12 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0FE2D4] focus:border-[#0FE2D4] transition-all duration-200 bg-[#030714] text-white placeholder:text-[#AAAAAA] placeholder:text-base",
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-[#384051]",
            type === "date" ? "pl-3 pr-10" : "",
        className
          )}
          {...(type === "date" ? {} : props)}
        />
        {/* Calendar Icon for date inputs */}
        {type === "date" && (
          <>
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
              onClick={handleCalendarIconClick}
            >
              <CalendarIcon className="w-5 h-5 text-[#AAAAAA]" />
            </div>
          </>
        )}
        {type === "date" && (
          <DatePicker
            isOpen={isDatePickerOpen}
            onClose={() => setIsDatePickerOpen(false)}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-white">{helperText}</p>
      )}
    </div>
  );
};

export { Input };
