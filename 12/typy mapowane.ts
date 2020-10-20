type Player = {
  name: string;
  hp: number;
  position: [number, number];
};

function postPlayer(data: Player) {
  // ...
}

/**
 * keyof - pobiera póla z typu i zwraca unię literałów
 */
type PlayerKeys = keyof Player;
// type PlayerKeys = "name" | "hp" | "position";


/**
 * in keyof - tworzenie nowego typu obiektu na podstawie już istniejącego
 *            z wszystkimi modifikatorami
 */
// dokładna kopia typu Player
type Player2 = {
  [K in keyof Player]: Player[K];
};
/**
 * [K in keyof Player] --> dla każdego pola w typie Player (połączenie sygnatury indeksu i keyof)
 * Player[K] --> weź typ pola K z Player (indexed access type)
 */


/**
 * Modyfikatory
 * ------------
 */
// ? --> Wszystkie pola będą opcjonalne
type PlayerUpdate = {
  [K in keyof Player]?: Player[K];
};

// readonly --> wszystkie pola tylko do odczytu
type ReadonlyPlayer = {
  readonly [K in keyof Player]: Player[K];
};

// + i -
// -? --> z opcjonalnych pól robimy wymagane
// -readonly --> read/write
type X = {
  readonly a?: string;
  readonly b?: number;
};

type Y = {
  -readonly [K in keyof X]-?: X[K];
};
// type Y = {
//   a: string;
//   b: number;
// };

/**
 * Mapowane typy generyczne
 * -------------------------
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  +readonly [P in keyof T]: T[P];
};

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Record<K, T>
 * -------------
 * keyof any --> string | number | symbol
 */
type Record<K extends keyof any, T> {
  [P in K]: T;
};

// X i Y są równoważne
type X = Record<"a" | "b", number>;
type Y = {
  a: number;
  b: number;
};
type Z = Record<string, number>; // słownik: pola <string>, wartość <number>

/**
 * document.createElement
 * overloading sprytnie
 */

// OLD DAYS - document.createElement:
interface Document {
  createElement(tagName: "a"): HTMLAnchorElement;
  createElement(tagName: "menu"): HTMLMenuElement;
  createElement(tagName: "input"): HTMLInputElement;
  // ...
  createElement(tagName: string): Element;
}

// NOWADAY
// mapa:
interface TagToElement {
  a: HTMLAnchorElement;
  menu: HTMLMenuElement;
  input: HTMLInputElement;
  // ...
}

// mapujemy typ na funkcje:
interface Document {
  createElement<K extends keyof TagToElement>(
    tagName: K,
  ): TagToElement[K];
}

declare const document: Document;

const a = document.createElement("a");
const menu = document.createElement("menu");
const input = document.createElement("input");