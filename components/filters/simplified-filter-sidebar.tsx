"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { FilterGroup } from "./filter-group";
import { PriceRangeFilter } from "./price-range-filter";
import {
  clearAllFilters,
  getActiveFilterCount,
  type FilterParams,
} from "@/lib/filters/filter-utils";
import type { FilterConfig } from "@/lib/filters/filter-configs";
import { Button } from "@/components/ui/button";

interface SimplifiedFilterSidebarProps {
  /** Filter configurations for this product type */
  filterConfig: FilterConfig[];
  /** Current search params from page */
  searchParams: FilterParams;
  /** Base path for URL building (e.g., '/frames') */
  basePath?: string;
  /** Number of sections to expand by default */
  defaultExpandedCount?: number;
  /** Whether to show price filter */
  showPriceFilter?: boolean;
}

/**
 * Simplified Filter Sidebar - Server-first approach
 *
 * Features:
 * - No complex state management
 * - URL as single source of truth
 * - Link-based navigation
 * - Reusable across all product types
 * - Highly customizable
 *
 * Usage:
 * ```tsx
 * <SimplifiedFilterSidebar
 *   filterConfig={framesFilterConfig}
 *   searchParams={searchParams}
 *   basePath="/frames"
 * />
 * ```
 */
export function SimplifiedFilterSidebar({
  filterConfig,
  searchParams,
  basePath = "",
  defaultExpandedCount = 3,
  showPriceFilter = true,
}: SimplifiedFilterSidebarProps) {
  const activeFilterCount = getActiveFilterCount(searchParams);
  const clearAllUrl = clearAllFilters(basePath);

  return (
    <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {/* Header with clear all */}
      <div className="font-semibold text-lg sticky top-0 bg-white z-10 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <Link href={clearAllUrl} scroll={false} prefetch={false}>
            <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-gray-100">
              <X className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </Link>
        )}
      </div>

      {/* Dynamic Filter Groups */}
      {filterConfig.map((config, index) => (
        <FilterGroup
          key={config.id}
          config={config}
          searchParams={searchParams}
          basePath={basePath}
          defaultExpanded={index < defaultExpandedCount}
        />
      ))}

      {/* Price Range Filter */}
      {showPriceFilter && (
        <PriceRangeFilter searchParams={searchParams} basePath={basePath} defaultExpanded={true} />
      )}
    </div>
  );
}
