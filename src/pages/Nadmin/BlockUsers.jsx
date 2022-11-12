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

function ViewUsers() {
  const [blkCustormers, setBlkCustomers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);

  const unBlockUser = async (id) => {
    setLoader(true);
    try {
      const response = await CustomerServices.unBlockUser(id);
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

  const getBlockedCustomers = async () => {
    setLoader(true);

    try {
      const response = await CustomerServices.getBlockedCustomers();
      console.log("response", response.data.data);
      if (response.status === 200) {
        console.log("hi new data........", response);
        setBlkCustomers(response.data.data);
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

  useEffect(() => {
    getBlockedCustomers();
  }, [runUseEffect]);

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="30px" />
        <CommonHeader title={"Blocked Customers Details"} />
        <HeightBox height={"30px"} />
        <TableContainer component={Paper}>
          {blkCustormers.length === 0 && (
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
          {blkCustormers.length !== 0 && (
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
                {blkCustormers.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell>{row.username}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.walletaddress}</TableCell>
                    <TableCell>
                      <Button
                        className="btn btn-danger"
                        onClick={() => unBlockUser(row._id)}
                      >
                        <Link to="">Unblock</Link>
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
