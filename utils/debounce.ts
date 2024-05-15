function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      // @ts-ignore:忽略this
      func.apply(this, args);
    }, delay);
  };
}

export default useDebounce;
