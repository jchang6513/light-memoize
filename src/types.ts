export type Generator<A extends unknown[]> = (A: A) => string;

export type Func<A extends unknown[], R extends unknown> = (...A: A) => R;
