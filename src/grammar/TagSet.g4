grammar TagSet;

// Parser Rules

program
    : (NL | line)* EOF
    ;

line
    : (setDecl | itemDecl | sugarDecl) NL?
    ;

setDecl
    : SET WORD labelPart+
    ;

labelPart
    : WORD
    | QUOTED_STRING
    ;

itemDecl
    : ITEM WORD valueList
    ;

sugarDecl
    : WORD (COMMA WORD)* COLON valueList
    ;

valueList
    : valueItem (COMMA valueItem)*
    ;

valueItem
    : (WORD | QUOTED_STRING)+
    ;

// Lexer Rules

SET             : 'set' ;
ITEM            : 'item' ;

COMMA           : ',' ;
COLON           : ':' ;

QUOTED_STRING   : '"' ~["\r\n]* '"' ;
WORD            : ~[ \t\r\n,:"]+ ;

COMMENT         : '#' ~[\r\n]* -> skip ;
NL              : [\r\n]+ ;
WS              : [ \t]+ -> skip ;
