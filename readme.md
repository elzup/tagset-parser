# tagset-parser

> TagSet DSL parser

## Install

```
$ npm install tagset-parser
```

## DSL Examples

### Basic

```
set A 赤
set B 青

item A  apple, red
item B  sky, ocean
# colon syntax (both syntaxes can be mixed freely)
A, B: purple, violet
A, B, _: purple, violet
```

### Auto-Detect Sets

`set` declarations are optional. Sets are auto-detected from patterns.

```
A: apple
B: sky
A, B: purple
```

Explicit and auto-detected sets can coexist — `set A Red` gives A a label, while B is auto-detected as `{ id: 'B', label: 'B' }`.

### Placeholder `_`

`_` is ignored in patterns, useful for alignment.

```
A, _, C: a-and-c
_, B, _: only-b
```

### Quoted Strings

```
item A "hello world", "foo bar"
```

## Bitmask

Each item gets a `bitmask` based on which sets appear in its pattern. Set index determines the bit position.

```
set A 赤    → index 0 → bit 1
set B 青    → index 1 → bit 2
set C 緑    → index 2 → bit 4

A:       → bitmask: 1  (0b001)
B:       → bitmask: 2  (0b010)
A, C:    → bitmask: 5  (0b101)
A, B, C: → bitmask: 7  (0b111)
```

## Usage

```ts
import { parse } from 'tagset-parser'

const ast = parse(`
set A 赤
set B 青
A, B: x, y
A: solo
`)

ast.sets
// [{ id: 'A', label: '赤', index: 0 }, { id: 'B', label: '青', index: 1 }]

ast.items
// [
//   { pattern: 'A,B', bitmask: 3, values: ['x', 'y'] },
//   { pattern: 'A',   bitmask: 1, values: ['solo'] },
// ]
```

## License

MIT
