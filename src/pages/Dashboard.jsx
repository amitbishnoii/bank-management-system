import React from 'react'
import "./Dashboard.css"
import { BsBank } from "react-icons/bs";
import { TbTransactionRupee } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

const Dashboard = () => {
  const user = {
    name: "Amit Bishnoi",
    accountNumber: "1234567890",
    balance: 12500,
    memberSince: "2023-05-14",
  };

  const transactions = [
    { id: 1, type: "Deposit", amount: 2000, date: "2025-10-10" },
    { id: 2, type: "Withdraw", amount: 500, date: "2025-10-12" },
    { id: 3, type: "Transfer", amount: 1000, date: "2025-10-13" },
  ];

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="heading">
          <BsBank className='logo' color='white' size={"24px"} />
          <span>Bank App</span>
        </div>
        <div className="sidebar-buttons">
          <button><MdSpaceDashboard className='button-icon' color='white' size={"20px"} />Dashboard</button>
          <button><TbTransactionRupee className='button-icon' color='white' size={"20px"} />Transaction</button>
          <button><MdPayment className='button-icon' color='white' size={"20px"} />Payments</button>
          <button><IoMdSettings className='button-icon' color='white' size={"20px"} />Settings</button>
          <button><IoIosLogOut className='button-icon' color='white' size={"20px"} />Logout</button>
        </div>
      </div>
      <div className="main">
        <h2>Dashboard</h2>
        <div className="card-container">
          <div className="card balance">
            ₹{user.balance}
            <p>Balance</p>
          </div>
          <div className="card acc-num">
            {user.accountNumber}
            <p>Account Number</p>
          </div>
          <div className="card date-joined">
            {user.memberSince}
            <p>Date Joined</p>
          </div>
        </div>
        <div className="transaction-table">
          <h3>Recent Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th>
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
                        tx.type === "Deposit"
                          ? "#22c55e"
                          : tx.type === "Withdraw"
                            ? "#ef4444"
                            : "#60a5fa",
                    }}>
                    {tx.type}
                  </td>
                  <td>₹{tx.amount}</td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="action-buttons">
          <button><span>Withdraw</span></button>
          <button><span>Deposit</span></button>
          <button><span>Transfer</span></button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard