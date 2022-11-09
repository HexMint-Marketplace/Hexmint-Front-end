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
import NormalAdminNav from "../../components/SideNav/NormalAdmin/NormalAdminNav";
import CustomerServices from "../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";
// import SearchBar from "material-ui-search-bar";
//check this link for search bar

function ViewUsers() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);

  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState(allCustomers);
  const requestSearch = (searchedVal) => {
    const filteredRows = allCustomers.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

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
      console.log("response", response.data.data);
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
        <CommonHeader title={"Customer Details & Management"} />
        <div className="section">
          <Paper>
            {/* <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            /> */}
            <TableContainer className="table" component={Paper}>
              {rows.length === 0 && (
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
              {rows.length !== 0 && (
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
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.username}</TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.walletaddress}</TableCell>
                        <TableCell>
                          <button
                            className="act-button btn btn-danger"
                            onClick={() => {
                              blockUser(row._id);
                            }}
                          >
                            <Link to="">Block</Link>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Paper>
        </div>
      </div>
    );
  }
}

export default ViewUsers;
