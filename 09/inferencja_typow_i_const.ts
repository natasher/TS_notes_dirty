// basic
let val = 123 // kompilator widzi, że <number>

/**
 * Typ wspólny
 */
function fn(a: string, b: number): string | number {
  return Math.random() > 0.5 ? a : b
}

const arr: Array<number | string | null> = [1, "a", null]

const interval = [1, "m"]; // Array, bo i dla tupli jest true

const interval: [number, string] = [1, "m"] // Tupla, bo tak zadeklarowaliśmy


/**
 * Inferencja kontekstowa
 */
type Cb = (name: string, age: number) => boolean;

const fn: Cb = (name, age) => {
  return name.length > 1 && age > 18
}

/**
 * Cementowanie typów
 */
type Invoice = {
  amount: number;
  submittedAt?: Date;
}

function getInvoiceTotal(invoice: Invoice): number | undefined {
  return invoice.submittedAt && invoice.amount;
}

/**
 * const i let
 */
let valVariable = 123; // number
const valConstant = 123; // 123