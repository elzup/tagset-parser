
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { TagSetListener } from "./TagSetListener.js";
import { TagSetVisitor } from "./TagSetVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class TagSetParser extends antlr.Parser {
    public static readonly TAGSET = 1;
    public static readonly SET = 2;
    public static readonly ITEM = 3;
    public static readonly AMP = 4;
    public static readonly COMMA = 5;
    public static readonly COLON = 6;
    public static readonly QUOTED_STRING = 7;
    public static readonly WORD = 8;
    public static readonly NL = 9;
    public static readonly WS = 10;
    public static readonly RULE_program = 0;
    public static readonly RULE_line = 1;
    public static readonly RULE_headerDecl = 2;
    public static readonly RULE_setDecl = 3;
    public static readonly RULE_labelPart = 4;
    public static readonly RULE_itemDecl = 5;
    public static readonly RULE_sugarDecl = 6;
    public static readonly RULE_pattern = 7;
    public static readonly RULE_valueList = 8;
    public static readonly RULE_valueItem = 9;

    public static readonly literalNames = [
        null, "'tagset'", "'set'", "'item'", "'&'", "','", "':'"
    ];

    public static readonly symbolicNames = [
        null, "TAGSET", "SET", "ITEM", "AMP", "COMMA", "COLON", "QUOTED_STRING", 
        "WORD", "NL", "WS"
    ];
    public static readonly ruleNames = [
        "program", "line", "headerDecl", "setDecl", "labelPart", "itemDecl", 
        "sugarDecl", "pattern", "valueList", "valueItem",
    ];

    public get grammarFileName(): string { return "TagSet.g4"; }
    public get literalNames(): (string | null)[] { return TagSetParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return TagSetParser.symbolicNames; }
    public get ruleNames(): string[] { return TagSetParser.ruleNames; }
    public get serializedATN(): number[] { return TagSetParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, TagSetParser._ATN, TagSetParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, TagSetParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 24;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 782) !== 0)) {
                {
                this.state = 22;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case TagSetParser.NL:
                    {
                    this.state = 20;
                    this.match(TagSetParser.NL);
                    }
                    break;
                case TagSetParser.TAGSET:
                case TagSetParser.SET:
                case TagSetParser.ITEM:
                case TagSetParser.WORD:
                    {
                    this.state = 21;
                    this.line();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 26;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 27;
            this.match(TagSetParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public line(): LineContext {
        let localContext = new LineContext(this.context, this.state);
        this.enterRule(localContext, 2, TagSetParser.RULE_line);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 33;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case TagSetParser.TAGSET:
                {
                this.state = 29;
                this.headerDecl();
                }
                break;
            case TagSetParser.SET:
                {
                this.state = 30;
                this.setDecl();
                }
                break;
            case TagSetParser.ITEM:
                {
                this.state = 31;
                this.itemDecl();
                }
                break;
            case TagSetParser.WORD:
                {
                this.state = 32;
                this.sugarDecl();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 36;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                {
                this.state = 35;
                this.match(TagSetParser.NL);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public headerDecl(): HeaderDeclContext {
        let localContext = new HeaderDeclContext(this.context, this.state);
        this.enterRule(localContext, 4, TagSetParser.RULE_headerDecl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 38;
            this.match(TagSetParser.TAGSET);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public setDecl(): SetDeclContext {
        let localContext = new SetDeclContext(this.context, this.state);
        this.enterRule(localContext, 6, TagSetParser.RULE_setDecl);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 40;
            this.match(TagSetParser.SET);
            this.state = 41;
            this.match(TagSetParser.WORD);
            this.state = 43;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 42;
                    this.labelPart();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 45;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public labelPart(): LabelPartContext {
        let localContext = new LabelPartContext(this.context, this.state);
        this.enterRule(localContext, 8, TagSetParser.RULE_labelPart);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 47;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 8)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public itemDecl(): ItemDeclContext {
        let localContext = new ItemDeclContext(this.context, this.state);
        this.enterRule(localContext, 10, TagSetParser.RULE_itemDecl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 49;
            this.match(TagSetParser.ITEM);
            this.state = 50;
            this.pattern();
            this.state = 51;
            this.valueList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public sugarDecl(): SugarDeclContext {
        let localContext = new SugarDeclContext(this.context, this.state);
        this.enterRule(localContext, 12, TagSetParser.RULE_sugarDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 53;
            this.match(TagSetParser.WORD);
            this.state = 58;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 54;
                this.match(TagSetParser.COMMA);
                this.state = 55;
                this.match(TagSetParser.WORD);
                }
                }
                this.state = 60;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 61;
            this.match(TagSetParser.COLON);
            this.state = 62;
            this.valueList();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pattern(): PatternContext {
        let localContext = new PatternContext(this.context, this.state);
        this.enterRule(localContext, 14, TagSetParser.RULE_pattern);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 64;
            this.match(TagSetParser.WORD);
            this.state = 69;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 65;
                this.match(TagSetParser.AMP);
                this.state = 66;
                this.match(TagSetParser.WORD);
                }
                }
                this.state = 71;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public valueList(): ValueListContext {
        let localContext = new ValueListContext(this.context, this.state);
        this.enterRule(localContext, 16, TagSetParser.RULE_valueList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 72;
            this.valueItem();
            this.state = 77;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 73;
                this.match(TagSetParser.COMMA);
                this.state = 74;
                this.valueItem();
                }
                }
                this.state = 79;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public valueItem(): ValueItemContext {
        let localContext = new ValueItemContext(this.context, this.state);
        this.enterRule(localContext, 18, TagSetParser.RULE_valueItem);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 81;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 80;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 7 || _la === 8)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 83;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,10,86,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,1,0,1,0,5,0,23,8,0,10,0,12,0,26,9,0,1,
        0,1,0,1,1,1,1,1,1,1,1,3,1,34,8,1,1,1,3,1,37,8,1,1,2,1,2,1,3,1,3,
        1,3,4,3,44,8,3,11,3,12,3,45,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,
        5,6,57,8,6,10,6,12,6,60,9,6,1,6,1,6,1,6,1,7,1,7,1,7,5,7,68,8,7,10,
        7,12,7,71,9,7,1,8,1,8,1,8,5,8,76,8,8,10,8,12,8,79,9,8,1,9,4,9,82,
        8,9,11,9,12,9,83,1,9,0,0,10,0,2,4,6,8,10,12,14,16,18,0,1,1,0,7,8,
        86,0,24,1,0,0,0,2,33,1,0,0,0,4,38,1,0,0,0,6,40,1,0,0,0,8,47,1,0,
        0,0,10,49,1,0,0,0,12,53,1,0,0,0,14,64,1,0,0,0,16,72,1,0,0,0,18,81,
        1,0,0,0,20,23,5,9,0,0,21,23,3,2,1,0,22,20,1,0,0,0,22,21,1,0,0,0,
        23,26,1,0,0,0,24,22,1,0,0,0,24,25,1,0,0,0,25,27,1,0,0,0,26,24,1,
        0,0,0,27,28,5,0,0,1,28,1,1,0,0,0,29,34,3,4,2,0,30,34,3,6,3,0,31,
        34,3,10,5,0,32,34,3,12,6,0,33,29,1,0,0,0,33,30,1,0,0,0,33,31,1,0,
        0,0,33,32,1,0,0,0,34,36,1,0,0,0,35,37,5,9,0,0,36,35,1,0,0,0,36,37,
        1,0,0,0,37,3,1,0,0,0,38,39,5,1,0,0,39,5,1,0,0,0,40,41,5,2,0,0,41,
        43,5,8,0,0,42,44,3,8,4,0,43,42,1,0,0,0,44,45,1,0,0,0,45,43,1,0,0,
        0,45,46,1,0,0,0,46,7,1,0,0,0,47,48,7,0,0,0,48,9,1,0,0,0,49,50,5,
        3,0,0,50,51,3,14,7,0,51,52,3,16,8,0,52,11,1,0,0,0,53,58,5,8,0,0,
        54,55,5,5,0,0,55,57,5,8,0,0,56,54,1,0,0,0,57,60,1,0,0,0,58,56,1,
        0,0,0,58,59,1,0,0,0,59,61,1,0,0,0,60,58,1,0,0,0,61,62,5,6,0,0,62,
        63,3,16,8,0,63,13,1,0,0,0,64,69,5,8,0,0,65,66,5,4,0,0,66,68,5,8,
        0,0,67,65,1,0,0,0,68,71,1,0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,15,
        1,0,0,0,71,69,1,0,0,0,72,77,3,18,9,0,73,74,5,5,0,0,74,76,3,18,9,
        0,75,73,1,0,0,0,76,79,1,0,0,0,77,75,1,0,0,0,77,78,1,0,0,0,78,17,
        1,0,0,0,79,77,1,0,0,0,80,82,7,0,0,0,81,80,1,0,0,0,82,83,1,0,0,0,
        83,81,1,0,0,0,83,84,1,0,0,0,84,19,1,0,0,0,9,22,24,33,36,45,58,69,
        77,83
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!TagSetParser.__ATN) {
            TagSetParser.__ATN = new antlr.ATNDeserializer().deserialize(TagSetParser._serializedATN);
        }

        return TagSetParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(TagSetParser.literalNames, TagSetParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return TagSetParser.vocabulary;
    }

    private static readonly decisionsToDFA = TagSetParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(TagSetParser.EOF, 0)!;
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.NL);
    	} else {
    		return this.getToken(TagSetParser.NL, i);
    	}
    }
    public line(): LineContext[];
    public line(i: number): LineContext | null;
    public line(i?: number): LineContext[] | LineContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LineContext);
        }

        return this.getRuleContext(i, LineContext);
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_program;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LineContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public headerDecl(): HeaderDeclContext | null {
        return this.getRuleContext(0, HeaderDeclContext);
    }
    public setDecl(): SetDeclContext | null {
        return this.getRuleContext(0, SetDeclContext);
    }
    public itemDecl(): ItemDeclContext | null {
        return this.getRuleContext(0, ItemDeclContext);
    }
    public sugarDecl(): SugarDeclContext | null {
        return this.getRuleContext(0, SugarDeclContext);
    }
    public NL(): antlr.TerminalNode | null {
        return this.getToken(TagSetParser.NL, 0);
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_line;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterLine) {
             listener.enterLine(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitLine) {
             listener.exitLine(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitLine) {
            return visitor.visitLine(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class HeaderDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TAGSET(): antlr.TerminalNode {
        return this.getToken(TagSetParser.TAGSET, 0)!;
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_headerDecl;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterHeaderDecl) {
             listener.enterHeaderDecl(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitHeaderDecl) {
             listener.exitHeaderDecl(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitHeaderDecl) {
            return visitor.visitHeaderDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SetDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(TagSetParser.SET, 0)!;
    }
    public WORD(): antlr.TerminalNode {
        return this.getToken(TagSetParser.WORD, 0)!;
    }
    public labelPart(): LabelPartContext[];
    public labelPart(i: number): LabelPartContext | null;
    public labelPart(i?: number): LabelPartContext[] | LabelPartContext | null {
        if (i === undefined) {
            return this.getRuleContexts(LabelPartContext);
        }

        return this.getRuleContext(i, LabelPartContext);
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_setDecl;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterSetDecl) {
             listener.enterSetDecl(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitSetDecl) {
             listener.exitSetDecl(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitSetDecl) {
            return visitor.visitSetDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LabelPartContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WORD(): antlr.TerminalNode | null {
        return this.getToken(TagSetParser.WORD, 0);
    }
    public QUOTED_STRING(): antlr.TerminalNode | null {
        return this.getToken(TagSetParser.QUOTED_STRING, 0);
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_labelPart;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterLabelPart) {
             listener.enterLabelPart(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitLabelPart) {
             listener.exitLabelPart(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitLabelPart) {
            return visitor.visitLabelPart(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ItemDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ITEM(): antlr.TerminalNode {
        return this.getToken(TagSetParser.ITEM, 0)!;
    }
    public pattern(): PatternContext {
        return this.getRuleContext(0, PatternContext)!;
    }
    public valueList(): ValueListContext {
        return this.getRuleContext(0, ValueListContext)!;
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_itemDecl;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterItemDecl) {
             listener.enterItemDecl(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitItemDecl) {
             listener.exitItemDecl(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitItemDecl) {
            return visitor.visitItemDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SugarDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WORD(): antlr.TerminalNode[];
    public WORD(i: number): antlr.TerminalNode | null;
    public WORD(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.WORD);
    	} else {
    		return this.getToken(TagSetParser.WORD, i);
    	}
    }
    public COLON(): antlr.TerminalNode {
        return this.getToken(TagSetParser.COLON, 0)!;
    }
    public valueList(): ValueListContext {
        return this.getRuleContext(0, ValueListContext)!;
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.COMMA);
    	} else {
    		return this.getToken(TagSetParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_sugarDecl;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterSugarDecl) {
             listener.enterSugarDecl(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitSugarDecl) {
             listener.exitSugarDecl(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitSugarDecl) {
            return visitor.visitSugarDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PatternContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WORD(): antlr.TerminalNode[];
    public WORD(i: number): antlr.TerminalNode | null;
    public WORD(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.WORD);
    	} else {
    		return this.getToken(TagSetParser.WORD, i);
    	}
    }
    public AMP(): antlr.TerminalNode[];
    public AMP(i: number): antlr.TerminalNode | null;
    public AMP(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.AMP);
    	} else {
    		return this.getToken(TagSetParser.AMP, i);
    	}
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_pattern;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterPattern) {
             listener.enterPattern(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitPattern) {
             listener.exitPattern(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitPattern) {
            return visitor.visitPattern(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ValueListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public valueItem(): ValueItemContext[];
    public valueItem(i: number): ValueItemContext | null;
    public valueItem(i?: number): ValueItemContext[] | ValueItemContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ValueItemContext);
        }

        return this.getRuleContext(i, ValueItemContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.COMMA);
    	} else {
    		return this.getToken(TagSetParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_valueList;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterValueList) {
             listener.enterValueList(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitValueList) {
             listener.exitValueList(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitValueList) {
            return visitor.visitValueList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ValueItemContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WORD(): antlr.TerminalNode[];
    public WORD(i: number): antlr.TerminalNode | null;
    public WORD(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.WORD);
    	} else {
    		return this.getToken(TagSetParser.WORD, i);
    	}
    }
    public QUOTED_STRING(): antlr.TerminalNode[];
    public QUOTED_STRING(i: number): antlr.TerminalNode | null;
    public QUOTED_STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(TagSetParser.QUOTED_STRING);
    	} else {
    		return this.getToken(TagSetParser.QUOTED_STRING, i);
    	}
    }
    public override get ruleIndex(): number {
        return TagSetParser.RULE_valueItem;
    }
    public override enterRule(listener: TagSetListener): void {
        if(listener.enterValueItem) {
             listener.enterValueItem(this);
        }
    }
    public override exitRule(listener: TagSetListener): void {
        if(listener.exitValueItem) {
             listener.exitValueItem(this);
        }
    }
    public override accept<Result>(visitor: TagSetVisitor<Result>): Result | null {
        if (visitor.visitValueItem) {
            return visitor.visitValueItem(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
