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
import ViewReport from "../../components/ui/ReportView/ReportView";
import CustomerServices from "../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";
import { Container } from "reactstrap";
import HeightBox from "../../components/HeightBox/HeightBox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ViewReports() {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [reports, setReports] = useState([]);
  const [data, setData] = useState({});
  const [runUseEffect, setRunUseEffect] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getReports();
  }, [runUseEffect]);

  const getReports = async () => {
    setLoader(true);
    try {
      const response = await CustomerServices.getReports();
      if (response.status === 200) {
        setReports(response.data.data);
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

  const deleteReport = async (id) => {
    setLoader(true);
    try {
      const response = await CustomerServices.deleteReport(id);
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

  const handleClickBlock = (userid) => {
    blockUser(userid);
    deleteReport(userid);
  };

  const handleClickOpen = (id) => {
    const object = reports.find((obj) => obj._id === id);
    setData(object);
    setOpen(true);
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  } else {
    return (
      <Container>
        <HeightBox height="30px" />
        <CommonHeader title={"View User Reports"} />
        <HeightBox height="30px" />
        {open && (
          <ViewReport open={open} handleClose={handleClose} data={data} />
        )}

        <TableContainer data-testid="reports_table" component={Paper}>
          {reports.length === 0 && (
            <Paper>
              <Typography variant="h5" sx={{ p: 3, textAlign: "center" }}>
                No Reports to display
              </Typography>
            </Paper>
          )}
          {reports.length !== 0 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Reported Customer</TableCell>
                  <TableCell>Reporter</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      {row.to.name}
                    </TableCell>
                    <TableCell>{row.from.name}</TableCell>
                    <TableCell>
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleClickOpen(row._id)}
                        sx={{ ml: 2, mr: 2 }}
                      >
                        <Link to="">View</Link>
                      </Button>
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleClickBlock(row.to._id)}
                        sx={{ ml: 2, mr: 2 }}
                      >
                        <Link to="">Block</Link>
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => deleteReport(row.to._id)}
                        sx={{ ml: 2, mr: 2 }}
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

export default ViewReports;
