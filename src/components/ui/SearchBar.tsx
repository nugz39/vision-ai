"use client";

import { ChangeEvent } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ placeholder = "Search...", value, onChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value);

  return (
    <div className="w-full max-w-xl rounded-full border border-nb-border bg-nb-bg-soft/80 px-4 py-2 text-sm text-nb-text shadow-sm backdrop-blur">
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-nb-muted">🔍</span>
        <input
          type="text"
          className="w-full bg-transparent text-sm text-nb-text placeholder:text-nb-muted focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-label={placeholder}
        />
      </div>
    </div>
  );
}
