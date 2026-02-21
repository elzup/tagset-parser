以下は **tagset-parser 実装仕様書 v0.1** です。
（最小実装 → 拡張可能な構造）

---

# 1. 目的

TagSet DSL を解析し、**AST（抽象構文木）**へ変換する。

対応範囲：

- set 宣言
- item 宣言
- `_` を含むパターン
- 複数値（`,`区切り）

---

# 2. DSL仕様（最小）

```
tagset
  set A 赤
  set B 青

  item A      a
  item B      b
  item A_B    x,c
  item A__    p
  item __B    q
```

---

# 3. 文法定義（EBNF）

```
Document      ::= Header NL { Statement NL }

Header        ::= "tagset"

Statement     ::= SetDecl | ItemDecl

SetDecl       ::= "set" WS Identifier WS Label

ItemDecl      ::= "item" WS Pattern WS ValueList

Pattern       ::= PatternChar { PatternChar }

PatternChar   ::= Identifier | "_"

ValueList     ::= Value { "," Value }

Identifier    ::= Letter { Letter | Digit }

Label         ::= NonNewlineText

Value         ::= NonCommaText
```

---

# 4. 構文ルール

## 4.1 set

```
set <ID> <label>
```

- IDは一意
- 宣言順がビット順

---

## 4.2 item

```
item <pattern> <value-list>
```

### Pattern 解釈

例（set A,B,C の順）：

| Pattern | 意味  | Bit |
| ------- | ----- | --- |
| A\_\_   | Aのみ | 100 |
| _B_     | Bのみ | 010 |
| A_C     | A,C   | 101 |
| \_\_\_  | なし  | 000 |

内部では：

```
bitmask = Σ(2^index)
```

---

# 5. AST仕様

```ts
interface TagSetAST {
  sets: SetDecl[]
  items: ItemDecl[]
}

interface SetDecl {
  id: string
  label: string
  index: number
}

interface ItemDecl {
  pattern: string
  bitmask: number
  values: string[]
}
```

---

# 6. パース手順

## Step 1: 前処理

- 行単位分割
- コメント除去（将来拡張）
- 空行除去

---

## Step 2: set収集

- set行を順に処理
- index を付与
- IDの重複検出

---

## Step 3: item処理

- pattern解析
- bitmask生成
- value配列化

---

# 7. エラー仕様

## 必須チェック

- Headerが存在
- set未定義ID使用
- pattern長さ不整合（厳密モード）
- ID重複

## 例

```
Error: Undefined set "C"
Error: Duplicate set "A"
```

---

# 8. API仕様

```ts
parse(input: string, options?: ParseOptions): TagSetAST
```

### Options

```ts
interface ParseOptions {
  strict?: boolean // pattern長一致必須
  allowUnknownSet?: boolean
}
```

---

# 9. 出力例

入力：

```
tagset
  set A 赤
  set B 青
  item A_B x,c
```

出力：

```json
{
  "sets": [
    { "id": "A", "label": "赤", "index": 0 },
    { "id": "B", "label": "青", "index": 1 }
  ],
  "items": [
    {
      "pattern": "A_B",
      "bitmask": 3,
      "values": ["x", "c"]
    }
  ]
}
```

---

# 10. 将来拡張ポイント

- count 指定
- 属性（colorなど）
- include/exclude構文
- JSON互換モード
- UpSet最適化用集計モード

---

# 11. 推奨実装技術

小規模なら：

- 手書きパーサ（split + regex）

拡張予定なら：

- PEG.js
- nearley
- chevrotain

---

# 12. 最小実装規模

- 約150–250行程度で可能
- 状態管理は不要
- 1パス処理可能

---

必要なら次は：

- TypeScript実装雛形
- Rust実装雛形
- テストケース設計
- Mermaid出力アダプタ設計

どこまで進めますか？
