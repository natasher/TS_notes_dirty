import { Pizza } from "./classes/Pizza"
import { PizzaCatalog } from "./classes/PizzaCatalog";
import { IPizza } from "./interfaces/IPizza";
import { PizzaToppings, PizzaSizes } from "./enums/PizzaToppingsSizes";

const pizza: IPizza = {
  name      : 'Pizza BBQ',
  slices    : 6,
  toppings  : [ PizzaToppings.TOMATO, PizzaToppings.BBQ ],
  price     : 15,
  cheescrust: true,
  sizes     : [ PizzaSizes.S, PizzaSizes.M, PizzaSizes.L, PizzaSizes.XL ]
}

const bbqPizza = new Pizza(pizza)

const hawaiPizza = new Pizza({
  name: "Hawai",
  slices: 6,
  toppings: [PizzaToppings.TOMATO],
  price: 12,
  cheescrust: true,
  sizes: [
    PizzaSizes.S,
    PizzaSizes.M,
    PizzaSizes.L,
    PizzaSizes.XL,
    PizzaSizes.XXL
  ]
});

const vegiPizza = new Pizza({
  name: "Veggi",
  slices: 6,
  toppings: [PizzaToppings.TOMATO],
  price: 11,
  cheescrust: false,
  vegan: true,
  vegatarian: true,
  sizes: [
    PizzaSizes.S,
    PizzaSizes.M,
    PizzaSizes.L,
    PizzaSizes.XL,
    PizzaSizes.XXL
  ]
});


export const pizzaCatalog = new PizzaCatalog([ bbqPizza, hawaiPizza, vegiPizza ])