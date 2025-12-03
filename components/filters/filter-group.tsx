"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Link from "next/link";
import { FilterCheckbox } from "./filter-checkbox";
import { clearFilterKey, getSelectedFilters, type FilterParams } from "@/lib/filters/filter-utils";
import type { FilterConfig } from "@/lib/filters/filter-configs";
import { Button } from "@/components/ui/button";

interface FilterGroupProps {
  /** Filter configuration */
  config: FilterConfig;
  /** Current search params */
  searchParams: FilterParams;
  /** Base path for URL building */
  basePath?: string;
  /** Whether section is expanded by default */
  defaultExpanded?: boolean;
}

/**
 * Collapsible filter group with minimal client-side state.
 * Only manages expand/collapse - no filter state.
 *
 * Reusable across all product types.
 */
export function FilterGroup({
  config,
  searchParams,
  basePath = "",
  defaultExpanded = false,
}: FilterGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const selectedCount = getSelectedFilters(searchParams, config.paramKey).length;
  const clearUrl = clearFilterKey(searchParams, config.paramKey, basePath);

  return (
    <div className="border-b border-gray-200 pb-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 font-medium text-left hover:text-gray-600 transition-colors flex-1"
          aria-expanded={isExpanded}
          aria-controls={`filter-group-${config.id}`}
        >
          <span>{config.label}</span>
          {selectedCount > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
              {selectedCount}
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 ml-auto" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-auto" />
          )}
        </button>

        {/* Clear button - only show if filters are selected */}
        {selectedCount > 0 && (
          <Link href={clearUrl} scroll={false} prefetch={false}>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 "
              aria-label={`Clear ${config.label} filters`}
            >
              <X className="w-3 h-3" />
            </Button>
          </Link>
        )}
      </div>

      {/* Filter options */}
      {isExpanded && (
        <div
          id={`filter-group-${config.id}`}
          className="space-y-2 pl-1 max-h-60 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
        >
          {config.options.map((option) => (
            <FilterCheckbox
              key={option.value}
              searchParams={searchParams}
              filterKey={config.paramKey}
              filterValue={option.value}
              label={option.label}
              basePath={basePath}
              displayOnly={option.displayOnly}
            />
          ))}
        </div>
      )}
    </div>
  );
}
