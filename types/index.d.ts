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

export function parse(input: string): string
