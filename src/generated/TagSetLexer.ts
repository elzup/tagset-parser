
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class TagSetLexer extends antlr.Lexer {
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

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, "'tagset'", "'set'", "'item'", "'&'", "','", "':'"
    ];

    public static readonly symbolicNames = [
        null, "TAGSET", "SET", "ITEM", "AMP", "COMMA", "COLON", "QUOTED_STRING", 
        "WORD", "NL", "WS"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "TAGSET", "SET", "ITEM", "AMP", "COMMA", "COLON", "QUOTED_STRING", 
        "WORD", "NL", "WS",
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
        4,0,10,69,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,
        6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,
        1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,5,
        6,46,8,6,10,6,12,6,49,9,6,1,6,1,6,1,7,4,7,54,8,7,11,7,12,7,55,1,
        8,4,8,59,8,8,11,8,12,8,60,1,9,4,9,64,8,9,11,9,12,9,65,1,9,1,9,0,
        0,10,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,1,0,4,3,0,10,
        10,13,13,34,34,7,0,9,10,13,13,32,32,34,34,38,38,44,44,58,58,2,0,
        10,10,13,13,2,0,9,9,32,32,72,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,
        0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,
        17,1,0,0,0,0,19,1,0,0,0,1,21,1,0,0,0,3,28,1,0,0,0,5,32,1,0,0,0,7,
        37,1,0,0,0,9,39,1,0,0,0,11,41,1,0,0,0,13,43,1,0,0,0,15,53,1,0,0,
        0,17,58,1,0,0,0,19,63,1,0,0,0,21,22,5,116,0,0,22,23,5,97,0,0,23,
        24,5,103,0,0,24,25,5,115,0,0,25,26,5,101,0,0,26,27,5,116,0,0,27,
        2,1,0,0,0,28,29,5,115,0,0,29,30,5,101,0,0,30,31,5,116,0,0,31,4,1,
        0,0,0,32,33,5,105,0,0,33,34,5,116,0,0,34,35,5,101,0,0,35,36,5,109,
        0,0,36,6,1,0,0,0,37,38,5,38,0,0,38,8,1,0,0,0,39,40,5,44,0,0,40,10,
        1,0,0,0,41,42,5,58,0,0,42,12,1,0,0,0,43,47,5,34,0,0,44,46,8,0,0,
        0,45,44,1,0,0,0,46,49,1,0,0,0,47,45,1,0,0,0,47,48,1,0,0,0,48,50,
        1,0,0,0,49,47,1,0,0,0,50,51,5,34,0,0,51,14,1,0,0,0,52,54,8,1,0,0,
        53,52,1,0,0,0,54,55,1,0,0,0,55,53,1,0,0,0,55,56,1,0,0,0,56,16,1,
        0,0,0,57,59,7,2,0,0,58,57,1,0,0,0,59,60,1,0,0,0,60,58,1,0,0,0,60,
        61,1,0,0,0,61,18,1,0,0,0,62,64,7,3,0,0,63,62,1,0,0,0,64,65,1,0,0,
        0,65,63,1,0,0,0,65,66,1,0,0,0,66,67,1,0,0,0,67,68,6,9,0,0,68,20,
        1,0,0,0,5,0,47,55,60,65,1,6,0,0
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