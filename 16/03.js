getInvoiceTotal({ amount: 10, count: 100 }); // znowu ok
// jednak smród pozostał:
booking.__flavor; // ?
userId = 1; // Ok?? czy `1` to na pewno ID?
/**
 * Klasy z polami prywatnymi nie są typowane strukturlnie,
 * lecz nominalnie.
 */
var Booking = /** @class */ (function () {
    function Booking() {
    }
    return Booking;
}());
/**
 * Enumy
 */
var BookingType;
(function (BookingType) {
})(BookingType || (BookingType = {}));
