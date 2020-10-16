/**
 * Klasa tworzy konstruktor i nowy typ (opisuje instancje, nie klasę).
 */
class User {
  // pole
  name: string;

  // metoda
  sayHello() {
    console.log(`My name is ${this.name}!`)
  }
}

const x = new User();
const x: User = new User();

/**
 * konstruktor
 */
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
// syntactic sugar:
class User {
  constructor(public name: string) {}
}

const user = new User("Michał");
console.log(user.name); // #> 'Michał'

/**
 * pola bez inicjalizacji
 */
class User {
  name?: string;
}
/**
 * pole bez inicjalizacji, obowiązkowe
 * ryzykowne posunięcie, kompilator musi zaufać,
 * że ustawimy jakąś wartość w tym polu.
 */
class User {
  name!: string;
}


/**
 * Dziedziczenie
 */
class Vehicle {
  constructor(public numberOfWheels: number) {}
}

class Car extends Vehicle {
  ride() {
    console.log(
      `I have ${this.numberOfWheels} wheels!`,
    );
  }
}

const c = new Car(4);
c.ride();

// super - jeśli superklasa ma konstruktor
// i subklasa ma konstruktor
// użyj super ;)
class A {
  a = "test A";
}

class B extends A {}

class C extends A {
  constructor() {}
}

class D extends A {
  constructor() {
    super();
  }
}

/**
 * public
 */
class A {
  public x: string;
}
// domyślnie jest public
class A {
  x: string;
}

/**
 * private - brak dostępu z zewnątrz,
 * korzystać można tylko wewnątrz tej klasy.
 * Klasy dziedziczące nie mają do niej dostępu.
 */
class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    console.log(`Jestem ${this.name}!`);
  }
}

const user = new User("Artur");
user.sayHello(); // #> Jestem Artur!
user.name; // #> error!

/**
 * protected - pole prywatne również dla klas dziedziczących
 */
class User {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Admin extends User {
  sayHello() {
    console.log(this.name);
  }
}

/**
 * readonly - przypisanie niemożliwe poza konstruktorem
 */
class Component {
  private readonly state = { userId: 123 };

  updateState() {
    this.state = {}; // #> error!
  }
}

/**
 * Własności w parametrach konstuktora
 */
class User {
  constructor(public readonly name: string) {}
}

/**
 * Klasa abstrakcyjna - nie da się instancjonować
 * służą tylko do dziedziczenia.
 * tylko typy.
 */
abstract class Message {
  constructor(private text: string) {}

  abstract send(): void;

  log() {
    console.log(this.text);
  }
}


/**
 * Interfejs - nazywa i definiuje typ bez żadnej implementacji (strukturalne)
 */
interface Invoice {
  amount: number;
  submittedAt: Date;
}

const invoice: Invoice = {
  amount: 123,
  submittedAt: new Date(),
};

/**
 * kompatybilnośc typów
 */
function getInvoiceSummary(invoice: Invoice) {
  return (
    `Twoja faktura na kwotę ${invoice.amount}` +
    ` została wysłana ${invoice.submittedAt}.`
  );
}

const invoice: Invoice = {
  amount: 123,
  submittedAt: new Date(),
};

// 1
getInvoiceSummary(invoice);

// 2
getInvoiceSummary({
  amount: 42,
  submittedAt: new Date(),
})

// 3 #> błąd kompilacji (excess property check)
getInvoiceSummary({
  amount: 42,
  submittedAt: new Date(),
  blabla: 123,
});

// 4 #> WTF?! BRAK błędu, kompatybilność zminia się w zależności od kontekstu.
const moreThanInvoice = {
  amount: 42,
  submittedAt: new Date(),
  blabla: 123,
};
getInvoiceSummary(moreThenInvoice);

/**
 * Modyfikatory w interfejsach
 * ? - opcja
 * readonly - nie ma możliwości modyfikacji
 */
interface Example {
  optionalProperty?: number;
  readonly cannotUpdateMe: string;
}

const ex: Example = {
  cannotUpdateMe: "abc",
};

// 1
ex.optionalProperty = 123; // #> ok
// 2
ex.cannotUpdateMe = "a"; // #> error!

// array tylko do odczytu
const a: ReadonlyArray<number> = [1, 2, 3];
// zwykły array, operacje nie dozwolone na arr a
const b: Array<number> = [1, 2, 3];
b[0] = 42;
b.push(123);
b.unshift();


/**
 * Wywoływalne i konstuowalne interfejsy
 */
// funkcje są obiektami, mogą mieć dodatkowe własności
interface Callable {
  render(name: string): boolean;
  inject: Array<string>;
}

interface Constructor {
  new (): number;
}
// konstuktor tworzy dwa typy
interface WeirdFunction {
  new (): number;
  (): string;
}
// przykład: (wywołanie => ciąg znaków || nowa instancja => obiekt daty)
function Date(...args) {
  if (this instanceof Date) {
    initializeDate(this, ... args);
  }

  return toDateString(clockGetTime());
}

/**
 * implementowanie interfejsów w klasach - kontrakty
 */
interface Queue {
  push(val: string): void;
  pop(): string;
}

class ArrayQueue implements Queue {
  private array: Array<string> = [];

  push(val: string) {
    this.array.push(val);
  }

  pop() {
    return this.array.pop();
  }
}

// wiele interfejsów
class MyClass implements A, B, C {
  // ...
}

// można implementować interfejsy i rozszerzać inne klasy
class MyClass extends OtherClass implements A, B, C {
  // ...
}

// interfejsy rozszerzające inne interfejsy
interface Drawable {
  draw(): void;
}

interface Collidable {
  readonly x: number;
  readonly y: number;
  collidesWith(obj: Collidable): boolean;
}

interface Character extends Drawable, Collidable {
  readonly health: number;
}

class Background implements Drawable {
  // ...
}

class Boulder implements Drawable, Collidable {
  // ...
}

class Player extends Character {
  // ...
}

/**
 * typ statyczny i typ instancji w klasach
 */
class User {
  constructor(public id: string) {}

  static compare(user1: User, user2: User): boolean {
    return user1.id === user2.id;
  }
}

const userA = new User("abc");
const userB = new User("123");
const userC = new User("abc");

User.compare(userA, userB); // #> false
UserRole.compare(userA, userC); // #> true

let x: User; // ->
let y: typeof User;

x.id; // string, instancja klasy User
y.compare; // funkcja, klasa User, statyczne prop i func

// opis typu static poprzez interfejsy
interface UserInstance {
  id: string;
}

interface UserConstructor {
  new (id: string): UserInstance;

  compare(a: UserInstance, b: UserInstance): boolean;
}

const User2: UserConstructor = class implements UserInstance {
  constructor(public id: string) {}

  static compare(a: UserInstance, b: UserInstance,): boolean {
    return a.id === b.id;
  }
}

/**
 * pola prywante ES (ES6+)
 *
 * # - jest natywne,
 *     jest unikalne w obrębie swojej klasy,
 *     nie zostanie nadpisane w trakcie dziedziczenia
 * private - skłowo kluczowe znika,
 *          będzie nadpisane w trakcie dziedziczenia
 */
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}

// e.g.
class Character {
  foo = 10;

  characterMethod() {
    return this.foo;
  }
}

class User extends Character {
  foo = 20;

  userMethod() {
    return this.foo;
  }
}

const user = new User();
console.log(user.characterMethod()); // #> '20'
console.log(user.userMethod()); // #> '20'

// a teraz:

class Character {
  #foo = 10;

  characterMethod() {
    return this.#foo;
  }
}

class User extends Character {
  #foo = 20;

  userMethod() {
    return this.#foo;
  }
}

const user = new User();
console.log(user.characterMethod()); // #> '10'
console.log(user.userMethod()); // #> '20'

// pola # zawsze trzeba zadeklarować przed użyciem
class Test1 {
  constructor(arg) {
    this.#foo = arg; // #> error!
  }
}

class Test2 {
  #foo;
  constructor(arg) {
    this.#foo = arg; // OK
  }
}

// w TS
class Test2 {
  #foo: string;
  constructor(arg: string) {
    this.#foo = arg; // OK
  }
}