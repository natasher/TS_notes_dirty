/**
 * Partial
 * ----------
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Required
 * ------------
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Readonly
 * ----------
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Pick
 * -----
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
}

type UserNames = Pick<
  User,
  "firstName" | "lastName"
>;

/**
 * Record
 * -------
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type UserIdToEmail = Record<User["id"], Email>;

type State = "fetching" | "loaded" | "error";
type StateToComponent = Record<State, Component>;

/**
 * Exclude
 * ---------
 */
type Exclude<T, U> = t extends U ? never : T;

/**
 * Extract
 * -------
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Omit
 * -----
 */
type Omit<T, K extends keyof any> = Pick<
  T,
  Exclude<keyof T, K>
>;

type Invoice = {
  id: string;
  value: number;
  tax: number;
};
type NewInvoice = Omit<Invoice, "id">;

/**
 * NonNullable
 * ------------
 */
type NonNullable<T> = T extends null | undefined
  ? never
  : T;

type InvoiceModel = {
  id: string;
  value: number;
  tax?: number | null;
};

type InvoiceForm = {
  [K in keyof InvoiceModel]-?: NonNullable<InvoiceModel[K]>;
};

/**
 * Parameters
 * -----------
 */
type Parameters<
  T extends (...args: any) => any
> = T extends (...args: infer P) => any
  ? P
  : never;

/**
 * ConstructorParameters
 * ---------------------
 */
type ConstructorParameters<
  T extends new (...args: any) => any
> = T extends new (...args: infer P) => any
  ? P
  : never;

/**
 * ReturnType
 * -----------
 */
type ReturnType<
  T extends (...args: any) => any
> = T extends (...args: any) => infer R
  ? R
  : any;