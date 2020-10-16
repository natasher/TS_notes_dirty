import { IPizza      } from "../interfaces/IPizza";
import { IPizzaPrice } from "../interfaces/IPizzaPrice";
import { PizzaToppings, PizzaSizes } from "../enums/PizzaToppingsSizes";

export class Pizza {
  name       : string          = '';
  slices     : number          = 8;
  toppings   : PizzaToppings[] = [];
  price      : number          = 0;
  cheescrust : boolean         = false;
  sizes      : PizzaSizes[]    = [];
  vegan     ?: boolean         = false;
  vegaterian?: boolean         = false;
  prices     : IPizzaPrice[]   = null;

  constructor(data: IPizza) {
    this.name       = data.name;
    this.slices     = data.slices;
    this.toppings   = data.toppings;
    this.price      = data.price;
    this.cheescrust = data.cheescrust;
    this.sizes      = data.sizes;
    this.prices     = this.getPizzaPrices();

    if (data.vegan) {
      this.vegan = data.vegan;
    }

    if (data.vegatarian) {
      this.vegaterian = data.vegatarian;
    }
  }

  private getPizzaPrices(): IPizzaPrice[] {
    return this.sizes.map((item, index) => {
      const addition = (this.price / 100) * 15 * index;

      console.log(this.price + addition);

      return {
        size : PizzaSizes[item],
        price: this.price + addition
      }
    })
  }
}
