/**
 * @description Utility type to allow partial values inside a defined type.
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U> | undefined>
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]> | undefined
      : T[P] | undefined;
};
