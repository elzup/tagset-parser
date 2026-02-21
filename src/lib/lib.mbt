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
        let parts = split_collect(rest, " ")
        if parts.length() >= 2 {
          let pattern = parts[0]
          let mut value_str = parts[1]
          let mut j = 2
          while j < parts.length() {
            value_str = value_str + " " + parts[j]
            j = j + 1
          }
          let values : Array[String] = []
          split_collect(value_str, ",").each(fn(v) { values.push(trim(v)) })
          let bitmask = calc_bitmask(pattern, sets)
          items.push({ pattern, bitmask, values })
        }
      }
    }
  }
  let ast : TagSetAST = { sets, items }
  ast.to_json().stringify()
}
