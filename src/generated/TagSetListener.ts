
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./TagSetParser.js";
import { LineContext } from "./TagSetParser.js";
import { HeaderDeclContext } from "./TagSetParser.js";
import { SetDeclContext } from "./TagSetParser.js";
import { LabelPartContext } from "./TagSetParser.js";
import { ItemDeclContext } from "./TagSetParser.js";
import { SugarDeclContext } from "./TagSetParser.js";
import { PatternContext } from "./TagSetParser.js";
import { ValueListContext } from "./TagSetParser.js";
import { ValueItemContext } from "./TagSetParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `TagSetParser`.
 */
export class TagSetListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `TagSetParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.line`.
     * @param ctx the parse tree
     */
    enterLine?: (ctx: LineContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.line`.
     * @param ctx the parse tree
     */
    exitLine?: (ctx: LineContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.headerDecl`.
     * @param ctx the parse tree
     */
    enterHeaderDecl?: (ctx: HeaderDeclContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.headerDecl`.
     * @param ctx the parse tree
     */
    exitHeaderDecl?: (ctx: HeaderDeclContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.setDecl`.
     * @param ctx the parse tree
     */
    enterSetDecl?: (ctx: SetDeclContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.setDecl`.
     * @param ctx the parse tree
     */
    exitSetDecl?: (ctx: SetDeclContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.labelPart`.
     * @param ctx the parse tree
     */
    enterLabelPart?: (ctx: LabelPartContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.labelPart`.
     * @param ctx the parse tree
     */
    exitLabelPart?: (ctx: LabelPartContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.itemDecl`.
     * @param ctx the parse tree
     */
    enterItemDecl?: (ctx: ItemDeclContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.itemDecl`.
     * @param ctx the parse tree
     */
    exitItemDecl?: (ctx: ItemDeclContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.sugarDecl`.
     * @param ctx the parse tree
     */
    enterSugarDecl?: (ctx: SugarDeclContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.sugarDecl`.
     * @param ctx the parse tree
     */
    exitSugarDecl?: (ctx: SugarDeclContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.pattern`.
     * @param ctx the parse tree
     */
    enterPattern?: (ctx: PatternContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.pattern`.
     * @param ctx the parse tree
     */
    exitPattern?: (ctx: PatternContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.valueList`.
     * @param ctx the parse tree
     */
    enterValueList?: (ctx: ValueListContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.valueList`.
     * @param ctx the parse tree
     */
    exitValueList?: (ctx: ValueListContext) => void;
    /**
     * Enter a parse tree produced by `TagSetParser.valueItem`.
     * @param ctx the parse tree
     */
    enterValueItem?: (ctx: ValueItemContext) => void;
    /**
     * Exit a parse tree produced by `TagSetParser.valueItem`.
     * @param ctx the parse tree
     */
    exitValueItem?: (ctx: ValueItemContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

