type EventMessageName =
  | "productCreated"
  | "productDeleted"
  | "userDobUpdated"
  | "userDeleted";

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

type DecryptedData =
  | ProductCreatedData
  | ProductDeletedData
  | UserDobUpdatedData
  | UserDeletedData;

type RawRequest = {
  name: string;
  data: string;
};

const handleEvent = ({ data, name }: RawRequest) => {
  const decryptedData = decrypt( data );

  switch (name) {
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

function decrypt(data: string): DecryptedData {
  // ...
}