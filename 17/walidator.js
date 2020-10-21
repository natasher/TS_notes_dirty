/**
 * -> walidator dla stringów
 * -> walidator dla liczb
 * -> walidator dla obiektów
 *
 * => generyk TypOf
 */
// Kształt walidatora
var Validator = {
    string: function () {
        return {
            parse: function (str) {
                return typeof str === "string";
            }
        };
    },
    number: function () {
        return {
            parse: function (num) {
                return typeof num === "number";
            }
        };
    }
};
// usage:
var stringValidator = Validator.string();
if (stringValidator.parse(val)) {
    // val to string
}
// generyk
var __type = Symbol("typeofweb");
var ValidatorG = {
    string: function () {
        return {
            parse: function (str) {
                return typeof str === "string";
            }
        };
    }
};
