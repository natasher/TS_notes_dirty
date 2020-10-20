/**
 * Symbol() zwraca wartość o typie <symbol>
 * zachowuje się jak prymityw, ale jest niemutowalna i unikalna
 */

let x = Symbol("a");
let y = Symbol("a");

x === y // #> false
x = y // #> ok
y = x // #> ok

const x1 = Symbol.for("a");
const y2 = Symbol.for("a");
x1 === y2; // #> error!