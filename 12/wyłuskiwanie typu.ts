type User = {
  id: number;
  name: string;
  age: number;
};

type UserID = User["id"];

function findUser(id: User["id"]): User {
  // ...
}