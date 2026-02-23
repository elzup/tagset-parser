import { TagSetVisitor } from './generated/TagSetVisitor.js'
import type {
  ProgramContext,
  SetDeclContext,
  ItemDeclContext,
  SugarDeclContext,
  ValueListContext,
  ValueItemContext,
} from './generated/TagSetParser.js'
import { calcBitmask } from './bitmask.js'
import type { SetDecl, ItemDecl, TagSetAST } from './types.js'

interface RawItem {
  patternIds: string[]
  values: string[]
}

function extractValues(ctx: ValueListContext): string[] {
  return ctx.valueItem().map((vi: ValueItemContext) => {
    const parts = [
      ...vi.WORD().map((w) => w.getText()),
      ...vi.QUOTED_STRING().map((q) => {
        const text = q.getText()
        return text.startsWith('"') && text.endsWith('"')
          ? text.slice(1, -1)
          : text
      }),
    ]
    return parts.join(' ')
  })
}

function autoDetectSets(
  explicitSets: SetDecl[],
  rawItems: RawItem[]
): SetDecl[] {
  const explicitIds = new Set(explicitSets.map((s) => s.id))
  const discovered: string[] = []

  for (const item of rawItems) {
    for (const id of item.patternIds) {
      if (!explicitIds.has(id) && !discovered.includes(id)) {
        discovered.push(id)
      }
    }
  }

  let nextIndex = explicitSets.length
  const autoSets: SetDecl[] = discovered.map((id) => ({
    id,
    label: id,
    index: nextIndex++,
  }))

  return [...explicitSets, ...autoSets]
}

export class TagSetASTVisitor extends TagSetVisitor<void> {
  private explicitSets: SetDecl[] = []
  private rawItems: RawItem[] = []
  private setIndex = 0

  override visitProgram = (ctx: ProgramContext): void => {
    for (const line of ctx.line()) {
      line.accept(this)
    }
  }

  override visitSetDecl = (ctx: SetDeclContext): void => {
    const id = ctx.WORD()!.getText()
    const label = ctx
      .labelPart()
      .map((lp) => lp.getText())
      .join(' ')

    this.explicitSets.push({ id, label, index: this.setIndex++ })
  }

  override visitItemDecl = (ctx: ItemDeclContext): void => {
    const id = ctx.WORD()!.getText()
    const patternIds = id === '_' ? [] : [id]
    const values = extractValues(ctx.valueList())
    this.rawItems.push({ patternIds, values })
  }

  override visitSugarDecl = (ctx: SugarDeclContext): void => {
    const patternIds = ctx
      .WORD()
      .map((w) => w.getText())
      .filter((t) => t !== '_')
    const values = extractValues(ctx.valueList())
    this.rawItems.push({ patternIds, values })
  }

  buildAST(): TagSetAST {
    const sets = autoDetectSets(this.explicitSets, this.rawItems)
    const items: ItemDecl[] = this.rawItems.map((raw) => {
      const pattern = raw.patternIds.join(',')
      const bitmask = calcBitmask(pattern, sets)
      return { pattern, bitmask, values: raw.values }
    })
    return { sets, items }
  }
}
