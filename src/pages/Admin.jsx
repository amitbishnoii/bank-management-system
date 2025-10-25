import React, { useRef, useState } from 'react';
import "../CSS/Admin.css"
import { format } from 'date-fns';

const Admin = () => {
    const [inputuser, setinputuser] = useState()
    const [user, setuser] = useState();
    const [transaction, settransaction] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const res = await fetch(`http://localhost:3000/user/admin/${user.username}/edit`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const r = await res.json();
        console.log(r);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ ...user });
        setIsEditing(false);
    };

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
                    <p>
                        <strong>Username:</strong>{' '}
                        {isEditing ? (
                            <input name="username" value={formData.username} onChange={handleChange} />
                        ) : (
                            <span>{user.username}</span>
                        )}
                    </p>

                    <p>
                        <strong>First Name:</strong>{' '}
                        {isEditing ? (
                            <input name="firstName" value={formData.firstName} onChange={handleChange} />
                        ) : (
                            <span>{user.firstName}</span>
                        )}
                    </p>

                    <p>
                        <strong>Last Name:</strong>{' '}
                        {isEditing ? (
                            <input name="lastName" value={formData.lastName} onChange={handleChange} />
                        ) : (
                            <span>{user.lastName}</span>
                        )}
                    </p>

                    <p>
                        <strong>Email:</strong>{' '}
                        {isEditing ? (
                            <input name="email" value={formData.email} onChange={handleChange} />
                        ) : (
                            <span>{user.email}</span>
                        )}
                    </p>

                    <p>
                        <strong>Account Number:</strong> <span>{user.accountNumber}</span>
                    </p>

                    <div className="info-actions">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="action-btn edit">Save</button>
                                <button onClick={handleCancel} className="action-btn reset">Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="action-btn edit">Edit User</button>
                                <button className="action-btn reset">Reset Password</button>
                                <button className="action-btn block">Block Account</button>
                                <button className="action-btn delete">Delete Account</button>
                            </>
                        )}
                    </div>
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
