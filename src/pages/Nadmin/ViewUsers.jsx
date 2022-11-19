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
import "../../styles/viewUsers.css";
import "../../styles/superAdmin.css";
import CustomerServices from "../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";
import Button from "@mui/material/Button";
import { Container } from "reactstrap";
import HeightBox from "./../../components/HeightBox/HeightBox";
import Typography from "@mui/material/Typography";

function ViewUsers() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);

  useEffect(() => {
    getCustomers();
  }, [runUseEffect]);

  const blockUser = async (id) => {
    setLoader(true);
    try {
      const response = await CustomerServices.blockUser(id);
      if (response.status === 200) {
        toast.success(response.data.message);
        setRunUseEffect(!runUseEffect);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  const getCustomers = async () => {
    setLoader(true);

    try {
      const response = await CustomerServices.getCustomers();
      if (response.status === 200) {
        setAllCustomers(response.data.data);
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
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
      <Container>
        <HeightBox height="30px" />
        <CommonHeader title={"Customer Details & Management"} />
        <HeightBox height="30px" />
        <TableContainer component={Paper}>
          {allCustomers.length === 0 && (
            <Paper>
              <Typography variant="h5" sx={{ p: 3, textAlign: "center" }}>
                No Customers to display
              </Typography>
            </Paper>
          )}
          {allCustomers.length !== 0 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Wallet Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCustomers.map((row) => (
                  <TableRow
                    hover
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.username}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.walletaddress}</TableCell>
                    <TableCell>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          blockUser(row._id);
                        }}
                      >
                        <Link to="">Block</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <HeightBox height="50px" />
      </Container>
    );
  }
}

export default ViewUsers;
