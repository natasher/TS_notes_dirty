/**
 * typ warunkowy
 * -----------------
 */
type R = T extends U ? X : Y;

type IsBoolean<T> = T extends boolean ? true : false; // literały typów

type t01 = IsBoolean<number>; // false
type t02 = IsBoolean<string>; // false
type t03 = IsBoolean<true>; // true

/**
 * typy warunkowe na unii
 * ----------------------
 */
type NonNullable<T> = T extends null | undefined
  ? never
  : T;

type t04 = NonNullable<number>; // number
type t05 = NonNullable<string | null>; // string
type t06 = NonNullable<null | undefined>; // never

/**
 * Zagnieżdżanie
 * -------------
 */

//  generyk, któ©y zwraca typ zawierający nazwę podanego parametru
type TypeName<T> =
  T extends string
    ? "string"
    : T extends number
      ? "number"
      : T extends boolean
        ? "boolean"
        : T extends undefined
          ? "undefined"
          : T extends Function
            ? "function"
            : T extends Array<any>
              ? "array"
              : T extends null
                ? "null"
                : T extends symbol
                  ? "symbol"
                  : "object";

/**
 * Warunkowe typy dystrybutywne
 * ---------------------------
 */
type t16 = NonNullable<string | null | undefined>; // string
type t17 =
  | NonNullable<string>
  | NonNullable<null>
  | NonNullable<undefined>; // string

type Ref<T> = { current: T };
type RefVal<T> = T extends number
  ? Ref<T>
  : T extends string
    ? Ref<T>
    : never;

type t18 = RefVal<string>; // Ref<string>;
type t19 = RefVal<string | number>; // Ref<string> | Ref<number>;

type t20 = TypeName<string | number | number[]>; // "string" | "number" | "array"

type StringsOnly<T> = T extends string
  ? T
  : never;
type Result = StringsOnly<"abc" | 123 | "ghi">; // "abc" | "ghi"

/**
 * Przykład użycia json api
 */
type Model = {
  name: string;
  age: number;

  save(): Promise<void>;
};

type FieldsNames<T extends object> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type OnlyFields<T extends object> = {
  [K in FieldsNames<T>]: T[K];
};

type ModelFields = OnlyFields<Model>; // { name: string; age: number; }

// od końca, rozwijamy:
type ModelFields = {
  [K in FieldsName<Model>]: Model[K]
};

// 1. typ pomocniczy A
type A = {
  [K in keyof Model]: Model[K] extends Function
    ? never
    : K;
}[keyof Model];
// 2. dalej
type A = {
  [K in | "name" | "age" | "save"]:
    Model[K] extends Function
      ? never
      : K;
}[keyof Model];
// 3.
type A = {
  name: Model["name"] extends Function
    ? never
    : K;
  age: Model["age"] extends Function
    ? never
    : K;
  save: Model["save"] extends Function
    ? never
    : K;
}[keyof Model];
// 4.
type A = {
  name: string extends Function
    ? never
    : K;
  age: number extends Function
    ? never
    : K;
  save: (() => Promise<void>) extends Function
    ? never
    : K;
}[keyof Model];
// 5.
type A = {
  name: "name";
  age: "age";
  save: never;
}[keyof Model];
// 6.
type A = "name" | "age" | never;
// 7.
type A = "name" | "age";
// 8.
type Modelfields = {
  [K in "name" | "age"]: Model[K];
};
// 9.
type ModelFields = {
  name: Model["name"];
  age: Model["age"];
};
// 10.
type ModelFields = {
  name: string;
  age: number;
};

/**
 * opóźniony typ warunkowy
 * -----------------------
 */
declare function getEntityID<T>(
  x: T,
): T extends Entity ? string : number;

function getEntityData<U>(x: U) {
  const id = getEntityID(x);
  // const id = U extends Entity ? string : number
}

/**
 * kompatybilność typów warunkowych
 * ---------------------------------
 * typy warunkowe są kompatybilne z unią ich możliwych rezultatów.
 * T extends U ? A : B ==> A | B
 */
function getEntityData<U>(x: U) {
  const id = getEntityID(x); // U extends Entity ? string : number

  const foo: string | number = id; // ok
}

/**
 * infer
 * -----
 * ręcznie sterowana inferencja typów
 * "podaj mi typ tego, co jest w tym miejscu, czymkolwiek to jest"
 * pobieranie typu zwracanego przez funkcję tylko na podstawie jej definicji.
 */
type ReturnType<T> = T extends (
  ...args: unknown[]
) => infer R
  ? R
  : never;

type PromiseValue<T> = T extends Promise<infer R>
  ? R
  : never;
const promise = Promise.resolve(12);
type t22 =PromiseValue<typeof promise> // number

// wiele typow infer
type Component<Prose, State> = {
  props: PropertyDescriptor;
  state: State;
};

type GetStateAndProps<C> = C extends Component<
  infer Props,
  infer State
>
  ? [Props, State]
  : never;

const c = {
  props: 123,
  state: "aa",
};
type t23 = GetStateAndProps<typeof c>; // [number, string]

// inferencja tego samego typu

type Covariant<T> = () => T;
type Contravariant<T> = (x: T) => void;

// producenci, tworzą
type GetCovariantType<T> = T extends {
  createUser: Covariant<infer R>;
  createModerator: Covariant<infer R>;
}
  ? R
  : never;

// konsumenci, przyjmują
type GetContravariantType<T> = T extends {
  saveUser: Contravariant<infer R>;
  saveModerator: Contravariant<infer R>;
}
  ? R
  : never;

const repository1 = {
  createUser: (): User => ({
    name: "Michał",
    age: 21,
  }),
  createModerator: (): Moderator => ({
    name: "Kasia",
    age: 19,
    channels: [],
  }),
}
type t24 = GetContravariantType<typeof repository1>;
// { name: string; age: number; }
// User | Moderator

const repository2 = {
  saveUser: (x: User) => {},
  saveModerator: (x: Moderator) => {},
};
type t25 = GetContravariantType<typeof repository2>;
// User & Moderator