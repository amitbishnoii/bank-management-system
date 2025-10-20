import React from "react";
import { BsBank } from "react-icons/bs";
import { MdSpaceDashboard, MdPayment } from "react-icons/md";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import "../CSS/Sidebar.css"
import { useNavigate } from "react-router-dom";

const Sidebar = ({className}) => {

  return (

    <div className={`sidebar ${className ? className : ""}`}>
      <div className="heading">
        <BsBank className="logo" size={24} color="white" />
        <span>Bank App</span>
      </div>

      <div className="sidebar-buttons">
        <button><MdSpaceDashboard size={20} /> Dashboard</button>
        <button><MdPayment size={20} /> Payments</button>
        <button><FaGithub size={20} /><a href="https://github.com/amitbishnoii/bank-management-system"></a>Github</button>
        <button><IoIosLogOut size={20} /> Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
