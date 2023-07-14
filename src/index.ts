export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

type Generator = (args: unknown) => string

const generateMemoizeKey = (args: unknown, generator?: (args: unknown) => string) =>
  generator?.(args) || JSON.stringify(args)

export const memoize = <F extends (...args: any) => unknown>(fn: F, generator?: Generator): F => {
  const cache: Record<string, unknown> = {};

  return ((...args: unknown[]) => {
    const serialized = generateMemoizeKey(args, generator);
    if (!cache[serialized]) {
      cache[serialized] = fn?.(...args);
    }
    return cache[serialized];
  }) as F;
};

export default memoize;
