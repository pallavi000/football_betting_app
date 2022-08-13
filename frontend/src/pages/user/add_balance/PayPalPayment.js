import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "Adnm9J7y3sVVv0z2aw0N5H3JWGj3PhPV_Dsfljqx-Hfbrv5ExERX80Y86FHdpvj5Sp25iex_vU50DcC6",
  currency: "USD",
  intent: "capture",
};

function PayPalPayment({ amount, confirmPayment }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        disabled={false}
        fundingSource={undefined}
        forceReRender={[amount]}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: Number(amount),
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            confirmPayment();
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;
