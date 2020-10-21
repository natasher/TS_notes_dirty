/**
 * Nominalny system typów opiera się o nazwy lub referencje, a nie wyłącznie kształt.
 */

/**
 * Branding
 */
type Booking = {
  __brand: "Booking";
  amount: number;
  count: number;
};
type Invoice = {
  __brand: "Invoice";
  amount: number;
  count: number;
};

declare let invoice: Invoice;
getInvoiceTotal(invoice); // ok

declare let booking: Booking;
getInvoiceTotal(booking); // error!

// prymitywy

type InvoiceID = number & { __brand: "InvoiceID" };
type UserID = number & { __brand: "UserID" };

declare let invoiceId: InvoiceID;
declare let userId: UserID;
invoiceId = userId; // error!
userId = invoiceId; // error!

// generyk

type Brand<T, BrandT> = T & { __brand: BrandT };

type InvoiceID = Brand<number, "InvoiceID">;
type Booking = Brand<
  {
    amount: number;
    count: number;
  },
  "Booking"
>;

/**
 * rzutowanie
 */

const invoiceId = 1 as InvoiceID;

function toInvoiceID(id: number) {
  return id as InvoiceID;
}

function fromInvoiceID(id: InvoiceID) {
  return id as number;
}

/**
 * ograniczenia brandowania
 * -------------------------
 * -> kompilator uważa, że pole __brand istnieje console.log(booking.__brand) jest ok
 * -> zwykłe wartości przestały być kompatybilne z naszymi typami
 */