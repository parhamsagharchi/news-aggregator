/**
 * Date Range Utility Functions
 *
 * Provides helper functions for parsing and formatting date ranges
 * used in the Litepicker component.
 *
 */

import dayjs from "dayjs";

/**
 * Parses a date range string from Litepicker format to ISO date strings
 *
 * @param dateRange - Date range string in format "D MMM, YYYY - D MMM, YYYY" (e.g., "1 Jan, 2024 - 31 Dec, 2024")
 * @returns Object with startDate and endDate in ISO format (YYYY-MM-DD)
 *
 * @example
 * parseDateRange("1 Jan, 2024 - 31 Dec, 2024")
 * // Returns: { startDate: "2024-01-01", endDate: "2024-12-31" }
 */
export const parseDateRange = (
  dateRange: string
): { startDate: string; endDate: string } => {
  if (!dateRange || !dateRange.includes(" - ")) {
    return { startDate: "", endDate: "" };
  }

  const [start, end] = dateRange.split(" - ").map((d) => d.trim());

  try {
    // Parse dates in format "D MMM, YYYY" (e.g., "1 Jan, 2024")
    const startDate = dayjs(start, "D MMM, YYYY").format("YYYY-MM-DD");
    const endDate = dayjs(end, "D MMM, YYYY").format("YYYY-MM-DD");

    return { startDate, endDate };
  } catch {
    return { startDate: "", endDate: "" };
  }
};

/**
 * Formats ISO date strings to Litepicker date range format
 *
 * @param startDate - Start date in ISO format (YYYY-MM-DD)
 * @param endDate - End date in ISO format (YYYY-MM-DD)
 * @returns Formatted date range string in format "D MMM, YYYY - D MMM, YYYY"
 *
 * @example
 * formatDateRange("2024-01-01", "2024-12-31")
 * // Returns: "1 Jan, 2024 - 31 Dec, 2024"
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  if (!startDate && !endDate) {
    return "";
  }

  if (startDate && endDate) {
    try {
      const start = dayjs(startDate).format("D MMM, YYYY");
      const end = dayjs(endDate).format("D MMM, YYYY");
      return `${start} - ${end}`;
    } catch {
      return "";
    }
  }

  if (startDate) {
    try {
      return dayjs(startDate).format("D MMM, YYYY");
    } catch {
      return "";
    }
  }

  return "";
};
