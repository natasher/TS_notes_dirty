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
): response is InvoiceResponse {

}