import { describe, test, expect } from '@jest/globals';
import Interpolator, { ValueMap, VariableMap } from './Interpolator';

describe('interpolation', function () {
  test.each([
    ['', {}],
    [`# some comment`, {}],
    [`x = 100`, {}],
    [`x = 10; # some x`, {}],
    [`x = 1; # @param`, { x: { name: 'x', kind: 'param', initial: 1 } }],
    [`x = 10; # @param nonsense`, { x: { name: 'x', kind: 'param', initial: 10 } }],
    [
      `x = 1; # @param { min: 0 }`,
      { x: { name: 'x', kind: 'param', initial: 1, metadata: { min: 0 } } },
    ],
    [
      `z = unknowable(x); # @output`,
      {
        z: {
          name: 'z',
          kind: 'output',
          initial: 'unknowable(x)',
        },
      },
    ],
    [
      `z = k; # @output { meta: "data" }`,
      {
        z: {
          name: 'z',
          kind: 'output',
          initial: 'k',
          metadata: { meta: 'data' },
        },
      },
    ],
    [
      `
    # some comment
    import something
    x = 1 # @param
    y = 2;# @param
    print('some more code')
    z = x*y# @output
    `,
      {
        x: { name: 'x', kind: 'param', initial: 1 },
        y: { name: 'y', kind: 'param', initial: 2 },
        z: { name: 'z', kind: 'output', initial: 'x*y' },
      },
    ],
  ])('parseSource', function (source: string, mapping: Record<string, string>) {
    expect(Interpolator.parseSource(source)).toEqual(mapping);
  });

  test.each([
    ['', {}, {}, ''],
    ['', { x: { name: 'x', kind: 'param', initial: 1 } }, { a: 1, b: true, c: 'thing' }, ''],
    [
      '# some comment',
      { x: { name: 'x', kind: 'param', initial: 1 } },
      { a: 1, b: true, c: 'thing' },
      '# some comment',
    ],
    [`x = 1`, {}, { x: 10, a: 1, b: true, c: 'thing' }, 'x = 1'],
    [`x = 1; # some x`, {}, { x: 10, a: 1, b: true, c: 'thing' }, 'x = 1; # some x'],
    [
      `x = 1; # @param`,
      { x: { name: 'x', kind: 'param', initial: 1 } },
      { x: 10, a: 1, b: true, c: 'thing' },
      'x=10 # @param',
    ],
  ])(
    'interpolateParams',
    function (source: string, mapping: VariableMap, values: ValueMap, expected: string) {
      expect(Interpolator.interpolateParams(source, mapping, values)).toEqual(expected);
    },
  );
});
