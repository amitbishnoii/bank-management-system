import React, { useState } from 'react';
import "../CSS/Admin.css"
import { format } from 'date-fns';

const Admin = () => {
    const [inputuser, setinputuser] = useState()
    const [user, setuser] = useState();
    const [transaction, settransaction] = useState([

    ])

    const handleSubmit = () => {
        setuser(inputuser);
        console.log(user);
    }


    return (
        <div className="admin-container">

            <div className="admin-main">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                </header>
            </div>

            <div className="card-container">
                <div className="login-card">
                    {format(new Date(), "dd MMM yyyy, hh:mm:ss a")}
                </div>
            </div>

            <div className="user-search">
                <input value={user} type="text" placeholder='Enter Username' onChange={(e) => setinputuser(e.target.value)} />
                <button onClick={handleSubmit}>Search</button>
            </div>

            {user ? (<div className="user-info">
                <h3>{user}'s Info</h3>
                <div className="transactions-table">
                    <h2>{user}'s Transactions</h2>
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
                            {transaction.map((tx) => {
                                <tr>
                                    <td style={{
                                        color: tx.type === "deposit" ? "green" : tx.type === "withdraw" ? "red" : "light-blue"
                                    }}
                                    >{tx.type}</td>
                                    <td>{tx.recipient}</td>
                                    <td>{tx.amount}</td>
                                    <td>{format(new Date(tx.date), "dd MMM yyyy, hh:mm a")}</td>
                                </tr>
                            })}
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
