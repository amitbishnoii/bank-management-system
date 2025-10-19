import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Deposit.css";
import { useParams } from "react-router-dom";

const DepositPage = () => {
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState("");
    const { username } = useParams()

    useEffect(() => {
        async function fetchdata() {
            const res = await fetch(`http://localhost:3000/user/${username}/`)
            const r = await res.json();
            setBalance(r.user.balance);
        }
        fetchdata()
    }, []);

    const handleDeposit = async () => {
        const res = await fetch(`http://localhost:3000/user/${username}/deposit/`, {
            method: "POST",
            body: JSON.stringify({amount}),
            headers: { "Content-Type": "application/json" }
        })
        const r = await res.json();
        setBalance(r.current_balance);
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
