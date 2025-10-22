import React from "react";
import { BsBank } from "react-icons/bs";
import { MdSpaceDashboard, MdPayment } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import "../CSS/Sidebar.css"
import { useNavigate } from "react-router-dom";

const Sidebar = ({ className, username }) => {

  const navigate = useNavigate()
  const userName = username;

  const handleDashboard = () => {
    navigate(`/${userName}/dashboard`)
  }

  const handleLogout = () => {
    navigate("/login")
  }

  const handleGit = () => {
    window.open("https://github.com/amitbishnoii/bank-management-system")
  }

  const handleDeposit = () => {
    navigate(`/${username}/deposit`)
  }

  const handleWithdraw = () => {
    navigate(`/${username}/withdraw`)
  }

  const handleTransfer = () => {
    navigate(`/${username}/transfer`)
  }

  return (

    <div className={`sidebar ${className ? className : ""}`}>
      <div className="heading">
        <BsBank className="logo" size={24} color="white" />
        <span>Bank App</span>
      </div>

      <div className="sidebar-buttons">
        <button onClick={handleDashboard}><MdSpaceDashboard size={20} /> Dashboard</button>
        <button onClick={handleTransfer}><FaMoneyBillTransfer size={20} /> Transfer Money</button>
        <button onClick={handleWithdraw}><BiMoneyWithdraw size={20} /> Withdraw</button>
        <button onClick={handleDeposit}><FaMoneyBillTrendUp size={20} /> Deposit</button>
        <button onClick={handleGit}><FaGithub size={20} />Github</button>
        <button onClick={handleLogout}><IoIosLogOut size={20} /> Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
