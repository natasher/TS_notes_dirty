/**
 * THEORY
 * ========
 */

/**
 * User extends Character
 * Admin extends User (extends Character)
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

/**
 * Kowariancja - możliwość używania podtypu (typu pochodnego, bardziej szczegółowego)
 */
let x1: Covariant<Admin> = { /* ... */ };
let y1: Covariant<User> = { /* ... */ };
let z1: Covariant<Character> = { /* ... */ };

y1 = x1; // ok
y1 = z1; // error

/**
 * Kontrawariancja - możliwość używania typu nadrzędnego (supertypu, nadtypu, bardziej ogólnego)
 */
let x2: Contravariant<Admin> = { /* ... */ }
let y2: Contravariant<User> = { /* ... */ }
let z2: Contravariant<Character> = { /* ... */ }

y2 = x2; // error
y2 = z2; // ok

/**
 * Biwariancja - możliwość używania podtypu lub nadtypu
 */
let x3: Bivariant<Admin> = { /* ... */ }
let y3: Bivariant<User> = { /* ... */ }
let z3: Bivariant<Character> = { /* ... */ }

y3 = x3; // ok
y3 = z3; // ok

/**
 * Inwariancja - X <=> X
 */
let x4: Invariant<Admin> = { /* ... */ }
let y4: Invariant<User> = { /* ... */ }
let z4: Invariant<Character> = { /* ... */ }

y4 = x4; // error
y4 = z4; // error

/**
 * =================================================
 */

type Fn = (x: User) => User;
