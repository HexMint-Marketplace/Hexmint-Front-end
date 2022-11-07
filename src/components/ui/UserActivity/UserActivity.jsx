import * as React from "react";
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

function createData(name, calories, fat, carbs, protein, time) {
  return { name, calories, fat, carbs, protein, time };
}

const rows = [
  createData("minted", 159, 6.0, 24, 4.0, 100),
  createData("listed", 237, 9.0, 37, 4.3, 100),
  createData("buyed", 262, 16.0, 24, 6.0, 100),
  createData("transfered", 305, 3.7, 67, 4.3, 100),
  createData("minted", 356, 16.0, 49, 3.9, 100),
];

export default function UserActivity(props) {
  const { walletAddress } = props;

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

  // const getActivitydetails = async (walletAddress) => {
  //   try {
  //     //Get user Activity details by passing the user's wallet address
  //     const Activitydetails = await CustomerServices.getUserActivityDetails(
  //       walletAddress
  //     );
  //     console.log("In get user details", details);

  //     if (details.data.usertype === "Customer") {
  //       const userType = details.data.usertype;
  //       setUserType(userType);

  //       const name = details.data.name;
  //       setName(name);

  //       const userName = details.data.username;
  //       setUserName(userName);

  //       const proPic = details.data.propic;
  //       setProPic(proPic);
  //     } else {
  //       const userType = details.data.usertype;
  //       setUserType(userType);

  //       const name = details.data.name;
  //       setName(name);

  //       const userName = details.data.username;
  //       setUserName(userName);

  //       const proPic = details.data.profilePic;
  //       setProPic(proPic);

  //       const email = details.data.email;
  //       setemail(email);

  //       const DOB = details.data.DOB;
  //       setDOB(DOB);

  //       const mobile = details.data.mobilenumber;
  //       setmobile(mobile);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
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
        <TableHead data-testid="table_head" >
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
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.name === "minted" && (
                <TableCell component="th" scope="row">
                  <CreateIcon />
                  &nbsp;Minted
                </TableCell>
              )}

              {row.name === "listed" && (
                <TableCell component="th" scope="row">
                  <SellIcon />
                  &nbsp;Listed
                </TableCell>
              )}

              {row.name === "buyed" && (
                <TableCell component="th" scope="row">
                  <PaidIcon />
                  &nbsp;Buyed
                </TableCell>
              )}

              {row.name === "transfered" && (
                <TableCell component="th" scope="row">
                  <MoveUpIcon />
                  &nbsp;Transfered
                </TableCell>
              )}

              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
