import { IPizzaPrice } from "./IPizzaPrice"
import { PizzaToppings, PizzaSizes } from "../enums/PizzaToppingsSizes";

export interface IPizza {
  name       : string;
  slices     : number;
  toppings   : PizzaToppings[];
  price      : number;
  cheescrust : boolean;
  sizes      : PizzaSizes[];
  vegan     ?: boolean;
  vegatarian?: boolean;
  prices    ?: IPizzaPrice[];
}