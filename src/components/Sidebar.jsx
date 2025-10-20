import React from "react";
import { BsBank } from "react-icons/bs";
import { MdSpaceDashboard, MdPayment } from "react-icons/md";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import "../CSS/Sidebar.css"
import { useNavigate } from "react-router-dom";

const Sidebar = ({className, username}) => {

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

  return (

    <div className={`sidebar ${className ? className : ""}`}>
      <div className="heading">
        <BsBank className="logo" size={24} color="white" />
        <span>Bank App</span>
      </div>

      <div className="sidebar-buttons">
        <button onClick={handleDashboard}><MdSpaceDashboard size={20} /> Dashboard</button>
        <button><MdPayment size={20} /> Payments</button>
        <button onClick={handleGit}><FaGithub size={20} />Github</button>
        <button onClick={handleLogout}><IoIosLogOut size={20} /> Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
