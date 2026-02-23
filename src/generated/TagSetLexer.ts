
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class TagSetLexer extends antlr.Lexer {
    public static readonly SET = 1;
    public static readonly ITEM = 2;
    public static readonly COMMA = 3;
    public static readonly COLON = 4;
    public static readonly QUOTED_STRING = 5;
    public static readonly WORD = 6;
    public static readonly COMMENT = 7;
    public static readonly NL = 8;
    public static readonly WS = 9;

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, "'set'", "'item'", "','", "':'"
    ];

    public static readonly symbolicNames = [
        null, "SET", "ITEM", "COMMA", "COLON", "QUOTED_STRING", "WORD", 
        "COMMENT", "NL", "WS"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "SET", "ITEM", "COMMA", "COLON", "QUOTED_STRING", "WORD", "COMMENT", 
        "NL", "WS",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, TagSetLexer._ATN, TagSetLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "TagSet.g4"; }

    public get literalNames(): (string | null)[] { return TagSetLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return TagSetLexer.symbolicNames; }
    public get ruleNames(): string[] { return TagSetLexer.ruleNames; }

    public get serializedATN(): number[] { return TagSetLexer._serializedATN; }

    public get channelNames(): string[] { return TagSetLexer.channelNames; }

    public get modeNames(): string[] { return TagSetLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,9,67,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,
        6,7,6,2,7,7,7,2,8,7,8,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,
        2,1,3,1,3,1,4,1,4,5,4,35,8,4,10,4,12,4,38,9,4,1,4,1,4,1,5,4,5,43,
        8,5,11,5,12,5,44,1,6,1,6,5,6,49,8,6,10,6,12,6,52,9,6,1,6,1,6,1,7,
        4,7,57,8,7,11,7,12,7,58,1,8,4,8,62,8,8,11,8,12,8,63,1,8,1,8,0,0,
        9,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,1,0,4,3,0,10,10,13,13,
        34,34,6,0,9,10,13,13,32,32,34,34,44,44,58,58,2,0,10,10,13,13,2,0,
        9,9,32,32,71,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,
        1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,1,19,
        1,0,0,0,3,23,1,0,0,0,5,28,1,0,0,0,7,30,1,0,0,0,9,32,1,0,0,0,11,42,
        1,0,0,0,13,46,1,0,0,0,15,56,1,0,0,0,17,61,1,0,0,0,19,20,5,115,0,
        0,20,21,5,101,0,0,21,22,5,116,0,0,22,2,1,0,0,0,23,24,5,105,0,0,24,
        25,5,116,0,0,25,26,5,101,0,0,26,27,5,109,0,0,27,4,1,0,0,0,28,29,
        5,44,0,0,29,6,1,0,0,0,30,31,5,58,0,0,31,8,1,0,0,0,32,36,5,34,0,0,
        33,35,8,0,0,0,34,33,1,0,0,0,35,38,1,0,0,0,36,34,1,0,0,0,36,37,1,
        0,0,0,37,39,1,0,0,0,38,36,1,0,0,0,39,40,5,34,0,0,40,10,1,0,0,0,41,
        43,8,1,0,0,42,41,1,0,0,0,43,44,1,0,0,0,44,42,1,0,0,0,44,45,1,0,0,
        0,45,12,1,0,0,0,46,50,5,35,0,0,47,49,8,2,0,0,48,47,1,0,0,0,49,52,
        1,0,0,0,50,48,1,0,0,0,50,51,1,0,0,0,51,53,1,0,0,0,52,50,1,0,0,0,
        53,54,6,6,0,0,54,14,1,0,0,0,55,57,7,2,0,0,56,55,1,0,0,0,57,58,1,
        0,0,0,58,56,1,0,0,0,58,59,1,0,0,0,59,16,1,0,0,0,60,62,7,3,0,0,61,
        60,1,0,0,0,62,63,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,0,64,65,1,0,0,
        0,65,66,6,8,0,0,66,18,1,0,0,0,6,0,36,44,50,58,63,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!TagSetLexer.__ATN) {
            TagSetLexer.__ATN = new antlr.ATNDeserializer().deserialize(TagSetLexer._serializedATN);
        }

        return TagSetLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(TagSetLexer.literalNames, TagSetLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return TagSetLexer.vocabulary;
    }

    private static readonly decisionsToDFA = TagSetLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}