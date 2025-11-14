"use client";

import * as React from "react";
import {
  Select as ShadSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
}

export default function Select({
  name,
  value,
  onChange,
  options,
  placeholder = "Sélectionnez",
  className = "",
  required = false,
  id,
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState<string>(value ?? "");

  React.useEffect(() => {
    if (value !== undefined && value !== internalValue) setInternalValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (v: string) => {
    setInternalValue(v);
    onChange?.(v);
  };

  return (
    <ShadSelect value={internalValue} onValueChange={handleChange}>
      {/*
        Include a native <select> (not type=hidden) so browser constraint validation
        and FormData submission still work. We visually hide it but keep it present in
        the document (so checkValidity() and required work). We sync its value with
        the shadcn select via state.
      */}
      {name && (
        <select
          id={id ? `${id}-native` : undefined}
          name={name}
          value={internalValue}
          onChange={(e) => handleChange(e.target.value)}
          required={required}
          // keep it visually hidden but present for validation/submission
          className="sr-only absolute w-px h-px overflow-hidden"
          aria-hidden={false}
          tabIndex={-1}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      <SelectTrigger id={id} className={`flex items-center justify-between w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadSelect>
  );
}
