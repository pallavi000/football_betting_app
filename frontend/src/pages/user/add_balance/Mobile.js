import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import kus from "../../../images/kus.png";
import pay from "../../../images/pay.png";
import { addBalance } from "./Action";

function Mobile() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      balance: amount,
    };
    await addBalance(data);
    navigate("/success");
    setIsLoading(false);
  }

  return (
    <div className="mobile-card-section add-balance">
      <div className="alert alert-danger">
        Not Yet Implemented. Waiting for Kushki Key
      </div>
      <form
        className="active-card-section h-100"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="add-home-team">
          <label className="add-balance-label">Amount</label>
          <input
            type="number"
            placeholder="$ Amount"
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="add-home-team mr-3">
            <img src={kus} className="img-fluid" />
          </div>
          <div className="add-home-team">
            <img src={pay} className="img-fluid" />
          </div>
        </div>
        <div className="add-home-team">
          <label className="add-balance-label mt-4">Name on Card</label>
          <input type="text" placeholder="Name on card"></input>
        </div>
        <div className="add-home-team">
          <label className="add-balance-label">Card Number</label>
          <input type="text" placeholder="4141 4141 4141 4141"></input>
        </div>
        <div className="add-home-team">
          <label className="add-balance-label">Amount</label>
          <input type="text" placeholder="$ Amount"></input>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="add-home-team">
            <label className="add-balance-label">Expire Date</label>
            <input type="date" placeholder="06/24"></input>
          </div>
          <div
            className="add-home-team ccv-margin"
            style={{ marginRight: "1rem" }}
          >
            <label className="add-balance-label">CCV</label>
            <input type="number" placeholder="***"></input>
          </div>
        </div>
        {isLoading ? (
          <button className="mobile-submit-btn">Paying</button>
        ) : (
          <button className="mobile-submit-btn">AGREGAR SALDO</button>
        )}
      </form>
    </div>
  );
}

export default Mobile;
