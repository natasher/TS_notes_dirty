function test() {
  return 1 + 2;
}

function add(a: number, b: number) {
  return a + b;
}

add(1, 2)
add(1, "2")
add("1", "2")
add()
add([], {})
add(null, undefined)