/**
 * Handles change events on an <input> by stripping out non-digit characters
 * and clamping the result to a maximum length.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
 * @param {number} [limit=10] - Maximum number of digits allowed. default: 10
 * @returns {string} The cleaned and clamped numeric string.
 */
export const handleInputAmountChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  limit = 10,
) => {
  // 1. remove non-digits
  const numericOnly = event.target.value.replace(/[^0-9]/g, "");

  // 2. clamp to `limit` digits
  const clamped = numericOnly.length > 0 ? numericOnly.slice(0, limit) : "";

  // 3. write back and return as string
  return (event.target.value = clamped.toString());
};
