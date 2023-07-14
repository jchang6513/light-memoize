import { Func, Generator } from './types';

const generateMemoizeKey = <A extends unknown[]>(
  A: A,
  generator?: Generator<A>
) => generator?.(A) || JSON.stringify(A);

export const memoize = <A extends unknown[], R extends unknown>(
  fn: Func<A, R>,
  generator?: Generator<A>
): Func<A, R> => {
  const cache: Record<string, R> = {};

  return (...A: A) => {
    const serialized = generateMemoizeKey(A, generator);
    if (!(serialized in cache)) {
      cache[serialized] = fn?.(...A);
    }
    return cache[serialized];
  };
};

export default memoize;
