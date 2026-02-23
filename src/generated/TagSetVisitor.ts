
import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgramContext } from "./TagSetParser.js";
import { LineContext } from "./TagSetParser.js";
import { SetDeclContext } from "./TagSetParser.js";
import { LabelPartContext } from "./TagSetParser.js";
import { ItemDeclContext } from "./TagSetParser.js";
import { SugarDeclContext } from "./TagSetParser.js";
import { ValueListContext } from "./TagSetParser.js";
import { ValueItemContext } from "./TagSetParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `TagSetParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class TagSetVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `TagSetParser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by `TagSetParser.line`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLine?: (ctx: LineContext) => Result;
    /**
     * Visit a parse tree produced by `TagSetParser.setDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSetDecl?: (ctx: SetDeclContext) => Result;
    /**
     * Visit a parse tree produced by `TagSetParser.labelPart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLabelPart?: (ctx: LabelPartContext) => Result;
    /**
     * Visit a parse tree produced by `TagSetParser.itemDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitItemDecl?: (ctx: ItemDeclContext) => Result;
    /**
     * Visit a parse tree produced by `TagSetParser.sugarDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSugarDecl?: (ctx: SugarDeclContext) => Result;
    /**
     * Visit a parse tree produced by `TagSetParser.valueList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValueList?: (ctx: ValueListContext) => Result;
    /**
     * Visit a parse tree produced by `TagSetParser.valueItem`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValueItem?: (ctx: ValueItemContext) => Result;
}

