"use strict";
function test() {
    return 1 + 2;
}
function add(a, b) {
    return a + b;
}
add(1, 2);
add(1, "2");
add("1", "2");
add();
add([], {});
add(null, undefined);
