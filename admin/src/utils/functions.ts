/**
 * add up html element classes
 */

export const addClassNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
