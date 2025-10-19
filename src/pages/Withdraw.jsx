import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Withdraw.css";
import { useParams } from "react-router-dom";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const { username } = useParams()

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/user/${username}/withdraw/`, {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: { "Content-Type": "application/json" }
    });
    // const r = await res.json();
    alert(`Withdraw request for ₹${amount} submitted!`);
    setAmount("");
  };

  return (
    <div className="withdraw-container">
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
            <button className="submit-button" type="submit">Withdraw</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
