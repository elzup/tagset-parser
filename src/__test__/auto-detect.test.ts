import { describe, expect, it } from 'vitest'
import { parse } from '../index.js'

describe('auto-detect sets', () => {
  it('auto-detects sets from item patterns when no set declared', () => {
    const input = `item A x`
    const result = parse(input)
    expect(result.sets).toEqual([{ id: 'A', label: 'A', index: 0 }])
    expect(result.items[0].bitmask).toBe(1)
  })

  it('auto-detects sets from sugar syntax', () => {
    const input = `A, B: x`
    const result = parse(input)
    expect(result.sets).toEqual([
      { id: 'A', label: 'A', index: 0 },
      { id: 'B', label: 'B', index: 1 },
    ])
  })

  it('preserves explicit sets and auto-detects missing ones', () => {
    const input = `set A Red
A, B: x`
    const result = parse(input)
    expect(result.sets).toEqual([
      { id: 'A', label: 'Red', index: 0 },
      { id: 'B', label: 'B', index: 1 },
    ])
  })

  it('auto-detects from multiple items without duplicates', () => {
    const input = `A, B: x
B, C: y`
    const result = parse(input)
    expect(result.sets).toHaveLength(3)
    expect(result.sets.map((s) => s.id)).toEqual(['A', 'B', 'C'])
  })

  it('tagset header is optional', () => {
    const input = `set A 赤
item A x`
    const result = parse(input)
    expect(result.sets).toHaveLength(1)
    expect(result.items).toHaveLength(1)
  })

  it('completely empty input returns empty AST', () => {
    const result = parse('')
    expect(result.sets).toEqual([])
    expect(result.items).toEqual([])
  })

  it('auto-detect ignores _ placeholder in sugar syntax', () => {
    const input = `A,_,C: x`
    const result = parse(input)
    expect(result.sets.map((s) => s.id)).toEqual(['A', 'C'])
    expect(result.items[0].bitmask).toBe(3)
  })
})
