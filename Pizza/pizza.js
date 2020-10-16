"use strict";
exports.__esModule = true;
exports.pizzaCatalog = void 0;
var Pizza_1 = require("./classes/Pizza");
var PizzaCatalog_1 = require("./classes/PizzaCatalog");
var PizzaToppingsSizes_1 = require("./enums/PizzaToppingsSizes");
var pizza = {
    name: 'Pizza BBQ',
    slices: 6,
    toppings: [PizzaToppingsSizes_1.PizzaToppings.TOMATO, PizzaToppingsSizes_1.PizzaToppings.BBQ],
    price: 15,
    cheescrust: true,
    sizes: [PizzaToppingsSizes_1.PizzaSizes.S, PizzaToppingsSizes_1.PizzaSizes.M, PizzaToppingsSizes_1.PizzaSizes.L, PizzaToppingsSizes_1.PizzaSizes.XL]
};
var bbqPizza = new Pizza_1.Pizza(pizza);
var hawaiPizza = new Pizza_1.Pizza({
    name: "Hawai",
    slices: 6,
    toppings: [PizzaToppingsSizes_1.PizzaToppings.TOMATO],
    price: 12,
    cheescrust: true,
    sizes: [
        PizzaToppingsSizes_1.PizzaSizes.S,
        PizzaToppingsSizes_1.PizzaSizes.M,
        PizzaToppingsSizes_1.PizzaSizes.L,
        PizzaToppingsSizes_1.PizzaSizes.XL,
        PizzaToppingsSizes_1.PizzaSizes.XXL
    ]
});
var vegiPizza = new Pizza_1.Pizza({
    name: "Veggi",
    slices: 6,
    toppings: [PizzaToppingsSizes_1.PizzaToppings.TOMATO],
    price: 11,
    cheescrust: false,
    vegan: true,
    vegatarian: true,
    sizes: [
        PizzaToppingsSizes_1.PizzaSizes.S,
        PizzaToppingsSizes_1.PizzaSizes.M,
        PizzaToppingsSizes_1.PizzaSizes.L,
        PizzaToppingsSizes_1.PizzaSizes.XL,
        PizzaToppingsSizes_1.PizzaSizes.XXL
    ]
});
exports.pizzaCatalog = new PizzaCatalog_1.PizzaCatalog([bbqPizza, hawaiPizza, vegiPizza]);
