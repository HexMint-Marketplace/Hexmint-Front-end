import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import SellIcon from "@mui/icons-material/Sell";
import PaidIcon from "@mui/icons-material/Paid";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import CustomerServices from "../../../services/API/CustomerServices";
import Loader from "../Loader/Loader";

export default function UserActivity(props) {
  const { walletaddress } = props;
  const [userActivityDetails, setuserActivityDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  var temp = [];
  // useEffect(() => {
  //   setLoader(true);
  //   getActivitydetails(walletAddress);

  //   setTimeout(() => {
  //     console.log("loader false calling");
  //     setLoader(false);
  //   }, 2000);
  // }, [issubmit]);

  // const toggleisSubmit = () => {
  //   setissubmit(!issubmit);
  // };

  // function createData(Activity, Item, Prize, From, To, Time) {
  //   return { Activity, Item, Prize, From, To, Time };
  // }

  // createData("minted", 159, 6.0, 24, 4.0, 100),
  // createData("listed", 237, 9.0, 37, 4.3, 100),
  // createData("buyed", 262, 16.0, 24, 6.0, 100),
  // createData("transfered", 305, 3.7, 67, 4.3, 100),
  // createData("minted", 356, 16.0, 49, 3.9, 100),

  useEffect(() => {
    setLoader(true);
    getActivitydetails(walletaddress);
  }, []);

  const getActivitydetails = async (walletaddress) => {
    try {
      //Get user activity details by passing the user's wallet address
      const details = await CustomerServices.getUserActivityDetails(
        walletaddress
      );
      // temp = details.data.userActivity;
      setuserActivityDetails(details.data.userActivity);
      console.log("In get user activity details", details);
      console.log(
        "In get user activity details and user activities are",
        details.data.userActivity
      );

      setTimeout(() => {
        console.log("loader false calling");
        setLoader(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  function createData(Activity, Item, Prize, From, To, Time) {
    return { Activity, Item, Prize, From, To, Time };
  }

  const rows = [
    userActivityDetails.map((item) => {
      return createData(
        item.activitytype,
        item.NFTid,
        item.price,
        item.fromwalletaddress,
        item.towalletaddress,
        item.time
      );
    }),
  ];

  return (
    <>
      {loader ? (
        <div>
          <Loader isLoading={loader} />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "white", mt: "100px" }}
        >
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label="simple table"
          >
            <TableHead data-testid="table_head">
              <TableRow sx={{ "&:hover": { color: "white" } }}>
                <TableCell>Activity</TableCell>
                <TableCell align="right">Item</TableCell>
                <TableCell align="right">Prize</TableCell>
                <TableCell align="right">From</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  hover
                  key={row.Activity}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.Activity === "minted" && (
                    <TableCell component="th" scope="row">
                      <CreateIcon />
                      &nbsp;Minted
                    </TableCell>
                  )}

                  {row.Activity === "listed" && (
                    <TableCell component="th" scope="row">
                      <SellIcon />
                      &nbsp;Listed
                    </TableCell>
                  )}

                  {row.Activity === "buyed" && (
                    <TableCell component="th" scope="row">
                      <PaidIcon />
                      &nbsp;Buyed
                    </TableCell>
                  )}

                  {row.Activity === "transfered" && (
                    <TableCell component="th" scope="row">
                      <MoveUpIcon />
                      &nbsp;Transfered
                    </TableCell>
                  )}

                  <TableCell align="right">{row.Item}</TableCell>
                  <TableCell align="right">{row.Prize}</TableCell>
                  <TableCell align="right">{row.From}</TableCell>
                  <TableCell align="right">{row.To}</TableCell>
                  <TableCell align="right">{row.Time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
