/**
 * A function that creates a new object from the original, but takes away keys that have an undefined value.
 *
 * @param object An object from which you need to remove keys that have the value undefined
 * @returns Object without keys with value undefined
 */
export const removeUndefinedKey = <GObject extends Record<string, unknown>>(
  object: GObject
): GObject => {
  const res = {};
  for (const key of Object.keys(object)) {
    const value = object[key];
    if (typeof value !== 'undefined') {
      res[key] = value;
    }
  }
  return res as GObject;
};
