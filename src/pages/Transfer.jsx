import React, { useState } from 'react';
import "../CSS/Transfer.css";
import { useParams } from 'react-router-dom';

const Transfer = () => {
    const [accountNumber, setaccountNumber] = useState()
    const [transferAmount, settransferAmount] = useState()
    const { username } = useParams()

    const handleClick = async () => {
        console.log(transferAmount);
        const res = await fetch(`http://localhost:3000/user/${username}/transfer`, {
            method: "POST",
            body: JSON.stringify({ transferAmount, accountNumber }),
            headers: { "Content-Type": "application/json" }
        });
        const r = await res.json();
        console.log(r);
        
    }

    return (
        <div className="transfer-container">
            <div className="transfer-page">
                <div className="transfer-card">
                    <h2>Transfer Money</h2>

                    <div className="input-group">
                        <label htmlFor="accountNumber">Recipient Account Number</label>
                        <input
                            type="text"
                            value={accountNumber}
                            id="accountNumber"
                            placeholder="Enter account number"
                            onChange={e => setaccountNumber(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="amount">Amount to Transfer</label>
                        <input
                            type="number"
                            id="amount"
                            value={transferAmount}
                            onChange={e => settransferAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <button type="submit" onClick={handleClick}>Transfer</button>
                </div>
            </div>
        </div>
    );
};

export default Transfer;
