import { memoize } from '../src';

describe('blah', () => {
  it('works', () => {
    const _func = (n: number) => n;
    const func = memoize(_func);
    func(5);
    expect(func).toHaveBeenCalledTimes;
  });
});
