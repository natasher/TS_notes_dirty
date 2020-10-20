type ProductCreatedData = {
  id: string;
  productName: string;
  availability: number;
};

type ProductDeletedData = {
  id: string;
};

type UserDobUpdatedData = {
  id: string;
  date: string;
};

type UserDeletedData = {
  id: string;
};

type ProductCreatedMessage = {
  name: "productCreated";
  data: ProductCreatedData;
};

type ProductDeletedMessage = {
  name: "productDeleted";
  data: ProductDeletedData;
}

type UserDobUpdatedMessage = {
  name: "userDobUpdated";
  data: UserDobUpdatedData;
};

type UserDeletedMessage = {
  name: "userDeleted";
  data: UserDeletedData;
};

type Message =
  | ProductCreatedMessage
  | ProductDeletedMessage
  | UserDobUpdatedMessage
  | UserDeletedMessage;

type EventMessageName = Message["name"];
type DecryptedData = Message["data"];

type RawRequest = {
  name: string;
  data: string;
};

const handleEvent = ({ data, name }: RawRequest) => {
  const decryptedData = decrypt( data );

  switch ( name ) {
    case "productCreated":
      addProduct( decryptedData as ProductCreatedData );
      break;
    case "productDeleted":
      deleteProduct( decryptedData as ProductDeletedData );
      break;
    case "userDobUpdated":
      updateUser( decryptedData as UserDeletedData );
      break;
    default:
      // ?
      break;
  }
};

function decrypt(
  data: string,
  name: ProductCreatedMessage["name"],
): ProductCreatedMessage["data"];
function decrypt(
  data: string,
  name: UserDeletedMessage["name"]
): ProductDeletedMessage["data"];
function decrypt(
  data: string,
  name: UserDobUpdatedMessage["name"]
): UserDobUpdatedMessage["data"];
function decrypt(
  data: string,
  name: UserDeletedMessage["name"]
): UserDeletedMessage["data"];
function decrypt(
  data: string,
  name: Message["name"],
): Message["data"] {
  // ...
}