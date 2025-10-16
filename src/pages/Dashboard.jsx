import React from 'react'
import "./Dashboard.css"
import { BsBank } from "react-icons/bs";
import { TbTransactionRupee } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="heading">
          <BsBank className='logo' color='white' size={"24px"}/>
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
            1212
          </div>
          <div className="card acc-num">
            1212
          </div>
          <div className="card date-joined">
            1212
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard