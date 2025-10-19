import React from "react";
import { BsBank } from "react-icons/bs";
import { MdSpaceDashboard, MdPayment } from "react-icons/md";
import { TbTransactionRupee } from "react-icons/tb";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import "./Sidebar.css"

const Sidebar = ({className}) => {

  return (

    <div className={`sidebar ${className ? className : ""}`}>
      <div className="heading">
        <BsBank className="logo" size={24} color="white" />
        <span>Bank App</span>
      </div>

      <div className="sidebar-buttons">
        <button><MdSpaceDashboard size={20} /> Dashboard</button>
        <button><TbTransactionRupee size={20} /> Transaction</button>
        <button><MdPayment size={20} /> Payments</button>
        <button><IoMdSettings size={20} /> Settings</button>
        <button><IoIosLogOut size={20} /> Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
