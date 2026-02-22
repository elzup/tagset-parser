
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { TagSetListener } from "./TagSetListener.js";
import { TagSetVisitor } from "./TagSetVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class TagSetParser extends antlr.Parser {
    public static readonly SET = 1;
    public static readonly ITEM = 2;
    public static readonly AMP = 3;
    public static readonly COMMA = 4;
    public static readonly COLON = 5;
    public static readonly QUOTED_STRING = 6;
    public static readonly WORD = 7;
    public static readonly NL = 8;
    public static readonly WS = 9;
    public static readonly RULE_program = 0;
    public static readonly RULE_line = 1;
    public static readonly RULE_setDecl = 2;
    public static readonly RULE_labelPart = 3;
    public static readonly RULE_itemDecl = 4;
    public static readonly RULE_sugarDecl = 5;
    public static readonly RULE_pattern = 6;
    public static readonly RULE_valueList = 7;
    public static readonly RULE_valueItem = 8;

    public static readonly literalNames = [
        null, "'set'", "'item'", "'&'", "','", "':'"
    ];

    public static readonly symbolicNames = [
        null, "SET", "ITEM", "AMP", "COMMA", "COLON", "QUOTED_STRING", "WORD", 
        "NL", "WS"
    ];
    public static readonly ruleNames = [
        "program", "line", "setDecl", "labelPart", "itemDecl", "sugarDecl", 
        "pattern", "valueList", "valueItem",
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
            this.state = 22;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 390) !== 0)) {
                {
                this.state = 20;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case TagSetParser.NL:
                    {
                    this.state = 18;
                    this.match(TagSetParser.NL);
                    }
                    break;
                case TagSetParser.SET:
                case TagSetParser.ITEM:
                case TagSetParser.WORD:
                    {
                    this.state = 19;
                    this.line();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 24;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 25;
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
            this.state = 30;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case TagSetParser.SET:
                {
                this.state = 27;
                this.setDecl();
                }
                break;
            case TagSetParser.ITEM:
                {
                this.state = 28;
                this.itemDecl();
                }
                break;
            case TagSetParser.WORD:
                {
                this.state = 29;
                this.sugarDecl();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 33;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                {
                this.state = 32;
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
    public setDecl(): SetDeclContext {
        let localContext = new SetDeclContext(this.context, this.state);
        this.enterRule(localContext, 4, TagSetParser.RULE_setDecl);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 35;
            this.match(TagSetParser.SET);
            this.state = 36;
            this.match(TagSetParser.WORD);
            this.state = 38;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 37;
                    this.labelPart();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 40;
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
        this.enterRule(localContext, 6, TagSetParser.RULE_labelPart);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 42;
            _la = this.tokenStream.LA(1);
            if(!(_la === 6 || _la === 7)) {
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
        this.enterRule(localContext, 8, TagSetParser.RULE_itemDecl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 44;
            this.match(TagSetParser.ITEM);
            this.state = 45;
            this.pattern();
            this.state = 46;
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
        this.enterRule(localContext, 10, TagSetParser.RULE_sugarDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 48;
            this.match(TagSetParser.WORD);
            this.state = 53;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 49;
                this.match(TagSetParser.COMMA);
                this.state = 50;
                this.match(TagSetParser.WORD);
                }
                }
                this.state = 55;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 56;
            this.match(TagSetParser.COLON);
            this.state = 57;
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
        this.enterRule(localContext, 12, TagSetParser.RULE_pattern);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 59;
            this.match(TagSetParser.WORD);
            this.state = 64;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 3) {
                {
                {
                this.state = 60;
                this.match(TagSetParser.AMP);
                this.state = 61;
                this.match(TagSetParser.WORD);
                }
                }
                this.state = 66;
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
        this.enterRule(localContext, 14, TagSetParser.RULE_valueList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 67;
            this.valueItem();
            this.state = 72;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 4) {
                {
                {
                this.state = 68;
                this.match(TagSetParser.COMMA);
                this.state = 69;
                this.valueItem();
                }
                }
                this.state = 74;
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
        this.enterRule(localContext, 16, TagSetParser.RULE_valueItem);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 76;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 75;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 6 || _la === 7)) {
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
                this.state = 78;
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
        4,1,9,81,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,
        2,7,7,7,2,8,7,8,1,0,1,0,5,0,21,8,0,10,0,12,0,24,9,0,1,0,1,0,1,1,
        1,1,1,1,3,1,31,8,1,1,1,3,1,34,8,1,1,2,1,2,1,2,4,2,39,8,2,11,2,12,
        2,40,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,5,5,52,8,5,10,5,12,5,55,
        9,5,1,5,1,5,1,5,1,6,1,6,1,6,5,6,63,8,6,10,6,12,6,66,9,6,1,7,1,7,
        1,7,5,7,71,8,7,10,7,12,7,74,9,7,1,8,4,8,77,8,8,11,8,12,8,78,1,8,
        0,0,9,0,2,4,6,8,10,12,14,16,0,1,1,0,6,7,81,0,22,1,0,0,0,2,30,1,0,
        0,0,4,35,1,0,0,0,6,42,1,0,0,0,8,44,1,0,0,0,10,48,1,0,0,0,12,59,1,
        0,0,0,14,67,1,0,0,0,16,76,1,0,0,0,18,21,5,8,0,0,19,21,3,2,1,0,20,
        18,1,0,0,0,20,19,1,0,0,0,21,24,1,0,0,0,22,20,1,0,0,0,22,23,1,0,0,
        0,23,25,1,0,0,0,24,22,1,0,0,0,25,26,5,0,0,1,26,1,1,0,0,0,27,31,3,
        4,2,0,28,31,3,8,4,0,29,31,3,10,5,0,30,27,1,0,0,0,30,28,1,0,0,0,30,
        29,1,0,0,0,31,33,1,0,0,0,32,34,5,8,0,0,33,32,1,0,0,0,33,34,1,0,0,
        0,34,3,1,0,0,0,35,36,5,1,0,0,36,38,5,7,0,0,37,39,3,6,3,0,38,37,1,
        0,0,0,39,40,1,0,0,0,40,38,1,0,0,0,40,41,1,0,0,0,41,5,1,0,0,0,42,
        43,7,0,0,0,43,7,1,0,0,0,44,45,5,2,0,0,45,46,3,12,6,0,46,47,3,14,
        7,0,47,9,1,0,0,0,48,53,5,7,0,0,49,50,5,4,0,0,50,52,5,7,0,0,51,49,
        1,0,0,0,52,55,1,0,0,0,53,51,1,0,0,0,53,54,1,0,0,0,54,56,1,0,0,0,
        55,53,1,0,0,0,56,57,5,5,0,0,57,58,3,14,7,0,58,11,1,0,0,0,59,64,5,
        7,0,0,60,61,5,3,0,0,61,63,5,7,0,0,62,60,1,0,0,0,63,66,1,0,0,0,64,
        62,1,0,0,0,64,65,1,0,0,0,65,13,1,0,0,0,66,64,1,0,0,0,67,72,3,16,
        8,0,68,69,5,4,0,0,69,71,3,16,8,0,70,68,1,0,0,0,71,74,1,0,0,0,72,
        70,1,0,0,0,72,73,1,0,0,0,73,15,1,0,0,0,74,72,1,0,0,0,75,77,7,0,0,
        0,76,75,1,0,0,0,77,78,1,0,0,0,78,76,1,0,0,0,78,79,1,0,0,0,79,17,
        1,0,0,0,9,20,22,30,33,40,53,64,72,78
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
