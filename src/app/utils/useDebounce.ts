export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return debounced;
}
