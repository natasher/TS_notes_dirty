/**
 * interfejs - definiowanie typów, można rozszerzać i implementować w klasach.
 * -------------
 */
interface Callable {
  (): void;
}

interface Entity extends Callable {
  id: string;
}

class User implements Entity {
  // ...
}

/**
 * type - definiowanie typów(skrócone), można rozszerzać i implementować w klasach.
 */
type Callable = {
  (): void;
};

interface Entity extends Callable {
  id: string;
}

class User implements Callable {
  // ...
}

/**
 * Różnice
 * --------
 */

// łączenie deklaracji
interface Xyz {
  a: number;
}

interface Xyz {
  b: string;
}

const res: Xyz = {
  a: 1,
  b: "foo",
};

// aliasy typów (strukturalne)
type UserID = string;
type Product = string;

function getProductPrice(id: ProductID): number {
  // ...
}

const userId: UserID = "bbb";

getProductPrice(userId); // ok ?

/**
 * A | B => suma (unia) A i B to typ który zawiera wartości wspólne dla A i B
 * A & B => część wspólna (intersection) A i B to typ który zawiera wartości
 */
type A = {
  a: string;
  b: number;
};

type B = {
  b: number;
  c: string;
};

type Union = A | B; // b
type Intersection = A & B; // a, b, c

declare const intersection: Intersection;
declare const union: Union;

intersection.a; // ok
intersection.b; // ok
intersection.c; // ok
union.b; // ok
union.a; // error
union.c; // error

interface ObjectConsstructor {
  assign<T, U>(target: T, source: U): T & U;
}

const result = Object.assign(
  { age: 42 },
  { name: "Ania" },
);
result.age; // ok
result.name; // ok

/**
 * Index signature
 * ----------------
 * mapy
 */
type IndexType1 = {
  [key: string]: number;
};

interface IndexType2 {
  [key: string]: number;
}

type Dict<T> = {
  [key: string]: T;
};

const userIdToUser: Dict<User> = {};

/**
 * Literal type
 * -------------
 */
type Bit = 0 | 1;
let bit: Bit;

bit = 0;
bit = 2; // error!

type RequestCredentials =
  | "omit"
  | "same-origin"
  | "include";

let cred: RequestCredentials;

cred = "omit";
cred = "inclade"; // error!

type Headers = "Accept" | "Authorization";

type RequestConfig = {
  [header in Headers]: string;
};

const requestConfig: RequestConfig = {
  Accept: "...",
  Autorization: "...",
};

/**
 * As const
 * ----------
 * TS przypisuje polom typ <string>,
 * bo obiekt jest mutowalny(rozszerzanie - widening).
 * Aby użyć literału, rzutujemy.
 * Popularny zapis doczekał się `as const`.
 */
const request = {
  credentials: "omit",
};

const request_casting = {
  credentials: "omit" as "omit",
};

const request_field_const = {
  credentials: "omit" as const,
};

const request_obj_as_const = {
  credentials: "omit",
} as const;
// typ powyższego to R:
type R = {
  readonly credentials: "omit";
};

// tablice `as const   zamieniane są na tuple tylko do odczytu:
const arr = [1, "h"] as const; // redonly [1, "h"]


/**
 * Type guards
 * ------------
 * `typeof` && `instanceof`
 * typeof string | number | bigint | boolean | symbol | undefined | object | function
 */
function parseInt(arg: string | number) {
  if (typeof arg === "string") {
    // 1: string
  } else {
    // 2: number
  } else {
    // 3: never
  }
}

// instanceof

class Character {
  name!: string;
}

class User extends Character {
  age!: number;
}

class Enemy extends Character {
  hp!: number;
}

declare let ch: Character;

if (ch instanceof User) {
  ch.age; // ok
  ch.name; // ok
} else if (ch instanceof Enemy) {
  ch.hp; // ok
  ch.name; // ok
} else {
  ch.name; //ok
}

/**
 * in
 * ---
 * zawężanie typów poprzez sprawdzenie czy własność o podanej nazwie istnieje
 */
type Character = {
  name: string;
};

type User = {
  name: string;
  age: number;
};

type Admin = {
  name: string;
  age: number;
  role: string;
};

declare let x: Character | User | Admin;

if ("age" in x) {
  x; // #> User | Admin
}
if ("role" in x) {
  x; // #> Admin
}

/**
 * Own type guards (x is Y)
 * ----------------
 * => runtime type check
 * => validator
 */
type SingleValue = { value: string };
type ManyValues = { options: Array<SingleValue> };

function isSingleValue(val: SingleValue | ManyValues): val is SingleValue {
  return (
    "value" in val && typeof val.value === "string"
  );
}

declare const obj: any;

if (isSingleValue( obj )) {
  // obj jest SingleValue
} else {
  // tu nie jest SingleValue
}

function isFutureDate(x: any): x is Date {
  // ...
}

function isUser(x: any): x is User {
  // ...
}

/**
 * Own type guards (asserts x is Y)
 */
function assertIsSingleValue(
  obj: any,
): asserts obj is SingleValue {
  if (! isSingleValue(obj)) {
    throw new Error();
  }
}

declare const d: any;

// d: any
assertIsSingleValue(d);
// d: SingleValue


// asserts cond
function assert(
  cond: any,
  msg?: string,
): asserts cond {
  if (! cond) {
    throw new Error( msg );
  }
}

declare const val: any;

// val: any
assert(isSingleValue(val));
// val: SingleValue


// cond: <dowolne wyrażenie>
declare const maybeVal: number | undefined | null;

// maybeVal: number | undefined | null
assert(maybeVal !== null && maybeVal !== undefined);
// maybeVal: number


/**
 * Pobieranie typu wartości
 * --------------------------
 */

// typeof
// => są 2. operatory:
//   -> JS`owy gdzie oczekiwana jest wartość
//   -> TS`owy gdzie oczekiwany jest typ
const defaultConfig = {
  port: 3000,
  host: 'loclhost',
};

type Config = typeof defaultConfig; // { port: number, host: string }
const Config1 = typeof defaultConfig; // "object"


// typ tablicy i tupli
const arr = [1, "a", 123];
type A = typeof arr; // #> (string | number)[]

const interval = [1, "m"] as const;
type T = typeof interval; // #> readonly [1, "m"]

// wyłącznie typy elementów `arr[number]`
type elementA = typeof arr[number]; // string | number
type elementT = typeof interval[number]; // 1 | "m"

// typy pól z obiektów `obj[keyof obj]`
type obj = {
  a: number;
  b: string;
};

type elementO = obj[keyof obj]; // string | number


/**
 * Overload funkcji literałami
 * ----------------------------
 */
// create factory
function create(name: "User"): User;
function create(name: "Admin"): Admin;
function create(name: "Moderator"): Moderator;
function create(name: string): Character {
  // ...
}

const m = create("Moderator"); // m: Moderator

// OLD DAYS - document.createElement:
interface Document {
  createElement(tagName: "a"): HTMLAnchorElement;
  createElement(tagName: "menu"): HTMLMenuElement;
  createElement(tagName: "input"): HTMLInputElement;
  // ...
  createElement(tagName: string): Element;
}