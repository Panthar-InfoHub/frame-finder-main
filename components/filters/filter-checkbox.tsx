"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { buildFilterUrl, isFilterSelected, type FilterParams } from "@/lib/filters/filter-utils";

interface FilterCheckboxProps {
  /** Current search params from the page */
  searchParams: FilterParams;
  /** Filter parameter key (e.g., 'gender', 'frame_color') */
  filterKey: string;
  /** Filter value (e.g., 'Men', 'Black') */
  filterValue: string;
  /** Display label */
  label: string;
  /** Base path for URL building (e.g., '/frames') */
  basePath?: string;
}

/**
 * Simple filter checkbox that uses Link for navigation.
 * No state management - URL is the source of truth.
 *
 * Works with Next.js App Router and Server Components.
 * Supports keyboard navigation and accessibility.
 */
export function FilterCheckbox({
  searchParams,
  filterKey,
  filterValue,
  label,
  basePath = "",
  displayOnly = false,
}: FilterCheckboxProps & { displayOnly?: boolean }) {
  const isSelected = isFilterSelected(searchParams, filterKey, filterValue);
  const href = buildFilterUrl(searchParams, filterKey, filterValue, basePath);
  const checkboxId = `filter-${filterKey}-${filterValue}`;

  // If displayOnly, render as plain text without link
  if (displayOnly) {
    return (
      <div className="flex items-center space-x-2 py-1 px-1 opacity-60">
        <div className="w-4 h-4" /> {/* Spacer for alignment */}
        <Label className="text-sm font-normal flex-1 select-none cursor-default">{label}</Label>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 group">
      <Link
        href={href}
        scroll={false}
        className="flex items-center space-x-2 flex-1 py-1 hover:bg-gray-50 rounded px-1 -mx-1 transition-colors"
        prefetch={false}
      >
        <Checkbox
          id={checkboxId}
          checked={isSelected}
          className="pointer-events-none"
          aria-label={`Filter by ${label}`}
        />
        <Label
          htmlFor={checkboxId}
          className="text-sm font-normal cursor-pointer flex-1 select-none"
        >
          {label}
        </Label>
      </Link>
    </div>
  );
}
