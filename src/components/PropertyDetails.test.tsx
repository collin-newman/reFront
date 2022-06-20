import { describe, expect, it } from 'vitest'

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
  it('serial test', async () => {
    expect(1).toBe(1)
  })
  it.concurrent('concurrent test 1', async () => {
    expect(1).toBe(1)
  })
  it.concurrent('concurrent test 2', async () => {
    expect(1).toBe(2)
  })
})
