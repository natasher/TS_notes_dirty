import { Pizza } from "./Pizza";

export class PizzaCatalog {
  list: Pizza[] = [];

  constructor (list: Pizza[]) {
    this.list = list;
  }
}