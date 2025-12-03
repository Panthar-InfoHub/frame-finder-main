"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { buildPriceRangeUrl, getPriceRange, type FilterParams } from "@/lib/filters/filter-utils";

interface PriceRangeFilterProps {
  searchParams: FilterParams;
  basePath?: string;
  defaultExpanded?: boolean;
  minPrice?: number;
  maxPrice?: number;
  step?: number;
}

/**
 * Price range filter with client-side slider and URL-based navigation
 */
export function PriceRangeFilter({
  searchParams,
  basePath = "",
  defaultExpanded = false,
  minPrice = 0,
  maxPrice = 10000,
  step = 500,
}: PriceRangeFilterProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const currentRange = getPriceRange(searchParams);
  const [localRange, setLocalRange] = useState(currentRange);

  const hasChanged = localRange[0] !== currentRange[0] || localRange[1] !== currentRange[1];
  const applyUrl = buildPriceRangeUrl(searchParams, localRange[0], localRange[1], basePath);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full font-medium text-left hover:text-gray-600 transition-colors"
        aria-expanded={isExpanded}
      >
        <span>Price Range</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="space-y-4 pl-1 mt-3">
          <div className="text-sm text-muted-foreground font-medium">
            ₹{localRange[0].toLocaleString()} - ₹{localRange[1].toLocaleString()}
          </div>

          <Slider
            value={localRange}
            onValueChange={(value) => setLocalRange(value as [number, number])}
            min={minPrice}
            max={maxPrice}
            step={step}
            className="w-full"
          />

          {hasChanged && (
            <Link href={applyUrl} scroll={false} prefetch={false} className="block">
              <Button size="sm" className="w-full">
                Apply Price Filter
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
