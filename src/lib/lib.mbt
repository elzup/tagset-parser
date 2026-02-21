struct SetDecl {
  id : String
  label : String
  index : Int
} derive(ToJson)

struct ItemDecl {
  pattern : String
  bitmask : Int
  values : Array[String]
} derive(ToJson)

struct TagSetAST {
  sets : Array[SetDecl]
  items : Array[ItemDecl]
} derive(ToJson)

fn trim(s : String) -> String {
  let len = s.length()
  if len == 0 {
    return ""
  }
  let mut start = 0
  while start < len {
    let c = s[start]
    if c == ' ' || c == '\t' || c == '\r' {
      start = start + 1
    } else {
      break
    }
  }
  let mut end = len - 1
  while end >= start {
    let c = s[end]
    if c == ' ' || c == '\t' || c == '\r' {
      end = end - 1
    } else {
      break
    }
  }
  if start > end {
    return ""
  }
  slice(s, start, end + 1)
}

fn slice(s : String, start : Int, end : Int) -> String {
  let chars : Array[Char] = []
  for i = start; i < end; i = i + 1 {
    chars.push(s[i].to_int().unsafe_to_char())
  }
  String::from_array(chars)
}

fn has_prefix(s : String, prefix : String) -> Bool {
  if prefix.length() > s.length() {
    return false
  }
  for i = 0; i < prefix.length(); i = i + 1 {
    if s[i] != prefix[i] {
      return false
    }
  }
  true
}

fn split_collect(s : String, sep : String) -> Array[String] {
  let result : Array[String] = []
  s.split(sep).each(fn(v) { result.push(v.to_string()) })
  result
}

fn contains_ampersand(s : String) -> Bool {
  let amp : UInt16 = '&'.to_int().to_uint16()
  for i = 0; i < s.length(); i = i + 1 {
    if s[i] == amp {
      return true
    }
  }
  false
}

fn is_set_id(token : String, sets : Array[SetDecl]) -> Bool {
  for set in sets {
    if set.id == token {
      return true
    }
  }
  false
}

fn is_pattern_token(token : String, sets : Array[SetDecl]) -> Bool {
  if token == "&" || token == "_" {
    return true
  }
  if contains_ampersand(token) {
    return true
  }
  is_set_id(token, sets)
}

fn join_strings(arr : Array[String], sep : String) -> String {
  let mut result = ""
  for i = 0; i < arr.length(); i = i + 1 {
    if i > 0 {
      result = result + sep
    }
    result = result + arr[i]
  }
  result
}

fn calc_bitmask(pattern : String, sets : Array[SetDecl]) -> Int {
  let tokens = split_collect(pattern, "&")
  let mut mask = 0
  for token in tokens {
    let t = trim(token)
    if t != "" && t != "_" {
      for set in sets {
        if set.id == t {
          mask = mask | (1 << set.index)
        }
      }
    }
  }
  mask
}

fn parse_item_tokens(
  all_tokens : Array[String],
  sets : Array[SetDecl]
) -> (String, Array[String]) {
  // Separate tokens into pattern parts and value parts
  let tokens : Array[String] = []
  for tok in all_tokens {
    if tok != "" {
      tokens.push(tok)
    }
  }
  // Find first non-pattern token
  let mut split_idx = tokens.length()
  for i = 0; i < tokens.length(); i = i + 1 {
    if not(is_pattern_token(tokens[i], sets)) {
      split_idx = i
      break
    }
  }
  // Extract set IDs from pattern tokens
  let set_ids : Array[String] = []
  for i = 0; i < split_idx; i = i + 1 {
    let tok = tokens[i]
    if tok == "&" || tok == "_" {
      // skip operators/placeholders
      continue
    }
    if contains_ampersand(tok) {
      // Split sub-tokens like "&C" or "A&C"
      split_collect(tok, "&").each(fn(t) {
        let trimmed = trim(t)
        if trimmed != "" && trimmed != "_" {
          set_ids.push(trimmed)
        }
      })
    } else {
      set_ids.push(tok)
    }
  }
  let pattern = join_strings(set_ids, "&")
  // Collect value tokens
  let value_parts : Array[String] = []
  for i = split_idx; i < tokens.length(); i = i + 1 {
    value_parts.push(tokens[i])
  }
  let value_str = join_strings(value_parts, " ")
  let values : Array[String] = []
  split_collect(value_str, ",").each(fn(v) { values.push(trim(v)) })
  (pattern, values)
}

pub fn parse(input : String) -> String {
  let sets : Array[SetDecl] = []
  let items : Array[ItemDecl] = []
  let lines = split_collect(input, "\n")
  let mut set_index = 0
  for line_raw in lines {
    let line = trim(line_raw)
    if line != "" && line != "tagset" {
      if has_prefix(line, "set ") {
        let rest = trim(slice(line, 4, line.length()))
        let parts = split_collect(rest, " ")
        if parts.length() >= 2 {
          let id = parts[0]
          let mut label = parts[1]
          let mut j = 2
          while j < parts.length() {
            label = label + " " + parts[j]
            j = j + 1
          }
          sets.push({ id, label, index: set_index })
          set_index = set_index + 1
        }
      } else if has_prefix(line, "item ") {
        let rest = trim(slice(line, 5, line.length()))
        let all_tokens = split_collect(rest, " ")
        let (pattern, values) = parse_item_tokens(all_tokens, sets)
        if pattern != "" {
          let bitmask = calc_bitmask(pattern, sets)
          items.push({ pattern, bitmask, values })
        }
      }
    }
  }
  let ast : TagSetAST = { sets, items }
  ast.to_json().stringify()
}

test "basic parse" {
  let result = parse("tagset\nset A 赤\nset B 青\nitem A&B x,c")
  inspect(
    result,
    content="{\"sets\":[{\"id\":\"A\",\"label\":\"赤\",\"index\":0},{\"id\":\"B\",\"label\":\"青\",\"index\":1}],\"items\":[{\"pattern\":\"A&B\",\"bitmask\":3,\"values\":[\"x\",\"c\"]}]}",
  )
}

test "single set bitmask" {
  let result = parse("tagset\nset A 赤\nset B 青\nitem A p\nitem B q")
  inspect(
    result,
    content="{\"sets\":[{\"id\":\"A\",\"label\":\"赤\",\"index\":0},{\"id\":\"B\",\"label\":\"青\",\"index\":1}],\"items\":[{\"pattern\":\"A\",\"bitmask\":1,\"values\":[\"p\"]},{\"pattern\":\"B\",\"bitmask\":2,\"values\":[\"q\"]}]}",
  )
}

test "placeholder _ in pattern" {
  let result = parse("tagset\nset A 赤\nset B 青\nset C 緑\nitem A&_&C ac")
  inspect(
    result,
    content="{\"sets\":[{\"id\":\"A\",\"label\":\"赤\",\"index\":0},{\"id\":\"B\",\"label\":\"青\",\"index\":1},{\"id\":\"C\",\"label\":\"緑\",\"index\":2}],\"items\":[{\"pattern\":\"A&C\",\"bitmask\":5,\"values\":[\"ac\"]}]}",
  )
}

test "padding syntax with spaces" {
  let result = parse("tagset\nset A 赤\nset B 青\nset C 緑\nitem A  &C val")
  inspect(
    result,
    content="{\"sets\":[{\"id\":\"A\",\"label\":\"赤\",\"index\":0},{\"id\":\"B\",\"label\":\"青\",\"index\":1},{\"id\":\"C\",\"label\":\"緑\",\"index\":2}],\"items\":[{\"pattern\":\"A&C\",\"bitmask\":5,\"values\":[\"val\"]}]}",
  )
}

test "empty tagset" {
  let result = parse("tagset")
  inspect(result, content="{\"sets\":[],\"items\":[]}")
}
