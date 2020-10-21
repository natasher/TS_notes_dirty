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
  const decryptedData = decrypt( data, name );

  switch (
    decryptedData.name
  ) {
    case "productCreated":
      addProduct( decryptedData.data );
      break;
    case "productDeleted":
      deleteProduct( decryptedData.data );
      break;
    case "userDobUpdated":
      updateUser( decryptedData.data );
      break;
    default:
      assertUnreachable( decryptedData );
  }
};

function decrypt(
  data: string,
  name: EventMessageName,
): Message {
  return {
    data: decipher( data ),
    name,
  } as Message;
}

function assertUnreachable(x: never): never {
  throw new Error();
}