// old
class Component {
  constructor() {
    this.state = { text: "" };
    this.boundFunction = () => {};
  }
}

// alt
class Component {
  constructor() {
    this.state = { text: "" };
    this.boundFunction = this.boundFunction.bind( this );
  }

  boundFunction() {}
}

// now
class Component {
  state = { text: "" };
  boundFunction = () => {};
}