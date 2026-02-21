import { CharStream, CommonTokenStream } from 'antlr4ng'
import { TagSetLexer } from './generated/TagSetLexer.js'
import { TagSetParser } from './generated/TagSetParser.js'
import { TagSetASTVisitor } from './visitor.js'
import type { TagSetAST } from './types.js'

export function parse(input: string): TagSetAST {
  const chars = CharStream.fromString(input)
  const lexer = new TagSetLexer(chars)
  const tokens = new CommonTokenStream(lexer)
  const parser = new TagSetParser(tokens)
  const tree = parser.program()

  const visitor = new TagSetASTVisitor()
  tree.accept(visitor)

  return visitor.buildAST()
}
