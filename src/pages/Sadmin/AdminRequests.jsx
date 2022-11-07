import React, { useState } from "react";
import CommonHeader from "./../../components/ui/CommonHeader/CommonHeader";
import { Link } from "react-router-dom";
import { REQUEST__DATA } from "../../asssets/data/data";
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
import AdminReqPop from "../../components/ui/AdminRequest/AdminReqPop";

function AdminRequests() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="side-bar">
        <SuperAdminNav />
      </div>
      <CommonHeader title={"Admin Details Change Requests"} />
      <div>

        <div>
          <AdminReqPop open={open} handleClose={handleClose} />
        </div>
        <TableContainer className="table" component={Paper}>

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Wallet Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {REQUEST__DATA.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.user}
                  </TableCell>
                  <TableCell>{row.walletAddress}</TableCell>
                  <TableCell>
                    <button
                      className="act-button btn btn-primary"
                      onClick={handleClickOpen}
                    >
                      <Link to="">View</Link>
                    </button>
                    <button className="act-button btn btn-primary">
                      <Link to="">Approve</Link>
                    </button>
                    <button className="act-button btn btn-danger">
                      <Link to="">Decline</Link>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminRequests;
