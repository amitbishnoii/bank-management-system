import React from "react";
import "./Sidebar.css"
import { BsBank } from "react-icons/bs";
import { MdSpaceDashboard, MdPayment } from "react-icons/md";
import { TbTransactionRupee } from "react-icons/tb";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="heading">
        <BsBank className='logo' color='white' size={"24px"} />
        <span>Bank App</span>
      </div>
      <div className="sidebar-buttons">
        <button>
          <MdSpaceDashboard className='button-icon' color='white' size={"20px"} />
          Dashboard
        </button>
        <button>
          <TbTransactionRupee className='button-icon' color='white' size={"20px"} />
          Transaction
        </button>
        <button>
          <MdPayment className='button-icon' color='white' size={"20px"} />
          Payments
        </button>
        <button>
          <IoMdSettings className='button-icon' color='white' size={"20px"} />
          Settings
        </button>
        <button>
          <IoIosLogOut className='button-icon' color='white' size={"20px"} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
