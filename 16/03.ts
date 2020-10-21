/**
 * Flavoring
 */
type InvoiceID = number & { __flavor?: "InvoiceID" };

type Invoice = {
  __flavor?: "Invoice";
  amount: number;
  count: number;
};

getInvoiceTotal({ amount: 10, count: 100 }); // znowu ok

// generyk

type Flavor<T, FlavorT> = T & { __flavor?: FlavorT };

// jednak smród pozostał:
booking.__flavor; // ?

userId = 1; // Ok?? czy `1` to na pewno ID?

/**
 * Flavor ==> Object
 * Brand  ==> Prymitiv
 */

type Brand<T, BrandT>   = T & { __brand  : BrandT };
type Flavor<T, FlavorT> = T & { __flavor?: FlavorT };
type Nominal<T, NameT>  = T extends object
  ? Flavor<T, NameT>
  : Brand<Text, NameT>;


/**
 * Klasy z polami prywatnymi nie są typowane strukturlnie,
 * lecz nominalnie.
 */
class Booking {
  private _: void;
  amount!: number;
  count!: number;
}

/**
 * Enumy
 */
enum BookingType {}
type Booking = BookingType & {
  amount: number;
  count: number;
}

/**
 * unique symbol
 */
declare const InvoiceIDType: unique symbol;
type InvoiceID = {
  [InvoiceIDType]: typeof InvoiceIDType;
} & number;

declare const BookingType: unique symbol;
type Booking = {
  [BookingType]: typeof BookingType;
} & {
  amount: number;
  count: number;
};