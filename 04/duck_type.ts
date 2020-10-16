// dostajemy nieznany obiekt x
if (x && typeof x.doSomething === "function") {
  x.doSomething();
}

// duck-typing w TS
if (typeof x === "number") {
  console.log(x.toFixed(2));
}