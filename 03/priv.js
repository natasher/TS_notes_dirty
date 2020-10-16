var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name;
var Person = /** @class */ (function () {
    function Person(name) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
    }
    Person.prototype.greet = function () {
        console.log("Hello, my name is " + __classPrivateFieldGet(this, _name) + "!");
    };
    return Person;
}());
_name = new WeakMap();
var p = new Person('Artur');
p.greet();
