/**
 * Enum
 * ======
 * Określony zbiór jakichś wartości, znane z góry.
 */

/**
 * enumy numeryczne
 * -----------------
 */
// TS:
enum InvoiceStatus {
  SUBMITTED, // #> 0
  APPROVED,  // #> 1
  PAID,      // #> 2
}
// JS:
// enum InvoiceStatus {
//   SUBMITTED: 0,
//   APPROVED: 1,
//   PAID: 2,
//   0: "SUBMITTED",
//   1: "APPROVED",
//   2: "PAID",
// };

function getStatusLabel(status: InvoiceStatus) {
  switch (status) {
    case InvoiceStatus.SUBMITTED:
      return "invoice was submitted";
    case InvoiceStatus.APPROVED:
      return `it's approved`;
    case InvoiceStatus.PAID:
      return "kasa";
  }
}

/**
 * inicjalizacja
 */
enum AnotherEnum {
  SUBMITTED = 123,
  APPROVED, // 124,
  PAID, //125,
  SOMETHING_ELSE = 1024,
  MORE, // 1025
}

// inicjalizacja wyrażeniem
enum MyEnum {
  X = getValue(),
  y = 2 + 2,
}

// po polu z init. wyrażeniem, kolejne musi mieć zwykłe init.
enum MyEnum1 {
  X = getValue(),
  Y = 4,
  Z, // OK
}

enum MyEnum2 {
  X = getValue(),
  Y, // error!
}


/**
 * enumy z maską bitową
 * ---------------------
 */
enum FileAccess {
  None = 1 << 0,
  Read = 1 << 1,
  Write = 1 << 2,
  Execute = 1 << 3,
}

const readWrite = FileAccess.Read | FileAccess.Write

/**
 * enumy z ciągami znaków
 * -----------------------
 */
enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

// koncepcyjnie to samo (ale 3. pola, nie 6.):
const UserRole = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
};

/**
 * różnice
 * ---------
 * -> Enum numeryczny jest mniej bezpieczny,
 *    można przypisać dowolną liczbę.
 */
const InvoiceStatus: InvoiceStatus = 123; // hola hola
// zależy to od wygody na operacjach bitowych
enum FileAccess {
  NONE = 1 << 0,
  READ = 1 << 1,
  WRITE = 1 << 2,
  READ_WRITE = FileAccess.READ | FileAccess.WRITE,
}

const readWrite: FileAcess = FileAccess.READ | FileAccess.WRITE; // ok

// zaleca się używanie enum z stringami
enum InvoiceStatus {
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  PAID = "PAID",
}

const invoiceStatus: InvoiceStatus = "blablalba"; // #> error!

/**
 * Enumy są typowane nominalnie
 * (oprócz możliwości przypisania dowolnej liczby)
 * ----------------------------
 * Co daje większe bezpieczeństwo.
 */
enum InvoiceStatus {
  submitted,
  approved,
}

enum FormStatus {
  submitted,
  approved,
}

const test1: InvoiceStatus = FormStatus.submitted; // #> error!

/**
 * exhaustiveness test
 * -------------------
 * TS compiler option `noImplicitReturns`
 */
// stringi
enum Role {
  ADMIN = "admin",
  USER = "user",
}

function getPermissionsFor(role: Role) {
  switch (role) {
    case Role.ADMIN:
      return [
        /* ... */
      ];
    case Role.USER:
      return [
        /* ... */
      ];
  }
}

// numeryczne
enum Role {
  ADMIN,
  USER,
}

function getPermissionsFor(role: Role) {
  switch (role) {
    case Role.ADMIN:
      return [
        /* ... */
      ];
    case Role.USER:
      return [
        /* ... */
      ];
  }
}

getPermissionsFor(123); // błąd jest, ale nie jest zgłaszany

// solution `assertUnreachable` || `throwUnsupportedValue`
function assertUnreachable(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

function getPermissionsFor(role: Role) {
  switch (role) {
    case Role.ADMIN:
      return [
        /* ... */
      ];
    case Role.USER:
      return [
        /* ... */
      ];
  }
  return assertUnreachable(role);
}

/**
 * Kompatybilność obiektów i enumów
 * ----------------------------------
 */
function doSth(arg: { ADMIN: number }) {}
doSth(Role); // ok

/**
 * const enum
 * ------------
 * nie kompiluje się do JS, nie zamienia się w obiekt.
 * Zastępowane jest stałymi wartościami.
 */

// TS
enum Role {
  A,
  B,
  C,
}
const allowedRoles = [Role.A, Role.C];

// JS
(function (Role) {
  Role[(Role["A"] = 0)] = "A";
  Role[(Role["B"] = 0)] = "B";
  Role[(Role["C"] = 0)] = "C";
})(Role || (Role = {}));
const allowedRoles = [Role.A, Role.C];

// TS
const enum Role {
  A,
  B,
  C,
}
const allowedroles = [Role.A, Role.C];

// JS
const allowedRoles = [0 /* A */, 2 /* C */];