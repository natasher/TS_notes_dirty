/**
 * Algebraic Data Type (ADT) - połączenie wielu typów
 * -> typy iloczynu (product type): tupla
 * -> typy sumy (sum type): unia
 */
type Unit = "h" | "m" | "s";
type Time = [number, Unit];

type Character = Player | Enemy;

/**
 * Otagowana unia i pattern matching
 * -> otagowana unia (discriminated union, variant, coproduct)
 */
type Player = {
  type: "player";
  name: string;
};

type Enemy = {
  type: "enemy";
  hp: number;
};

type Character = Player | Enemy;

declare const character: Character;

if (character.type === "player") {
  // character: Player
} else {
  // character: Enemy
}

// inny przykład:

type SuccessResponse = {
  success: true; // typ nie wartość
  data: string;
};

type ErrorResponse = {
  success: false; // typ nie wartość
  error: Error;
};

type Response = SuccessResponse | ErrorResponse;

declare const res: Response;

if (res.success) {
  console.log(res.data);
} else {
  console.error(res.error);
}