import React, { useEffect } from 'react';
import Head from 'next/head';

const SquarePaymentForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.squareup.com/v2/paymentform";
    script.async = true;
    script.onload = () => initializeSquarePaymentForm();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeSquarePaymentForm = () => {
    const paymentForm = new window.SqPaymentForm({
      applicationId: "YOUR_SQUARE_APPLICATION_ID",
      locationId: "YOUR_SQUARE_LOCATION_ID",
      inputClass: 'sq-input',
      autoBuild: false,
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: "Card Number"
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: "CVV"
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: "MM/YY"
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: "Postal Code"
      },
      callbacks: {
        cardNonceResponseReceived: function(errors, nonce, cardData) {
          if (errors) {
            console.error("Encountered errors:");
            errors.forEach(function(error) {
              console.error('  ' + error.message);
            });
            return;
          }
          console.log("Nonce received: " + nonce);
          // Further processing here
        }
      }
    });
    paymentForm.build();
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-4 border rounded-lg shadow">
        <div id="sq-card-number"></div>
        <div id="sq-cvv"></div>
        <div id="sq-expiration-date"></div>
        <div id="sq-postal-code"></div>
        <button className="mt-4 btn btn-primary" onClick={() => paymentForm.requestCardNonce()}>
          Pay
        </button>
      </div>
    </div>
  );
}

export default SquarePaymentForm;