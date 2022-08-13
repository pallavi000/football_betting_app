import React, { useEffect, useRef, useState } from "react";
import visa from "../../../images/visa.png";
import stripe from "../../../images/stripe.png";
import master from "../../../images/master.png";
import lock from "../../../images/lock.png";
import { addBalance } from "./Action";
import { useNavigate } from "react-router-dom";
import kus from "../../../images/pm-kus.png";
import pay from "../../../images/pm-paypal.png";
import PayPalPayment from "./PayPalPayment";
import KushkiPayment from "./KushkiPayment";
import FileSubmitLoader from "../../Loader/FileSubmitLoader";

function Desktop() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodChoose, setPaymentMethodChoose] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPaymentMethodChoose(true);
  }

  async function confirmPayment() {
    setIsLoading(true);
    const data = {
      balance: Number(amount),
      paymentMethod,
    };
    await addBalance(data);
    navigate("/success");
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <FileSubmitLoader />}
      <div className="add-card-section">
        <div className="add-card-title">How would you like to add balance?</div>

        {paymentMethodChoose && paymentMethod === "kushki" ? (
          <KushkiPayment amount={amount} confirmPayment={confirmPayment} />
        ) : paymentMethodChoose && paymentMethod === "paypal" ? (
          <PayPalPayment amount={amount} confirmPayment={confirmPayment} />
        ) : (
          <div className="">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group mb-4">
                <label>Amount</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    $
                  </span>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Amount"
                    min={1}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  ></input>
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="form-group d-flex px-3 justify-content-between align-items-start payment-method-group">
                  <div className="">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      value="kushki"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <label className="form-check-label ms-2">
                      <div>Kushki</div>
                      <small className="text-muted xsm fw-normal">
                        Credit Card, Debit Card and Bank Transfer
                      </small>
                    </label>
                  </div>
                  <div className="payment-method-logo text-end">
                    <img src={kus} width={24} />
                  </div>
                </div>
                <div className="form-group d-flex px-3 justify-content-between align-items-start payment-method-group">
                  <div className="">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      value="paypal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <label className="form-check-label ms-2">
                      <div>PayPal</div>
                      <small className="text-muted xsm fw-normal">
                        You will be redirected to the PayPal website after
                        submitting your request
                      </small>
                    </label>
                  </div>
                  <div className="payment-method-logo text-end">
                    <img src={pay} width={24} />
                  </div>
                </div>
              </div>

              {/* <div className="add-card-title mt-5">Payment method</div>
          <div className="payment-method-section">
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>

              <div className="d-flex align-items-center">
                <div className="payment-card-holder">
                  <img src={visa} className="img-fluid" />
                </div>
                <div className="payment-card-holder">
                  <img src={stripe} className="img-fluid" />
                </div>
                <div className="payment-card-holder">
                  <img src={master} className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <label>Name on Card</label>
                <input className="form-control" type="text"></input>
              </div>
              <div className="col">
                <label>Expiry</label>
                <input
                  className="form-control"
                  name="away_team"
                  type="date"
                ></input>
              </div>
            </div>

            <div className="form-group row">
              <div className="col">
                <label>Card Number</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="4141 4141 4141 4141"
                ></input>
              </div>
              <div className="col">
                <label>CCV</label>
                <input
                  className="form-control"
                  name="away_team"
                  type="password"
                ></input>
              </div>
            </div>
          </div> */}

              <div className="d-flex justify-content-start align-items-center mt-4">
                <img src={lock} className="img-fluid"></img>
                <div className="lock-text">
                  We protect your payment information using encryption to
                  provide bank-level security.
                </div>
              </div>

              {isLoading ? (
                <button className="btn-add-card">
                  Processing.. <i className="fa-solid fa-arrow-right"></i>
                </button>
              ) : (
                <button className="btn-add-card">
                  AGREGAR SALDO<i className="fa-solid fa-arrow-right"></i>
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Desktop;
