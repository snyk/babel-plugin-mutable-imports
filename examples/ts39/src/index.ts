import { foo } from './middle';

export function bar() {
  return foo() + 2;
}
