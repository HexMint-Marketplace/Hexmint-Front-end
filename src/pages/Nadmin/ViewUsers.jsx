import React from "react";
import { USER__DATA } from "../../asssets/data/data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/viewUsers.css";
import "../../styles/superAdmin.css";
import NormalAdminNav from "../../components/SideNav/NormalAdmin/NormalAdminNav";

function ViewUsers() {
  return (
    <div>
      <div className="side-bar">
        <NormalAdminNav />
      </div>
      <div className="section">
        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Wallet Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {USER__DATA.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.user}
                  </TableCell>
                  <TableCell>{row.walletAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ViewUsers;
