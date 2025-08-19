/* eslint-disable @typescript-eslint/no-this-alias */
export const throttle = <TArgsCallback = unknown, TThisCallback = unknown>(
  callback: (this: TThisCallback | undefined, ...args: TArgsCallback[]) => unknown,
  ms = 1000
) => {
  let isThrottle = false;
  let wrapperArgs: TArgsCallback[] | undefined;
  let wrapperThis: TThisCallback | undefined;

  function wrapper(this: TThisCallback | undefined, ...args: TArgsCallback[]) {
    if (isThrottle) {
      wrapperArgs = args;
      wrapperThis = this;
      return;
    }

    callback.apply(this, args);

    isThrottle = true;

    setTimeout(() => {
      isThrottle = false;
      if (wrapperArgs) {
        wrapper.call(wrapperThis, ...wrapperArgs);
        wrapperArgs = wrapperThis = undefined;
      }
    }, ms);
  }

  return wrapper;
};
