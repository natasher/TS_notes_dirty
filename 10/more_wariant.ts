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
