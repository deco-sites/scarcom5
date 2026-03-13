/**
 * Converts various CSS unit values to their equivalent pixel value.
 * Handles px, rem, em, vh, vw, and % units. Defaults to returning the numeric value
 * if no unit is specified or if the unit is not recognized.
 *
 * @param value - The CSS value to convert (e.g. "16px", "2rem", "50vh")
 * @returns The equivalent pixel value as a number
 */
export const convertToPx = (value: string): number => {
  const numericValue = parseFloat(value);

  if (value.includes("px")) return numericValue;
  if (value.includes("rem")) return numericValue * 16;
  if (value.includes("em")) return numericValue * 16;
  if (value.includes("vh")) {
    return (numericValue / 100) * globalThis.innerHeight;
  }
  if (value.includes("vw")) return (numericValue / 100) * globalThis.innerWidth;
  if (value.includes("%")) return numericValue;

  return numericValue;
};
