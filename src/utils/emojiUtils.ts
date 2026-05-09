export const unifiedToNative = (unified: string): string => {
  try {
    return unified
      .split("-")
      .map((hex) => String.fromCodePoint(parseInt(hex, 16)))
      .join("");
  } catch {
    return "";
  }
};