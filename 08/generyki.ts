/**
 * Typ<inny typ>
 *
 * typ sparametryzowany względem typów xD
 */
const x: Array<string> = ["a", "b", "c"];

// funkcja zwraca ten sam typ, który przyjmie
const id = (x) => x;
const id = (x: any) => x; // `any` jest do dupy, unknown też
const id = <T>(x: T): T => x; // no i gitara, <T> przed wyrażeniem fn oznacza że tworzona fn jest generykiem

const result = id<number>(1); // T == <number>, przyjmie i zwrówci liczbę

/**
 * Inferencja w generykach
 */
const id = <T>(x: T) => x;
const result = id(1);

/**
 * Generyczne typy
 */
type Ref<T> = {
  current: T;
};
const ref1: Ref<number> = { current: 123 };
const ref2: Ref<string> = { current: "aaa" };

function getValue<T>(ref: Ref<T>): T {
  return ref.current;
}

interface Constructable<T> {
  new (...args: any[]): T;
}

class Queue<T> {
  push(el: T) {
    // ...
  }

  pop(): T {
    // ...
  }
}

const queue = new Queue<number>();
queue.push(1);
queue.push(2);
queue.push(3);
queue.pop(); // 3

// ograniczenie generyka
function doSth<T>(arg: Array<T>) {
  // ...
}

/**
 * extends
 */

// fn generyczna przyjmuje obiekty zawierające przyjmniej name: string
type ObjWithName = { name: string };

function printName<T extends ObjWithName>(arg: T) {
  // ...
}

printName({ name: "Kasia" }); // OK
printName({ name: "Artur", age: 32 }); // OK
printName({ age: 22 }); // error!

/**
 * generyki wielu typów
 */
// przyjmuje dwie wartości i zwraca ich tuplę
function makePair<T, U>(arg1: T, arg2: U): [T, U] {
  return [arg1, arg2];
}

// przyjmuje obiekt i 2. obiekt który rozszerza ten pierwszy
// naiwne ustawianie wartości domyślnych
function defaults<T extends object, U extends T>(obj1: T, obj2: U,) {
  return {...obj1, ...obj2};
}

defaults(1, 2) // #> number nie rozszerza object

defaults({}, {})
defaults({}, { a: 123 })

defaults({ b: 'lala' }, { a: 123 }) // #> 2. obiekt nie ma pola 'b'

defaults({ b: 'lala' }, { b: 'lala', a: 123 })