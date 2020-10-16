export enum PizzaSizes {
  S,
  M,
  L,
  XL,
  XXL
}

export const PizzaSizesNames: string[] = Object.keys(PizzaSizes)
  .map(x => {
    if (new RegExp(/[0-9]/g).test(x)) {
      return PizzaSizes[x].toLowerCase();
    }
  })
  .filter(x => x !== undefined);

export enum PizzaToppings {
  TOMATO,
  BBQ,
  NONE,
  CREAM
}

export const PizzaToppingsNames: string[] = Object.keys(PizzaToppings)
  .map(x => {
    if (new RegExp(/[0-9]/g).test(x)) {
      return PizzaToppings[x].toLowerCase();
    }
  })
  .filter(x => x !== undefined);