export interface SetDecl {
  id: string
  label: string
  index: number
}

export interface ItemDecl {
  pattern: string
  bitmask: number
  values: string[]
}

export interface TagSetAST {
  sets: SetDecl[]
  items: ItemDecl[]
}

function isSetId(token: string, sets: SetDecl[]): boolean {
  return sets.some((s) => s.id === token)
}

function isPatternToken(token: string, sets: SetDecl[]): boolean {
  if (token === '&' || token === '_') return true
  if (token.includes('&')) return true
  return isSetId(token, sets)
}

function calcBitmask(pattern: string, sets: SetDecl[]): number {
  const tokens = pattern.split('&')
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

function parseItemTokens(
  allTokens: string[],
  sets: SetDecl[]
): { pattern: string; values: string[] } {
  const tokens = allTokens.filter((t) => t !== '')

  // Find first non-pattern token
  let splitIdx = tokens.length
  for (let i = 0; i < tokens.length; i++) {
    if (!isPatternToken(tokens[i], sets)) {
      splitIdx = i
      break
    }
  }

  // Extract set IDs from pattern tokens
  const setIds: string[] = []
  for (let i = 0; i < splitIdx; i++) {
    const tok = tokens[i]
    if (tok === '&' || tok === '_') continue
    if (tok.includes('&')) {
      for (const t of tok.split('&')) {
        const trimmed = t.trim()
        if (trimmed !== '' && trimmed !== '_') {
          setIds.push(trimmed)
        }
      }
    } else {
      setIds.push(tok)
    }
  }

  const pattern = setIds.join('&')
  const valueParts = tokens.slice(splitIdx)
  const valueStr = valueParts.join(' ')
  const values = valueStr.split(',').map((v) => v.trim())

  return { pattern, values }
}

export function parse(input: string): TagSetAST {
  const sets: SetDecl[] = []
  const items: ItemDecl[] = []
  const lines = input.split('\n')
  let setIndex = 0

  for (const lineRaw of lines) {
    const line = lineRaw.trim()
    if (line === '' || line === 'tagset') continue

    if (line.startsWith('set ')) {
      const rest = line.slice(4).trim()
      const parts = rest.split(' ')
      if (parts.length >= 2) {
        const id = parts[0]
        const label = parts.slice(1).join(' ')
        sets.push({ id, label, index: setIndex })
        setIndex++
      }
    } else if (line.startsWith('item ')) {
      const rest = line.slice(5).trim()
      const allTokens = rest.split(' ')
      const { pattern, values } = parseItemTokens(allTokens, sets)
      if (pattern !== '') {
        const bitmask = calcBitmask(pattern, sets)
        items.push({ pattern, bitmask, values })
      }
    }
  }

  return { sets, items }
}
