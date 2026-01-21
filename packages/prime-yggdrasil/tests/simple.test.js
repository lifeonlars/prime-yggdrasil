import { describe, it, expect } from 'vitest';

console.log('JS test file loading...');

describe('Simple JS Test', () => {
  console.log('Inside describe block');
  it('should pass', () => {
    console.log('Inside it block');
    expect(1 + 1).toBe(2);
  });
});
