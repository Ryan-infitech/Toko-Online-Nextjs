/**
 * Conditionally joins CSS class names together
 * A simplified version of the classnames npm package
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
