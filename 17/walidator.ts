/**
 * -> walidator dla stringów
 * -> walidator dla liczb
 * -> walidator dla obiektów
 *
 * => generyk TypOf
 */

// Kształt walidatora
const Validator = {
  string() {
    return {
      parse(str: unknown): str is string {
        return typeof str === "string";
      },
    };
  },
  number() {
    return {
      parse(num: unknown): num is number {
        return typeof num === "number";
      }
    }
  }
};

// usage:
const stringValidator = Validator.string();

declare const val: unknown;
if ( stringValidator.parse( val ) ) {
  // val to string
}

// generyk

const __type = Symbol("typeofweb");
type __Type = typeof __type;

type ValidatorTG<T = unknown> = {
  parse(o: any): o is T;
  [__type]: T;
}

const ValidatorG = {
  string() {
    return {
      parse(str: unknown): str is string {
        return typeof str === "string";
      },
    } as ValidatorTG<string>;
  },
};

type X = typeof stringValidator[__Type]
type TypeOf<T extends ValidatorT<any>> = T[__Type];