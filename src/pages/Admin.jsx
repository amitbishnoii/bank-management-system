import React, { useRef, useState } from 'react';
import "../CSS/Admin.css"
import { format } from 'date-fns';

const Admin = () => {
    const [inputuser, setinputuser] = useState()
    const [user, setuser] = useState();
    const [transaction, settransaction] = useState([

    ])

    const LoginTime = useRef(format(new Date(), "dd MMM yyyy, hh:mm:ss a"))

    const handleSubmit = async () => {
        setuser(inputuser);
        const res = await fetch(`http://localhost:3000/user/admin/info/${inputuser}`)
        const r = await res.json()
        const { transactions, ...userInfo } = r.userInfo
        settransaction(transactions)
        console.log("trans: ", transactions)
        console.log("info ", userInfo);
        setuser(userInfo)
        console.log(transaction);
    }

    return (
        <div className="admin-container">

            <div className="admin-main">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <span>Login time: {LoginTime.current}</span>
                </header>
            </div>

            <div className="search-bar">
                <input value={inputuser} type="text" placeholder='Enter Username' onChange={(e) => setinputuser(e.target.value)} />
                <button onClick={handleSubmit}>Search</button>
            </div>

            {user ? (<div className="user-info">
                <h3>{user.username}'s Info</h3>
                <div className="info">
                    <p>First Name: {user.firstName}</p>
                </div>
                <div className="transactions-table">
                    <h2>{user.username}'s Transactions</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Info</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction && transaction.length > 0 ? (
                                transaction.map((tx) => (
                                    <tr key={tx._id}>
                                        <td
                                            style={{
                                                color:
                                                    tx.type === "deposit"
                                                        ? "green"
                                                        : tx.type === "withdraw"
                                                            ? "red"
                                                            : "lightblue",
                                            }}>
                                            {tx.type}
                                        </td>
                                        <td>{tx.recipient}</td>
                                        <td>{tx.amount}</td>
                                        <td>{format(new Date(tx.date), "dd MMM yyyy, hh:mm a")}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: "center" }}>
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>) : (
                <p>Search for users to get details</p>
            )

            }
        </div>
    );
};

export default Admin;
