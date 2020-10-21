/**
 * Flavoring
 */
declare type InvoiceID = number & {
    __flavor?: "InvoiceID";
};
declare type Invoice = {
    __flavor?: "Invoice";
    amount: number;
    count: number;
};
declare type Flavor<T, FlavorT> = T & {
    __flavor?: FlavorT;
};
/**
 * Flavor ==> Object
 * Brand  ==> Prymitiv
 */
declare type Brand<T, BrandT> = T & {
    __brand: BrandT;
};
declare type Flavor<T, FlavorT> = T & {
    __flavor?: FlavorT;
};
declare type Nominal<T, NameT> = T extends object ? Flavor<T, NameT> : Brand<Text, NameT>;
/**
 * Klasy z polami prywatnymi nie są typowane strukturlnie,
 * lecz nominalnie.
 */
declare class Booking {
    private _;
    amount: number;
    count: number;
}
/**
 * Enumy
 */
declare enum BookingType {
}
declare type Booking = BookingType & {
    amount: number;
    count: number;
};
/**
 * unique symbol
 */
declare const InvoiceIDType: unique symbol;
declare type InvoiceID = {
    [InvoiceIDType]: typeof InvoiceIDType;
} & number;
declare const BookingType: unique symbol;
declare type Booking = {} & {
    amount: number;
    count: number;
};
