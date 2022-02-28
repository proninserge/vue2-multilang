export const debounce = (fn: () => void, ms: number): (() => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
};
