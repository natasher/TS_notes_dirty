/**
 * Kompatybilność strukturalna
 * ----------------------------
 * dwa obiekty są ze sobą całkowicie kompatybilne,
 * jeśli zawierają te same pola
 */
type MyType = { x: number }
type OtherMyType = { x: number }

const a: MyType = { x: 123 }
const b: OtherMyType = a

/**
 * Klasy z polami publicznymi
 * ---------------------------
 * Klasa zawierająca wyłącznie pola publiczne jest kompatybilna
 * z obiektem z tymi samymi polami.
 * Podczas sprawdzania kompatybilności instancji klasy z innym typem,
 * ignorowany jest typ statyczny klasy (static pola, static funkcje i konstruktor).
 */
class Player {
  name!: string;
}

type P = {
  name: string;
}

const instance = new Player();
const pType: P = instance;

const notAnInstance: Player = { name: "Michał" }

// ignore static
class Player {
  static a = 1;
  constructor(name: string) {}
}

class Hero {
  static b = "a"
  constructor(args: Array<number>) {}
}

const p: Player = new Hero([1, 2, 3])
const h: Hero = new Player("aaa")

/**
 * Klasy z polami prywatnymi (protected)
 * -----------------------------------------
 * prywatne pola bezpośrednio w klasach nie są kompatybilne.
 * jeśli dziedziczą od rodzica - ok
 */
class Player {
  private name!: string;
}

class Hero {
  private name!: string;
}

const p: Player = new Hero(); // #> error!
const h: Hero = new Player(); // #> error!

// inheritance
class Entity {
  private name!: string;
}

class Player extends Entity {}

class Hero extends Entity {}

const p: Player = new Hero()
const h: Hero = new Player()

/**
 * Kompatybilność podtypów (jest kontrawariantne)
 * ------------------------
 * poprawne przypisanie jest gdy przypisywana zmienna po prawej
 * ma co najmniej te pola, co zmienna po lewej.
 */
type Character = {
  name: string;
};

type User = {
  name: string;
  age: number;
};

let character: Character = { name: "Michał" };
let user: User = { name: "Jan", age: 23 };

character = user; // #> OK!
user = character; // #> error!

function processCharacter(character: Character) {}
function processUser(user: User) {}

processCharacter(character); // #> ok
processCharacter(user); // #> ok

processUser(character); // #> error!
processUser(user); // #> ok

/**
 * Przypisywanie literałów obiektów (inwariancja)
 * ---------------------------------
 * Co działa przy przypisywaniu zmiennych,
 * nie działa przy przekazywaniu literału obiektu.
 * TS zakłada, że w tym momencie checmy użyć tylko i wyłącznie
 * znanych własości opisanych typem <Character>.
 */
const u: User = { name: "Jan", age: 23 };

const c1: Character = u; // #> ok
const c2: Character = { name: "Jan", age: 23 }; // #> error!

/**
 * Funkcje wariadyczne (Kontrawariancja)
 * --------------------
 */

// JS
function add(a, b) {
  return a + b;
}

add(1, 2, 3) // Poprawne wywołanie w JS. 3. arg będzie osrany.

// TS
function add(a: number, b: number) {
  return a + b;
}

add(1, 2, 3) // #> error!

// Do zmiennej zawierającej funkcję, która przyjmuje aż dwa parametry
// możemy przypisać zmienną zawierającą funkcję jednego parametru

let fn1 = (a: number) => a;
let fn2 = (a: number, b: number) => a + b;

fn2 = fn1; // #> ok
fn1 = fn2; // #> error!

/**
 * Kompatybilność fn args (Kowariancja)
 * -----------------------
 */
type Character = {
  name: string;
};

type User = {
  name: string;
  age: number;
};

let processCharacter = function (char: Character) {
  console.log(char.name);
};

let processUser = function (user: User) {
  console.log(user.age, user.name);
};

processCharacter = processUser; // #> error!
processUser = processCharacter; // #> ok

/**
 * Kompatybilność metood w obiektach
 * ---------------------------------
 */

// jako metoda: (Inwariancja?)
let characterProcessor = {
  process(character: Character) {},
};
let userProcessor = {
  process(user: User) {},
};

characterProcessor = userProcessor; // ok
userProcessor = characterProcessor; // ok

// ALE ALE, jako pole: (Kowariancja)
let characterProcessor = {
  process: function(character: Character) {},
};
let userProcessor = {
  process: function(user: User) {},
};

characterProcessor = userProcessor; // #> error!
userProcessor = characterProcessor; // ok

/**
 * Kompatybilność typu zwracanego przez fn (Kowariancja)
 * ----------------------------------------
 */
let makeCharacter = (): Character => {
  return { name: "Michał" };
};
let makeUser = (): User => {
  return { name: "Michał", age: 21 };
};

makeCharacter = makeUser; // ok
makeUser = makeCharacter; // #> error!

/**
 * Argumenty opcjonalne i rest (Kowariancja)
 * --------------------------------
 */
type Fopt = (a: number, b?: string) => void;
type Freq = (a: number, b: string) => void;

let fopt: Fopt = (a, b) => {};
let freq: Freq = (a, b) => {};

fopt = freq; // #> error!
freq = fopt; // ok

// biwariancja

type Fone = (a: number) => void;
type Fextra = (a: number, b?: string) => void;

let fone: Fone = (a) => {};
let fextra: Fextra = (a, b) => {}

fone = fextra; // ok
fextra = fone; // ok

// rest (...) - ok, ale duże ryzyko błędu
