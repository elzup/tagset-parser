grammar TagSet;

// Parser Rules

program
    : (NL | line)* EOF
    ;

line
    : (headerDecl | setDecl | itemDecl | sugarDecl) NL?
    ;

headerDecl
    : TAGSET
    ;

setDecl
    : SET WORD labelPart+
    ;

labelPart
    : WORD
    | QUOTED_STRING
    ;

itemDecl
    : ITEM pattern valueList
    ;

sugarDecl
    : WORD (COMMA WORD)* COLON valueList
    ;

pattern
    : WORD (AMP WORD)*
    ;

valueList
    : valueItem (COMMA valueItem)*
    ;

valueItem
    : (WORD | QUOTED_STRING)+
    ;

// Lexer Rules

TAGSET          : 'tagset' ;
SET             : 'set' ;
ITEM            : 'item' ;

AMP             : '&' ;
COMMA           : ',' ;
COLON           : ':' ;

QUOTED_STRING   : '"' ~["\r\n]* '"' ;
WORD            : ~[ \t\r\n,:&"]+ ;

NL              : [\r\n]+ ;
WS              : [ \t]+ -> skip ;
