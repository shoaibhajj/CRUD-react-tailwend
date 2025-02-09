/**
 *
 * @param {string}  text - the input text to be sliced.
 * @param {number} [maxLength=50] - the maximum length after truncation.
 * @returns the sliced text, with an ellipsis (...) applied if truncated.
 */

export function textSlicer(text: string, maxLength: number = 50) {
  if (text.length >= maxLength) return `${text.slice(0, maxLength) + "..."}`;
  return text;
}

export function explainPrice(price: string) {
 if(price.length > 3) return `${price.slice(0,3)+","+price.slice(3, price.length)}`
  return price;
}
