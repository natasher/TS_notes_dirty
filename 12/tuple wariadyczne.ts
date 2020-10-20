/**
 * Tuple wariadyczne (TS 4.x)
 * ----------------------------
 */
function concat<
  T extends readonly unknown[], // 1 --> dowolna tupla
  U extends readonly unknown[], // 2 --> dowolna tupla
>(arr1: T, arr2: U): [...T, ...U] { // 3 --> typ zwracany funkcji
  return [...arr1, arr2]; // 4
}

const tuple1 = ["a"] as const;
const tuple2 = ["b", "c", "d"] as const;

const result = concat(tuple1, tuple2); // #> typ: ["a", "b", "c", "d"]

// łączenie tupli wariadycznych z typami i talicami
type Interval = [number, "m" | "d"];
type Numbers = number[];
type Result = [...interval, boolean, ...Numbers]; // #> typ [number, "m" | "d", boolean, ...number[]]

// funkcja z jednym booleanem na końcu args i dowolną liczbą innych parametrów <string>
function f<T extends string[]>(
  ...args: [...Text, boolean]
) {
  // ...
}