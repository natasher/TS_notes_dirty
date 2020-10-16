// without arrow fn
Element.prototype.deleteAll = function () {
  this.childNodes.forEach(
    function ( node ) {
      this.delete( node );
    }.bind( this ),
  );
};

// with arrow fn
Element.prototype.deleteAll = function () {
  this.childNodes.forEach(( node ) => {
    this.delete( node );
  });
};