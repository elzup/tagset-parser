# tagset-parser

> TagSet DSL parser

## Install

```
$ npm install tagset-parser
```

## Usage

```ts
import { parse } from 'tagset-parser'

// Classic syntax
const ast = parse(`tagset
set A 赤
set B 青
item A&B x,c`)

// Sugar syntax (colon)
const ast2 = parse(`A, B: x, y`)

// Auto-detect sets (no set declarations needed)
const ast3 = parse(`item A&B x`)
// ast3.sets → [{ id: 'A', label: 'A', index: 0 }, { id: 'B', label: 'B', index: 1 }]
```

## Syntax

```
set <id> <label>        # Declare a set (optional)
item <pattern> <values> # Declare an item with & pattern
<ids>: <values>         # Sugar syntax (comma-separated IDs)
```

- `set` declarations are optional; sets are auto-detected from patterns
- Patterns use `&` between set IDs: `A&B`, `A&_&C`
- `_` is a placeholder (ignored in bitmask)
- Values are comma-separated: `x,y` or `x, y`

## License

MIT
