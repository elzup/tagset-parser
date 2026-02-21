import { describe, expect, it } from 'vitest'
import { parse } from '../index.js'

describe('sugar syntax (colon)', () => {
  it('parses single set with colon syntax', () => {
    const input = `set A 赤
A: x`
    const result = parse(input)
    expect(result.items).toEqual([
      { pattern: 'A', bitmask: 1, values: ['x'] },
    ])
  })

  it('parses multiple sets with colon syntax', () => {
    const input = `set A 赤
set B 青
A, B: x, y`
    const result = parse(input)
    expect(result.items).toEqual([
      { pattern: 'A&B', bitmask: 3, values: ['x', 'y'] },
    ])
  })

  it('mixes item and sugar syntax', () => {
    const input = `set A 赤
set B 青
item A&B x
A, B: y`
    const result = parse(input)
    expect(result.items).toHaveLength(2)
    expect(result.items[0].values).toEqual(['x'])
    expect(result.items[1].values).toEqual(['y'])
  })

  it('sugar with single value', () => {
    const input = `set A 赤
A: only-one`
    const result = parse(input)
    expect(result.items[0].values).toEqual(['only-one'])
  })
})
