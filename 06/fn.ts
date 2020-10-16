/**
 * args
 */
function add(x: number, y: number) {
  return x + y;
}

/**
 * return
 */
function add(x: number, y: number): number {
  return x + y;
}
function doNothing(): void {}

/**
 * Fn expression
 */
const fn1 = function () {}; // fn anonimowa
const fn2 = function mojaFunkcja() {}; // fn mojaFunkcja
const fn3 = () => {}; // fn arrow

/**
 * typ fn
 * -------
 * nazwy arg w typie i nazwy w implementacji mogą się różnić.
 * typy mają się zgadzać.
 */
type MyFunction = (x: number, y: number) => number;

const fn4: (x: number, y: number) => number = (a: number, b: number) => {
  return a + b;
}

/**
 * inferencja typu arg
 */
type Cb = (name: string, age: nubmer) => boolean;

const fn: Cb = (name, age) => {
  return name.length > 1 && age > 18;
}

/**
 * parametry opcjonalne - zawsze na końcu
 */
function getFullName(firstName: string, middleName?: string) {}
function x(a: number, b?: string, c: string) {} // #> error!

/**
 * parametry domyślne
 */
function addNumbers(a = 1, b = 2) {
  // inside:
  a; // number
  b; //number
}

type R = (a?: number, b?: number) => void;
const outside: R = addNumbers();

/**
 * Funkcje wariadyczne
 * --------------------
 * Zmienna, nie określona liczba parametrów.
 */
function log(...messages) {}
function log(...messages: string[]) {}

type Logger = (...m: string[]) => void;

function x(a: string, b: number, ...c: string[]) {}

/**
 * Overloading
 */
// JS
const DEFAULT_CONFIG = {
  in: "./in.txt",
  out: "out.txt",
};

function getConfig(overrides) {
  if (typeof overrides === "object") {
    return { ...DEFAULT_CONFIG, ...overrides };
  } else if (typeof overrides === "string") {
    return { ...DEFAULT_CONFIG, enc: config };
  } else if (typeof overrides === "undefined") {
    return DEFAULT_CONFIG;
  } else {
    throw new Error("Invalid config provided!");
  }
}

// TS
type Config = {
  in: string;
  out: string;
  enc?: string;
};

function getConfig(overrides: { enc: string; }): Config;
function getConfig(overrides: string): Config;
function getConfig(overrides: undefined): Config;
function getConfig(overrides: any): Config {
  if (typeof overrides === "object") {
    return { ...DEFAULT_CONFIG, ...overrides };
  } else if (typeof overrides === "string") {
    return { ...DEFAULT_CONFIG, enc: config };
  } else if (typeof overrides === "undefined") {
    return DEFAULT_CONFIG;
  } else {
    throw new Error("Invalid config provided!");
  }
}
// lub
type Arg = { env: string } | string | undefined;

function getConfig(config: Arg): Config {
  // ...
}

/**
 * Overloading with diff returns
 */
function fn(): Promise<Data>;
function fn(cb: Callback): void;
function fn(cb?: any): any {
  if (cb) {
    cb();
    return;
  } else {
    return Promise.resolve({});
  }
}

const a = fn(); // #> Promise<Data>
const b = fn(() => {}); // #> void

/**
 * Overloading logic
 * od najbardziej konkretnych typów do najbardziej ogólnych
 */
function fn42(x: { enc: string }): string {}
function fn42(x: object): number {}
function fn42(x: any): any {}

/**
 * Overloading from TS docs:
 */
let suits = ["heart", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number}[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log(`card: ${pickedCard1.card} of ${pickedCard1.suit}`);

let pickedCard2 = pickCard(15);
console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}`);

/**
 * this - motherfucker
 *
 * TS traktuje `this` jako specjalny arg, musi być na 1. miejscu listy args
 */
function fnWithThis(this: { enc: string }, options: object,) {}

type FnWithoutThis = (this: never) => void;