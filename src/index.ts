import { Func, Generator } from './types';

const generateMemoizeKey = <A extends unknown[]>(
  args: A,
  generator?: Generator<A>
) => generator?.(args) || JSON.stringify(args);

export const memoize = <A extends unknown[], R extends unknown>(
  fn: Func<A, R>,
  generator?: Generator<A>
): Func<A, R> => {
  const cache: Record<string, R> = {};

  return (...args: A) => {
    const serialized = generateMemoizeKey(args, generator);
    if (!(serialized in cache)) {
      cache[serialized] = fn?.(...args);
    }
    return cache[serialized];
  };
};

export default memoize;
