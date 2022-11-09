import React, { useState, useEffect } from "react";
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
import CustomerServices from "../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";

function ViewUsers() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    setLoader(true);

    try {
      const response = await CustomerServices.getCustomers();

      if (response.status === 200) {
        console.log("hi new data........", response);
        setAllCustomers(response.data.data);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      console.log("Error occur", error);
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <div>
        <div className="side-bar">
          <NormalAdminNav />
        </div>
        <div className="section">
          <TableContainer className="table" component={Paper}>
            {allCustomers.length === 0 && (
              <div>
                <h5
                  style={{
                    color: "black",
                    textAlign: "center",
                    margin: "10px",
                  }}
                >
                  No Customers to display
                </h5>
              </div>
            )}
            {allCustomers.length !== 0 && (
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Wallet Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCustomers.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.username}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.walletaddress}</TableCell>
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
}

export default ViewUsers;
