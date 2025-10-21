import React, { useEffect, useState } from 'react'
import "../CSS/Dashboard.css"
import { useNavigate, useParams } from 'react-router-dom';
import { format } from "date-fns"

const Dashboard = () => {
  const [userData, setuserData] = useState(null)
  const [transactions, settransactions] = useState([

  ]);
  const { username } = useParams()
  const navigate = useNavigate()

  const getData = async () => {
    let res = await fetch(`http://localhost:3000/user/${username}/dashboard`);
    let r = await res.json()
    setuserData(r.user)
  }

  const getTransactions = async () => {
    const res = await fetch(`http://localhost:3000/user/${username}/transactions`);
    const r = await res.json();
    settransactions(r.transactions)
  } 

  useEffect(() => {
    getData()
    getTransactions()
  }, [])

  return (
  <div className="dashboard">
    <div className="main">
      <h2>HELLO, {userData ? userData.firstName.toUpperCase() + " " + userData.lastName.toUpperCase() : "Loading..."}</h2>
      <div className="card-container">
        <div className="card balance">
          {userData ? `₹${userData.balance}` : "Loading..."}
          <p>Balance</p>
        </div>
        <div className="card acc-num">
          {userData ? `${userData.accountNumber}` : "Loading..."}
          <p>Account Number</p>
        </div>
        <div className="card date-joined">
          {userData ? new Date(userData.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }) : "Loading..."}
          <p>Date Joined</p>
        </div>
      </div>
      <div className="transaction-table">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Info</th>
              <th>Amount (₹)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td
                  style={{
                    color:
                      tx.type === "deposit"
                        ? "#22c55e"
                        : tx.type === "withdraw"
                          ? "#ef4444"
                          : "#60a5fa",
                  }}>
                  {tx.type}
                </td>
                <td>{tx.recipient}</td>
                <td>₹{tx.amount}</td>
                <td>{format(new Date(tx.date), "dd MMM yyyy, hh:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
}

export default Dashboard