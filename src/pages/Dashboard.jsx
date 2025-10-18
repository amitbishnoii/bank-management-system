import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { BsBank } from "react-icons/bs";
import { TbTransactionRupee } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setuserData] = useState(null)
  const [Balance, setBalance] = useState(0)
  const [transactions, settransactions] = useState([

  ]);
  const { username } = useParams()


  const getData = async () => {
    let res = await fetch(`http://localhost:3000/user/${username}/dashboard`);
    let r = await res.json()
    setuserData(r.user)
  }
  useEffect(() => {
    getData()
  }, [])

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
          <button onClick={getData}><span>Withdraw</span></button>
          <button><span>Deposit</span></button>
          <button><span>Transfer</span></button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard