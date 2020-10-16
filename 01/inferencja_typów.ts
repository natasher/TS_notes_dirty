/***
 * Inferencja typów - kompilator potrafi automatycznie wywnioskować poprawne
 * typy zmiennych, funkcji i wyrażeń, bez adnotacji.
 */
function getRandom( b ) {
  if ( b === true ) {
    return 4;
  } else {
    return Math.random();
  }
}