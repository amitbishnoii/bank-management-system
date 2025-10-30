import React, { useState } from "react";
import "../CSS/Withdraw.css";
import { useParams } from "react-router-dom";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [error, seterror] = useState(null)
  const { username } = useParams()

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/user/${username}/withdraw/`, {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: { "Content-Type": "application/json" }
    });
    const r = await res.json();
    seterror(r.message);
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
              {error && <p className="error-message">{error}</p>}
            </div>
            <button className="submit-button" type="submit">Withdraw</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
