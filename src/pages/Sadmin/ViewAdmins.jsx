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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Container } from "reactstrap";
import "../../styles/viewAdmins.css";
import "../../styles/superAdmin.css";
import AdminServices from "../../services/AdminServices";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../components/ui/Loader/Loader";
import HeightBox from "./../../components/HeightBox/HeightBox";
import Typography from "@mui/material/Typography";

function ViewAdmins() {
  const [allAdmins, setAllAdmins] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [userid, setUserid] = useState();

  const handleClickOpen = (id) => {
    setUserid(id);
    setOpen(true);
  };

  const handleYes = async (id) => {
    handleDelete(id);
    setOpen(false);
  };

  const handleNo = async () => {
    setOpen(false);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    setLoader(true);
    try {
      const response = await AdminServices.getAdmins();

      if (response.status === 200) {
        setAllAdmins(response.data.data);
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

  const handleDelete = async (id) => {
    setLoader(true);
    try {
      const response = await AdminServices.deleteAdmin(id);
      toast.success(response.data.message);
      if (response.status === 200) {
      } else {
        toast.error("Error Occured!");
      }
    } catch (error) {
      toast.error("Error Occured!");
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
    getAdmins();
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="20px" />
        <CommonHeader title={"Admin Details & Management"} />
        <HeightBox height="20px" />
        <Button className="btn">
          <Link to="/sadmin-addadmin">Add</Link>
        </Button>
        <HeightBox height="20px" />
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this admin ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleYes(userid);
              }}
            >
              Yes
            </Button>
            <Button onClick={handleNo} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          {allAdmins.length === 0 && (
            <Paper>
              <Typography variant="h5" sx={{ p: 3, textAlign: "center" }}>
                No Admins to display
              </Typography>
            </Paper>
          )}
          {allAdmins.length !== 0 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Admin Name</TableCell>
                  <TableCell>Wallet Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>DoB</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAdmins.map((row) => (
                  <TableRow
                    key={row.userid}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.userid.name}
                    </TableCell>
                    <TableCell>{row.userid.username}</TableCell>
                    <TableCell>{row.userid.walletaddress}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {moment(row.DOB).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row.mobilenumber}</TableCell>
                    <TableCell>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          handleClickOpen(row.userid._id);
                        }} //handleDelete(row.userid._id);
                      >
                        <Link to="">Delete</Link>
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

export default ViewAdmins;
