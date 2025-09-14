// Utility to format a byte size into a human-readable string using KB, MB, or GB
// - Always uses a minimum unit of KB (so values < 1024 bytes become fractional KB)
// - Rounds to 2 decimal places for fractional values, 0 decimals for whole numbers
// - Handles edge cases like negative, NaN, or infinite inputs by returning "0 KB"

export function utils(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }

  const units = ["KB", "MB", "GB"] as const;

  // Start from KB as the smallest unit per requirements
  let value = bytes / 1024; // KB
  let unitIndex = 0; // 0 => KB

  while (value >= 1024 && unitIndex < units.length - 1) {
    value = value / 1024;
    unitIndex++;
  }

  const formatted = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2);
  return `${formatted} ${units[unitIndex]}`;
}

export default utils;

export const generateUUID = () => crypto.randomUUID();