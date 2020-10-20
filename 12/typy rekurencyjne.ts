type User = {
  name: string;
  friends: Array<User>;
};

type Json =
  | null
  | string
  | number
  | boolean
  | Json[]
  | { [name: string]: Json };

// dla generyków
type Bar<A> = { x: A };
type Foo = Bar<Foo>; // error!
// ale ale:
type Bar<A> = { x: A };
interface Foo extends Bar<Foo> {} // OK

// interface nie zadziała dla typów warunkowych
type Awaited<T> = T extends Promise<infer R>
  ? Awaited<R>
  : T;

// error!
type T1 = Awaited<number>; // number
type T2 = Awaited<Promise<number>>; // number
type T3 = Awaited<Promise<Promise<number>>>; // number

// ale ale:
type Awaited<T> = T extends Promise<infer R>
  ? { 0: Awaited<R> }[T extends any ? 0 : never]
  : T;