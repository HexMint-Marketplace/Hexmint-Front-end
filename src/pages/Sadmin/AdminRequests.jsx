import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import CommonHeader from "./../../components/ui/CommonHeader/CommonHeader";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/viewAdmins.css";
import "../../styles/superAdmin.css";
import AdminReqPop from "../../components/ui/AdminRequest/AdminReqPop";
import AdminServices from "../../services/AdminServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HeightBox from "./../../components/HeightBox/HeightBox";
import Typography from "@mui/material/Typography";

export const DataContext = React.createContext();
function AdminRequests() {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [requests, setRequests] = useState([]);
  const [data, setData] = useState({});
  const [userid, setUserid] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);

  const handleClickOpenConfirm = (id) => {
    setUserid(id);
    setOpenConfirm(true);
  };

  const handleYes = async (id) => {
    declineRequest(id);
    setOpenConfirm(false);
  };

  const handleNo = async () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    getAdminRequests();
  }, [runUseEffect]);

  const getAdminRequests = async () => {
    setLoader(true);
    try {
      const response = await AdminServices.getAdminRequests();
      if (response.status === 200) {
        setRequests(response.data.data);
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

  const approveRequest = async (id) => {
    setLoader(true);
    try {
      const approve = await AdminServices.approveRequest(id);
      if (approve.status === 200) {
        toast.success(approve.data.message);
        setRunUseEffect(!runUseEffect);
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

  const declineRequest = async (id) => {
    setLoader(true);
    try {
      const approve = await AdminServices.declineRequest(id);
      if (approve.status === 200) {
        toast.success(approve.data.message);
        setRunUseEffect(!runUseEffect);
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

  const handleClickOpen = (id) => {
    const object = requests.find((obj) => obj.userid === id);
    setData(object);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="50px" />
        <CommonHeader title={"Admin Details Change Requests"} />
        <HeightBox height="30px" />

        <Dialog
          open={openConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to decline ?
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

        {open && (
          <AdminReqPop open={open} handleClose={handleClose} data={data} />
        )}

        <TableContainer component={Paper}>
          {requests.length === 0 && (
            <Paper>
              <Typography variant="h5" sx={{ p: 3, textAlign: "center" }}>
                No Requests to display
              </Typography>
            </Paper>
          )}
          {requests.length !== 0 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Wallet Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((row) => (
                  <TableRow
                    hover
                    key={row.userid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.walletaddress}</TableCell>
                    <TableCell>
                      <Button
                        sx={{ ml: 2, mr: 2 }}
                        className="btn btn-primary"
                        onClick={() => handleClickOpen(row.userid)}
                      >
                        <Link to="">View</Link>
                      </Button>
                      <Button
                        sx={{ ml: 2, mr: 2 }}
                        className="btn btn-primary"
                        onClick={() => approveRequest(row.userid)}
                      >
                        <Link to="">Approve</Link>
                      </Button>
                      <Button
                        sx={{ ml: 2, mr: 2 }}
                        className="btn btn-danger"
                        onClick={() => handleClickOpenConfirm(row.userid)}
                      >
                        <Link to="">Decline</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <HeightBox height="100px" />
      </Container>
    );
  }
}

export default AdminRequests;
