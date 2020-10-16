/**
 * Prymitywy:
 * ----------------
 * - boolean
 * - number
 * - string
 * - symbol
 * - bigint
 * - null
 * - undefined
 *
 * Złożone:
 * ---------
 * - object
 * - Array
 *
 * TS abstract:
 * -------------
 * - tuple
 * - enum
 * - void
 * - any
 * - Object
 * - never
 * - unknown
 */

// boolean
const isThisBookOkay: boolean = true;

// number
const result: number = 123 + 0xbeef + 0b1111 + 0x700;

// string
const firstName: string = "Michał";
const lastName: string = "Miszczyszyn";
const hello: string = `Hello,
${firstName} ${lastName}!`;

// symbol
// unique symbol - dodaje nominalność typów i unikalność

// bigint (stage 4)
// nie wolno mieszać bigint z number, silnie typowane
const notSoLargee: bigint = 1n;
const soHuge: bigint = BigInt(
  "123123123123123123123123123123",
);

// null i undefined
let x: number | undefined;
x = 123;
x = undefined;

// object
// wszystko co nie jest prymitywem

// Array
// porównywalne przez ref nie wartość
[] === [] // #> false
// jest generykiem
Array<T>

const numbers: Array<number> = [1, 2, 3];
const letters: string[] = ["a", "b", "c"];


// tuple
// skończona lista elementów i typy na konkretnych pozycjach
const interval1: [number, string] = [1, "day"];
const interval2: [number, string] = []; // #> error!
const interval3: [number, string] = [3, "months"];

const num = interval3[0]; // #> number
const unit = interval3[1]; // #> string
const somethingElse = interval3[2] // #> error!
interval3[0] = "day"; // #> error!

const interval4: [value: number, unit: string] = [3, "months"];

// enum
// zbiór nazwanych wartości (od 0 - ...)
enum Suit {
  Spades,
  Hearts,
  Diamonds,
  Clubs,
}

const cards: Suit = Suit.Spades; // #> 0

// wartości <string>
enum UserRole {
  Admin = "admin",
  Manager = "manager",
  User = "user",
}

const role: UserRole = UserRole.Admin; // #> "admin"

// void
// brak wartosci, fn które nic nie zwracają
function fn1(): void {}
function fn1(): void { return; }
function fn2(): void { return undefined; }

// any
// dowolna wartość - ostateczność

// <Object>
// własności i metody wspólne dla wszystkich obiektów w JS.
// Przydatny do dziedziczenia

// never
function fn1(): never {
  throw new Error("Ta function nigdy nie zwraca!");
}

function fn2(): never {
  for(;;) {} // #> wiesza się to nigdy nic nie zwraca ;)
}

function assertUnreachable(x: never): never {
  throw new Error();
}

function getValue( name: string ): number {

  switch (name) {
    case "low":
      return 0;
    case "medium":
      return 1;
    case "high":
      return 2;
  }

  assertUnreachable(name);
}

type Name = "low" | "medium" | "high";
function getValue(name: Name): number {
  /* ... */
}

// unknown
// bezpieczniejsze niż `any`.
// przypisać można wszystko,
// odczytać nic
let x: unknown;
x = 123;
x = "asv";
x = {};

x.foo; // #> error!
let a: number = x; // #> error!