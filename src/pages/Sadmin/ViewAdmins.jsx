import React from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { Link } from "react-router-dom";
import AdminList from "../../components/ui/AdminList/AdminList";
import "../../styles/viewAdmins.css";

function ViewAdmins() {
  return (
    <div>
      <CommonHeader title={"Admin Details & Management"} />
      <div className="add-btn">
        <button className="btn mint_button d-flex align-items-center gap-2">
          <Link to="/sadmin-addadmin">Add</Link>
        </button>
      </div>
      <AdminList />
    </div>
  );
}

export default ViewAdmins;
