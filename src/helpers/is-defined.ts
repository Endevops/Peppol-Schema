export function isDefined<const T>(value: T): value is Exclude<T, undefined | null> {
  return typeof value !== 'undefined' && value !== null;
}
