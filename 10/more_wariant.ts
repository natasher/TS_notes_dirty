/**
 * Admin <= User <= Character
 * (x: Character) => Admin <= (x: User) => User
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

// helper type
type Moderator = {
  name: string;
  age: number;
  channels: string[];
};

type Fn = (x: User) => User;

// type Fn1 = (x: Admin) => Admin;
// type Fn2 = (x: Admin) => Character;
// type Fn3 = (x: Character) => Character;
type Fn4 = (x: Character) => Admin;

// figure out
const onUserCreated = (fn: Fn) => {};
const onUserCreated = (fn: (x: User) => User) => {};

/**
 * Higher Order Type - przyjmuje typ jako argument (zwany komponentem)
 * i zwraca inny typ, np. generyki.
 *
 * User <= Character
 * Covariant<User> <= Covariant<Character>
 * Contravariant<Character> <= Contravariant<User>
 *
 * kasza <= żywność -- podtyp zawęża zbór, ale rozszerza informacje.
 * producent(kasza) <= producent(żywność) -- kowariancja, każdy producent kaszy produkuje żywność
 * konsument(żywność) <= konsument(kasza) -- kontrawariancja, każdy konsument żywności może skonsumować kaszę
 */

/**
 * readonly - kowariancja
 * writeonly - kontrawiantne
 * read-write - inwariant
 */

/**
 * WTF?! ale ale:
 * Array jest kowariantne w TS :/
 */

const admins: Array<Admin> = [
  { age: 23, name: "Michał", role: "admin" },
];
const users: Array<User> = admins;

const moderator: Moderator = {
  age: 22,
  name: "Maja",
  channels: [],
};
users.push(moderator); // admins i users są ref na array, przez kowaiancję udało się dodać moda do adminów


/**
 * inferencja typów a wariancja
 * -----------------------------
 */
// arg <T> na pozycji kontrawariantnej (najbaradziej szczegółowy podtyp)
function execute<T>( ...functions: Array<(arg: T) => void> ): (arg: T) => void {
  return (arg) => functions.forEach( fn => fn(arg) );
}

function userFunction(u: User) {}
function adminFunction(a: Admmin) {}
function characterFunction(c: Character) {}
function moderatorFunction(m: Moderator) {}

const r1 = execute(userFunction); // #> r1: (arg: User) => void
const r2 = execute(userFunction, characterFunction); // #> r2: (arg: User) => void
const r3 = execute(userFunction, adminFunction); // #> r3: (arg: Admin) => void
const r4 = execute(adminFunction, moderatorFunction); // #> error! brak najlepszego wspólnego podtypu!

// arg <T> na pozycji kowariantnej (najlepszy współny supertyp, nadtyp)
function produce<T>( ... functions: Array<() => T>): () => T {
  return functions[0];
}

function createUser(): User {
  return { name: "Michał", age: 18 };
}
function createAdmin(): Admin {
  return { name: "Kasia", age: 21, role: "admin" };
}
function createCharacter(): Character {
  return { name: "Wojtek" };
}
function createModerator(): Moderator {
  return { name: "Alicja", age: 25, channels: [] };
}

const r1 = produce(createUser); // #> r1: () => User
const r2 = produce(createUser, createCharacter); // #> r2: () => Character
const r3 = produce(createUser, createAdmin); // #> r3: () => User
const r4 = produce(createAdmin, createModerator); // #> error! brak najlepszego wspólnego supertypu!


/**
 * bivarianceHack
 * ---------------
 */
type Covariant<T> = () => T;
type Contravariant<T> = (x: T) => void;
type Invariant<T> = (x: T) => T;
type Bivariant<T> = {
  bivarianceHack(x: T): void; // typ obiektu z jedną metodą
}["bivariancehack"]; // nie chce typu całego obiektu, tylko konkretnej metody

/**
 * Dlaczego metody są biwariantne?
 * --------------------------------
 */
const logAdmin: Bivariant<Admin> = (admin) =>
  console.log(admin.name, admin.role);
const logUser: Bivariant<User> = doSthAdmin;

logUser({ name: "Michał", age: 22 }); // #> undefined, brak `role`!

/**
 * Obiekty pozostały biwariantne, ale wspierać różne wzorce, np. events
 */
enum EventType {
  Mouse,
  Keyboard,
}

type MyEvent = { timestamp: number };
type MyMouseEvent = {
  timestamp: number;
  x: number;
  y: number;
};
type MyKeyboardEvent = {
  timestamp: number;
  keyCode: number;
};

// error!
function listenEvent1(
  eventType: EventType,
  handler: (n: MyEvent) => void, // > handler jest kontrawariantny
) {
  /* ... */
}

listenEvent1(EventType.Mouse, (e: MyMouseEvent) => console.log(e.x, e.y));

// rozwiązanie:
type MyEventHandler = {
  bivarianceHack(n: MyEvent): void;
}["bivarianceHack"];

function listenEvent2(
  eventType: EventType,
  handler: MyEventHandler, // > handler jest biwariantny
) {
  /* ... */
}

listenEvent2(EventType.Mouse, (e: myMouseEvent) => console.log(e.x, e.y));