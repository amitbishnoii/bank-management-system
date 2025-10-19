import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Deposit.css";

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // TODO: Replace with API call to get user data
    setBalance(5000);
  }, []);

  const handleDeposit = () => {
    setBalance(balance + Number(amount));
    setMessage(`₹${amount} deposited successfully!`);
    setAmount("");
  };

  return (
    <div className="deposit-page">

      <div className="deposit-main">
        <h2>Deposit Money</h2>
        <p className="balance">Current Balance: ₹{balance}</p>

        <div className="deposit-card">
          <div className="deposit-form">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleDeposit}>Deposit</button>
          </div>
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
