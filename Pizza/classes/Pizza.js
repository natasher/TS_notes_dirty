"use strict";
exports.__esModule = true;
exports.Pizza = void 0;
var PizzaToppingsSizes_1 = require("../enums/PizzaToppingsSizes");
var Pizza = /** @class */ (function () {
    function Pizza(data) {
        this.name = '';
        this.slices = 8;
        this.toppings = [];
        this.price = 0;
        this.cheescrust = false;
        this.sizes = [];
        this.vegan = false;
        this.vegaterian = false;
        this.prices = null;
        this.name = data.name;
        this.slices = data.slices;
        this.toppings = data.toppings;
        this.price = data.price;
        this.cheescrust = data.cheescrust;
        this.sizes = data.sizes;
        this.prices = this.getPizzaPrices();
        if (data.vegan) {
            this.vegan = data.vegan;
        }
        if (data.vegatarian) {
            this.vegaterian = data.vegatarian;
        }
    }
    Pizza.prototype.getPizzaPrices = function () {
        var _this = this;
        return this.sizes.map(function (item, index) {
            var addition = (_this.price / 100) * 15 * index;
            console.log(_this.price + addition);
            return {
                size: PizzaToppingsSizes_1.PizzaSizes[item],
                price: _this.price + addition
            };
        });
    };
    return Pizza;
}());
exports.Pizza = Pizza;
