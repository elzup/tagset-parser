# tagset-parser

> TagSet DSL parser

## Install

```
$ npm install tagset-parser
```

## Usage

```ts
import { parse } from 'tagset-parser'

const ast = parse(`tagset
set A 赤
set B 青
item A&B x,c`)

console.log(ast.sets)  // [{ id: 'A', label: '赤', index: 0 }, ...]
console.log(ast.items) // [{ pattern: 'A&B', bitmask: 3, values: ['x', 'c'] }]
```

## License

MIT
