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
import UserActivities from "./../../../pages/UserActivities";
import { Link } from "react-router-dom";
import moment from "moment";
moment().format();

export default function UserActivity(props) {
  const walletaddress = props.walletaddress;
  const [userActivityDetails, setuserActivityDetails] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log(
      ".................THIS IS FOR CHECK COMPONENT USE EFFECT...................."
    );
    getActivitydetails(walletaddress);
  }, []);

  const getActivitydetails = async (walletaddress) => {
    console.log("getActivitydetails calling");
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

  return (
    <>
      {loader ? (
        <div>
          <Loader isLoading={loader} />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Activity</TableCell>
                <TableCell align="right">Item</TableCell>
                <TableCell align="right">Prize</TableCell>
                <TableCell align="right">From</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userActivityDetails.map((row) => (
                <TableRow
                  hover
                  key={row.NFTid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.activitytype === "minted" && (
                    <TableCell component="th" scope="row">
                      <CreateIcon />
                      &nbsp;Minted
                    </TableCell>
                  )}

                  {row.activitytype === "listed" && (
                    <TableCell component="th" scope="row">
                      <SellIcon />
                      &nbsp;Listed
                    </TableCell>
                  )}

                  {row.activitytype === "bought" && (
                    <TableCell component="th" scope="row">
                      <PaidIcon />
                      &nbsp;Bought
                    </TableCell>
                  )}

                  {row.activitytype === "transferred" && (
                    <TableCell component="th" scope="row">
                      <MoveUpIcon />
                      &nbsp;Transferred
                    </TableCell>
                  )}

                  {row.activitytype === "bade" && (
                    <TableCell component="th" scope="row">
                      <PaidIcon />
                      &nbsp;Bade
                    </TableCell>
                  )}

                  <TableCell align="right">{row.NFTid}</TableCell>
                  <TableCell align="right">{row.price} ETH</TableCell>
                  <TableCell align="right">{row.fromwalletaddress}</TableCell>
                  <TableCell align="right">{row.towalletaddress}</TableCell>
                  <TableCell align="right">
                    <a
                      href={`https://goerli.etherscan.io/tx/${row.transactionhash}`}
                      target="_blank"
                    >
                      {moment(row.time).fromNow()}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
