// ok
type User = { id: number };

const michal: User = { id: 123 };
const marcin: User = michal

// WTF? ok
type User = { id: number };
type Product = { id: number };

const michal: User = { id: 123 };
const bread: Product = michal;