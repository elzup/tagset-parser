import { describe, expect, it } from 'vitest'
import { parse } from '../index.js'

const HEADER_3SETS = `
set A 赤
set B 青
set C 緑`.trim()

describe('parse', () => {
  describe('set declarations', () => {
    it('parses basic set declarations', () => {
      const input = `
set A 赤
set B 青`.trim()

      const result = parse(input)

      expect(result.sets).toEqual([
        { id: 'A', label: '赤', index: 0 },
        { id: 'B', label: '青', index: 1 },
      ])
    })

    it('handles labels with spaces', () => {
      const input = `
set A Red Color
set B Blue Color`.trim()

      const result = parse(input)

      expect(result.sets[0].label).toBe('Red Color')
      expect(result.sets[1].label).toBe('Blue Color')
    })

    it('handles empty input', () => {
      const result = parse('')

      expect(result.sets).toEqual([])
      expect(result.items).toEqual([])
    })
  })

  describe('item declarations', () => {
    it('parses basic item with single set and values', () => {
      const input = `
set A 赤
item A x,c`.trim()

      const result = parse(input)

      expect(result.items).toEqual([
        { pattern: 'A', bitmask: 1, values: ['x', 'c'] },
      ])
    })

    it('handles multiple values separated by comma', () => {
      const input = `
set A label
item A val1,val2,val3`.trim()

      const result = parse(input)

      expect(result.items[0].values).toEqual(['val1', 'val2', 'val3'])
    })
  })

  describe('bitmask calculation', () => {
    it('single set', () => {
      const input = `
set A 赤
set B 青
item A p
item B q`.trim()

      const result = parse(input)

      expect(result.items[0].bitmask).toBe(1)
      expect(result.items[1].bitmask).toBe(2)
    })

    it('three sets via sugar syntax', () => {
      const input = `
${HEADER_3SETS}
A: only-a
B: only-b
A,C: a-and-c
A,B,C: all`.trim()

      const result = parse(input)

      expect(result.items[0].bitmask).toBe(1)
      expect(result.items[1].bitmask).toBe(2)
      expect(result.items[2].bitmask).toBe(5)
      expect(result.items[3].bitmask).toBe(7)
    })
  })

  describe('pattern syntax', () => {
    it('supports _ placeholder in sugar syntax', () => {
      const input = `
${HEADER_3SETS}
A,_,C: a-and-c
_,B,_: only-b`.trim()

      const result = parse(input)

      expect(result.items[0].bitmask).toBe(5)
      expect(result.items[1].bitmask).toBe(2)
    })
  })

  describe('formatting', () => {
    it('ignores indentation', () => {
      const flat = `
set A 赤
item A x`.trim()

      const indented = `
  set A 赤
  item A x`.trim()

      expect(parse(flat)).toEqual(parse(indented))
    })
  })

  describe('colon syntax', () => {
    it('parses single set with colon', () => {
      const input = `
set A 赤
set B 青
A : 1, 2`.trim()

      const result = parse(input)

      expect(result.items).toEqual([
        { pattern: 'A', bitmask: 1, values: ['1', '2'] },
      ])
    })

    it('parses multiple sets with colon', () => {
      const input = `
${HEADER_3SETS}
A,B,C : x, y`.trim()

      const result = parse(input)

      expect(result.items).toEqual([
        { pattern: 'A,B,C', bitmask: 7, values: ['x', 'y'] },
      ])
    })

    it('mixes item and colon syntax', () => {
      const input = `
${HEADER_3SETS}
item A special
A,C : 1, 2`.trim()

      const result = parse(input)

      expect(result.items[0]).toEqual({
        pattern: 'A',
        bitmask: 1,
        values: ['special'],
      })
      expect(result.items[1]).toEqual({
        pattern: 'A,C',
        bitmask: 5,
        values: ['1', '2'],
      })
    })
  })

  describe('comments', () => {
    it('ignores comment lines', () => {
      const input = `
# this is a comment
set A 赤
# another comment
item A x`.trim()

      const result = parse(input)

      expect(result.sets).toEqual([{ id: 'A', label: '赤', index: 0 }])
      expect(result.items).toEqual([
        { pattern: 'A', bitmask: 1, values: ['x'] },
      ])
    })
  })
})
