// Withdraw.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // make sure the path is correct
import "./Withdraw.css"; // separate CSS file

const Withdraw = () => {
  const [amount, setAmount] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();
    // Logic will be added later
    alert(`Withdraw request for ₹${amount} submitted!`);
    setAmount("");
  };

  return (
    <div className="withdraw-container">
      <Sidebar />
      <div className="withdraw-page">
        <div className="withdraw-card">
          <h2>Withdraw Money</h2>
          <form onSubmit={handleWithdraw}>
            <div className="input-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to withdraw"
                required
              />
            </div>
            <button type="submit">Withdraw</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
