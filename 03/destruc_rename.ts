function calculateArea(p1, p2) {
  return Math.abs((p2.x - p1.x) * (p2.y - p1.y));
}

// { propName: newPropName }
function calculateAreaRe({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  return Math.abs((x2 - x1) * (y2 - y1));
}

function typeofweb(
  { a = 1 } = {},
  { b } = { b: 2 }
) {
  console.log(a, b);
}