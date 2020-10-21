type Currency = "USD" | "PLN" | "EUR";
type Invoice = {
  id: string;
  userId: string;
  addedAt?: string;
  amount: number;
  currency: Currency;
};

type InvoicesResponse = {
  invoices: Array<Invoice>;
};

async function getInvoices() {
  const res = await fetch( INVOICES_URL );
  const data = await res.json();

  return data as InvoicesResponse;
}

/**
 * Walidacja
 */

async function getInvoices() {
  const res = await fetch( INVOICES_URL );
  const data = await res.json();

  if ( validateInvoiceResponse( data )) {
    return data;
  } else {
    // obsłuż błąd
  }
}

function validateInvoiceResponse(
  response: any,
): response is InvoicesResponse {
  if ( !invoices || !Array.isArray( invoices )) {
    return false;
  }

  return invoices.every(( invoice ) => {
    return (
      invoice &&
      invoice.id &&
      typeof invoice.id === "string" &&
      invoice.userId &&
      typeof invoice.userId === "string" &&
      invoice.amount &&
      typeof invoice.amount === "number" &&
      invoice.currency &&
      typeof invoice.currency === "string"
    );
  });
}