import { describe, it, expect } from 'vitest';

console.log('Test file loading...');
console.log('describe:', typeof describe);
console.log('it:', typeof it);
console.log('expect:', typeof expect);

describe('Simple Test', () => {
  console.log('Inside describe block');
  it('should pass', () => {
    console.log('Inside it block');
    expect(1 + 1).toBe(2);
  });
});
