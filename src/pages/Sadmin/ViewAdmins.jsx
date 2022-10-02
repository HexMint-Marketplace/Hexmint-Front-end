import React, { useState, useEffect } from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/viewAdmins.css";
import SuperAdminNav from "../../components/SideNav/SuperAdmin/SuperAdminNav";
import "../../styles/superAdmin.css";
import AdminServices from "../../services/AdminServices";
import { toast } from "react-toastify";
import moment from "moment";

function ViewAdmins() {
  const [allAdmins, setAllAdmins] = useState([]);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const response = await AdminServices.getAdmins();

      if (response.status === 200) {
        console.log("hi new data........", response.data.data);
        setAllAdmins(response.data.data);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      console.log("Error occur", error);
      toast.error("Error Occured!");
    }
  };

  return (
    <div>
      <div className="side-bar">
        <SuperAdminNav />
      </div>
      <CommonHeader title={"Admin Details & Management"} />
      <div className="add-button">
        <button className="mint_button d-flex align-items-center gap-2">
          <Link to="/sadmin-addadmin">Add</Link>
        </button>
      </div>
      <div>
        <TableContainer className="table" component={Paper}>
          {allAdmins.length === 0 && (
            <div>
              <h5
                style={{ color: "black", textAlign: "center", margin: "10px" }}
              >
                No Admins to display
              </h5>
            </div>
          )}
          {allAdmins.length !== 0 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Wallet Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>DoB</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAdmins.map((row) => (
                  <TableRow
                    key={row.userid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.userid.name}
                    </TableCell>
                    <TableCell>{row.userid.username}</TableCell>
                    <TableCell>{row.userid.walletaddress}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {moment(row.DOB).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row.mobilenumber}</TableCell>
                    <TableCell>
                      <button className="act-button btn btn-danger">
                        <Link to="">Delete</Link>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </div>
  );
}

export default ViewAdmins;
