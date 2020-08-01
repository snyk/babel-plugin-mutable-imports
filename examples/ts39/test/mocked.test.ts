import * as end from '../src/middle';
import { bar } from '../src';

test('stuff', () => {
  (end as any).foo = () => 10;
  expect(bar()).toBe(12);
});
