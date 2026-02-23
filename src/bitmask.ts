import type { SetDecl } from './types.js'

export function calcBitmask(pattern: string, sets: SetDecl[]): number {
  const tokens = pattern.split(',')
  let mask = 0
  for (const token of tokens) {
    const t = token.trim()
    if (t !== '' && t !== '_') {
      for (const set of sets) {
        if (set.id === t) {
          mask = mask | (1 << set.index)
        }
      }
    }
  }
  return mask
}
