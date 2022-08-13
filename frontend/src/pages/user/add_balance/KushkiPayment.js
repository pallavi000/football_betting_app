import React, { useEffect, useRef } from "react";

function KushkiPayment({ amount, confirmPayment }) {
  const kushki = useRef(null);
  const kushkiFormRef = useRef(null);

  useEffect(() => {
    if (kushkiFormRef.current) {
      kushki.current = new window.KushkiCheckout({
        form: "kushki-pay-form",
        merchant_id: "<public-merchant-id>",
        amount: {
          subtotalIva: 0, // Set it to 0 in case the transaction has no taxes
          iva: 0, // Set it to 0 in case the transaction has no taxes
          subtotalIva0: Number(amount), // Set the total amount of the transaction here in case the it has no taxes. Otherwise, set it to 0
          ice: 0, // Set it to 0 in case the transaction has no ICE (Impuesto a consumos especiales)
        },
        currency: "USD",
        payment_methods: ["credit-card", "card_async", "transfer"], // Payment Methods enabled
        inTestEnvironment: true,
        regional: false, // Optional
        language: "en",
        return_url: "https://my-ecommerce.com/",
        callback_url: "https://t72ajthpqukj.runscope.net", // Not required for Mexico
      });
    }
  }, [kushkiFormRef]);

  return (
    <form
      ref={kushkiFormRef}
      id="kushki-pay-form"
      action="confirm"
      method="post"
    >
      <input type="hidden" name="user_id" value="123" />
    </form>
  );
}

export default KushkiPayment;
