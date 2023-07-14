import memoize from '../src';

describe('memoize single argument function', () => {
  let originalFunc: (n: number) => number;
  let memoizeFunc: (n: number) => number;

  beforeEach(() => {
    jest.resetAllMocks();
    originalFunc = jest.fn((n: number) => n);
    memoizeFunc = memoize(originalFunc);
  });

  it('call with same argument', () => {
    memoizeFunc(1);
    memoizeFunc(1);
    expect(originalFunc).toHaveBeenCalledTimes(1);
  });

  it('call with different argument', () => {
    memoizeFunc(1);
    memoizeFunc(2);
    expect(originalFunc).toHaveBeenCalledTimes(2);
  });
});

describe('memoize multiple arguments function', () => {
  let originalFunc: (s: string, n: number, o: object) => void;
  let memoizeFunc: (s: string, n: number, o: object) => void;

  beforeEach(() => {
    jest.resetAllMocks();
    originalFunc = jest.fn((_s: string, _n: number, _o: object) => {});
    memoizeFunc = memoize(originalFunc);
  });

  it('call with same arguments', () => {
    memoizeFunc('one', 1, { one: 1 });
    memoizeFunc('one', 1, { one: 1 });
    expect(originalFunc).toHaveBeenCalledTimes(1);
  });

  it('call with different arguments', () => {
    memoizeFunc('one', 1, { one: 1 });
    memoizeFunc('two', 2, { two: 2 });
    expect(originalFunc).toHaveBeenCalledTimes(2);
  });
});

describe('memoize with custom memoize key generator', () => {
  type Func = (point: { x: number, y: number}, length: number) => void
  let originalFunc: Func;
  let memoizeFunc: Func;
  const generator = (args: [point: { x: number, y: number}, length: number]) =>
    `${Math.abs(args[0].x)}, ${Math.abs(args[0].y)}`;

  beforeEach(() => {
    jest.resetAllMocks();
    originalFunc = jest.fn(() => {});
    memoizeFunc = memoize(originalFunc, generator);
  });

  it('call with same arguments', () => {
    memoizeFunc({ x: 1, y: 1}, 1);
    memoizeFunc({ x: 1, y: 1}, 1);
    expect(originalFunc).toHaveBeenCalledTimes(1);
  });

  it('call with different arguments', () => {
    memoizeFunc({ x: 1, y: 1}, 1);
    memoizeFunc({ x: 0, y: 0}, 0);
    expect(originalFunc).toHaveBeenCalledTimes(2);
  });

  it('call with same memoize key', () => {
    memoizeFunc({ x: 1, y: 1}, 1);
    memoizeFunc({ x: -1, y: -1}, 1);
    expect(originalFunc).toHaveBeenCalledTimes(1);
  });
});
