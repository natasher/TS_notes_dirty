"use strict";
exports.__esModule = true;
exports.PizzaToppingsNames = exports.PizzaToppings = exports.PizzaSizesNames = exports.PizzaSizes = void 0;
var PizzaSizes;
(function (PizzaSizes) {
    PizzaSizes[PizzaSizes["S"] = 0] = "S";
    PizzaSizes[PizzaSizes["M"] = 1] = "M";
    PizzaSizes[PizzaSizes["L"] = 2] = "L";
    PizzaSizes[PizzaSizes["XL"] = 3] = "XL";
    PizzaSizes[PizzaSizes["XXL"] = 4] = "XXL";
})(PizzaSizes = exports.PizzaSizes || (exports.PizzaSizes = {}));
exports.PizzaSizesNames = Object.keys(PizzaSizes)
    .map(function (x) {
    if (new RegExp(/[0-9]/g).test(x)) {
        return PizzaSizes[x].toLowerCase();
    }
})
    .filter(function (x) { return x !== undefined; });
var PizzaToppings;
(function (PizzaToppings) {
    PizzaToppings[PizzaToppings["TOMATO"] = 0] = "TOMATO";
    PizzaToppings[PizzaToppings["BBQ"] = 1] = "BBQ";
    PizzaToppings[PizzaToppings["NONE"] = 2] = "NONE";
    PizzaToppings[PizzaToppings["CREAM"] = 3] = "CREAM";
})(PizzaToppings = exports.PizzaToppings || (exports.PizzaToppings = {}));
exports.PizzaToppingsNames = Object.keys(PizzaToppings)
    .map(function (x) {
    if (new RegExp(/[0-9]/g).test(x)) {
        return PizzaToppings[x].toLowerCase();
    }
})
    .filter(function (x) { return x !== undefined; });
