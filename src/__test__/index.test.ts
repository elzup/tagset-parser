import { describe, expect, it } from 'vitest'
import { parse } from '../index.js'

describe('parse', () => {
  it('parses basic set and item declarations', () => {
    const input = `tagset
set A 赤
set B 青
item A&B x,c`

    const result = parse(input)

    expect(result.sets).toEqual([
      { id: 'A', label: '赤', index: 0 },
      { id: 'B', label: '青', index: 1 },
    ])
    expect(result.items).toEqual([
      { pattern: 'A&B', bitmask: 3, values: ['x', 'c'] },
    ])
  })

  it('calculates bitmask for single set', () => {
    const input = `tagset
set A 赤
set B 青
item A p
item B q`

    const result = parse(input)

    expect(result.items[0].bitmask).toBe(1)
    expect(result.items[1].bitmask).toBe(2)
  })

  it('calculates bitmask for three sets', () => {
    const input = `tagset
set A 赤
set B 青
set C 緑
item A only-a
item B only-b
item A&C a-and-c
item A&B&C all`

    const result = parse(input)

    expect(result.items[0].bitmask).toBe(1)
    expect(result.items[1].bitmask).toBe(2)
    expect(result.items[2].bitmask).toBe(5)
    expect(result.items[3].bitmask).toBe(7)
  })

  it('supports _ placeholder in & syntax', () => {
    const input = `tagset
set A 赤
set B 青
set C 緑
item A&_&C a-and-c
item _&B&_ only-b`

    const result = parse(input)

    expect(result.items[0].bitmask).toBe(5)
    expect(result.items[1].bitmask).toBe(2)
  })

  it('supports padding syntax', () => {
    const input = `tagset
set A 赤
set B 青
set C 緑
item A  &C a-and-c
item A & C a-and-c2
item A     "only-a1"
item  A    "only-a2"
item   B   only-b`

    const result = parse(input)

    expect(result.items[0].bitmask).toBe(5) // A&C
    expect(result.items[1].bitmask).toBe(5) // A & C
    expect(result.items[2].bitmask).toBe(1) // A
    expect(result.items[3].bitmask).toBe(1) // A
    expect(result.items[4].bitmask).toBe(2) // B
  })

  it('handles multiple values separated by comma', () => {
    const input = `tagset
set A label
item A val1,val2,val3`

    const result = parse(input)

    expect(result.items[0].values).toEqual(['val1', 'val2', 'val3'])
  })

  it('handles empty input with only header', () => {
    const result = parse('tagset')

    expect(result.sets).toEqual([])
    expect(result.items).toEqual([])
  })

  it('handles labels with spaces', () => {
    const input = `tagset
set A Red Color
set B Blue Color`

    const result = parse(input)

    expect(result.sets[0].label).toBe('Red Color')
    expect(result.sets[1].label).toBe('Blue Color')
  })

  it('ignores indentation', () => {
    const flat = `tagset
set A 赤
item A x`

    const indented = `tagset
  set A 赤
  item A x`

    expect(parse(flat)).toEqual(parse(indented))
  })
})
