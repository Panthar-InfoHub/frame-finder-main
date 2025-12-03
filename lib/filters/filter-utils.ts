/**
 * Filter URL Utilities
 *
 * Simple, server-first utilities for building filter URLs.
 * Works with Next.js App Router and Server Components.
 */

export interface FilterParams {
  [key: string]: string | string[] | undefined;
}

/**
 * Build URL with toggled filter value
 * Uses repeated keys format: ?category=milk&category=cheese&category=curd
 *
 * @param currentParams - Current search params from page
 * @param filterKey - Filter parameter key (e.g., 'gender', 'frame_color')
 * @param filterValue - Value to toggle (e.g., 'Men', 'Black')
 * @param basePath - Base path for the URL (e.g., '/frames')
 * @returns Complete URL string with updated query params
 */
export function buildFilterUrl(
  currentParams: FilterParams,
  filterKey: string,
  filterValue: string,
  basePath: string = ""
): string {
  const params = new URLSearchParams();

  // Copy all existing params with repeated keys
  Object.entries(currentParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        // Add each value as a separate key
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  // Get current values for this filter
  const current = params.getAll(filterKey);

  // Toggle the value
  const isSelected = current.includes(filterValue);

  // Remove all existing values for this key
  params.delete(filterKey);

  // Add back the values (toggled)
  const updated = isSelected ? current.filter((v) => v !== filterValue) : [...current, filterValue];

  updated.forEach((v) => params.append(filterKey, v));

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Check if a filter value is currently selected
 */
export function isFilterSelected(
  currentParams: FilterParams,
  filterKey: string,
  filterValue: string
): boolean {
  const paramValue = currentParams[filterKey];

  if (!paramValue) return false;

  const values = Array.isArray(paramValue) ? paramValue : [paramValue];

  return values.includes(filterValue);
}

/**
 * Get all selected values for a filter key
 */
export function getSelectedFilters(currentParams: FilterParams, filterKey: string): string[] {
  const paramValue = currentParams[filterKey];

  if (!paramValue) return [];

  return Array.isArray(paramValue) ? paramValue : [paramValue];
}

/**
 * Clear all filters for a specific key
 */
export function clearFilterKey(
  currentParams: FilterParams,
  filterKey: string,
  basePath: string = ""
): string {
  const params = new URLSearchParams();

  Object.entries(currentParams).forEach(([key, value]) => {
    if (key !== filterKey && value) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Clear all filters
 */
export function clearAllFilters(basePath: string = ""): string {
  return basePath;
}

/**
 * Get count of active filters
 */
export function getActiveFilterCount(currentParams: FilterParams): number {
  return Object.keys(currentParams).filter((key) => {
    const value = currentParams[key];
    return value && value !== "";
  }).length;
}

/**
 * Build URL for price range filter
 */
export function buildPriceRangeUrl(
  currentParams: FilterParams,
  minPrice: number,
  maxPrice: number,
  basePath: string = ""
): string {
  const params = new URLSearchParams();

  Object.entries(currentParams).forEach(([key, value]) => {
    if (key !== "price" && value) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  // Only add price if not default range
  if (minPrice !== 0 || maxPrice !== 10000) {
    params.set("price", `${minPrice}-${maxPrice}`);
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Parse price range from params
 */
export function getPriceRange(currentParams: FilterParams): [number, number] {
  const priceParam = currentParams.price;

  if (!priceParam) return [0, 10000];

  const priceString = Array.isArray(priceParam) ? priceParam[0] : priceParam;
  const [min, max] = priceString.split("-").map(Number);

  if (isNaN(min) || isNaN(max)) return [0, 10000];

  return [min, max];
}

export function buildQueryUrl(baseUrl: string, params: any) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach(v => searchParams.append(key, String(v)));
    } else if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  // if empty → return baseUrl without ?
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

