import React from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { Link } from "react-router-dom";
import { REPORT__DATA } from "../../asssets/data/data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/viewAdmins.css";
import "../../styles/superAdmin.css";
import NormalAdminNav from "../../components/SideNav/NormalAdmin/NormalAdminNav";

function ViewReports() {
  return (
    <div>
      <div className="side-bar">
        <NormalAdminNav />
      </div>
      <CommonHeader title={"View User Reports"} />
      <div>
        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Reporter</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {REPORT__DATA.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.user}
                  </TableCell>
                  <TableCell>{row.reason}</TableCell>
                  <TableCell>{row.reporter}</TableCell>
                  <TableCell>
                    <button className="act-button btn btn-primary">
                      <Link to="">View</Link>
                    </button>
                    <button className="act-button btn btn-primary">
                      <Link to="">Block</Link>
                    </button>
                    <button className="act-button btn btn-danger">
                      <Link to="">Delete</Link>
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

export default ViewReports;
