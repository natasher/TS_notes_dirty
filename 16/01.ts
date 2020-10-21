type Invoice = {
  amount: number;
  count: number;
};

/**
 * @param invoice <Invoice> -- może być dowolną wartością
 * posiadającą pola `amount` i `count`
 */
function getInvoiceTotal(invoice: Invoice) {
  return invoice.count * invoice.amount;
}

getInvoiceTotal({ amount: 10, count: 100 })

/**
 * Kolizja obiektów
 */
type Booking = {
  amount: number;
  count: number;
};

declare const booking: Booking;

getInvoiceTotal( booking ); // strukturalnie się zgadza, tak więc ok :(


/**
 * Kolizja wartości
 */
const timeInSeconds = 10;

setTimeout(fn, timeInSeconds); // no i dupa, powinny być ms

const invoice = {
  id: booking.id, // U idiot!
}

const userId: UserID = 123;
const invoiceId: InvoiceID = 42;
const result = userId + invoiceId; // make NO sense!