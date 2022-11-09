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
import "../../styles/viewAdmins.css";
import "../../styles/superAdmin.css";
import NormalAdminNav from "../../components/SideNav/NormalAdmin/NormalAdminNav";
import ViewReport from "../../components/ui/ReportView/ReportView";
import CustomerServices from "../../services/API/CustomerServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";

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
        console.log(response.data.data);
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

  const handleClickBlock = (userid, reportid) => {
    blockUser(userid);
    deleteReport(reportid);
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
      <div>
        <div className="side-bar">
          <NormalAdminNav />
        </div>
        <CommonHeader title={"View User Reports"} />
        <div>
          {open && (
            <ViewReport open={open} handleClose={handleClose} data={data} />
          )}
        </div>
        <div>
          <TableContainer
            data-testid="reports_table"
            className="table"
            component={Paper}
          >
            {reports.length === 0 && (
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
                    >
                      <TableCell component="th" scope="row">
                        {row.to.name}
                      </TableCell>
                      <TableCell>{row.from.name}</TableCell>
                      <TableCell>
                        <button
                          className="act-button btn btn-primary"
                          onClick={() => handleClickOpen(row._id)}
                        >
                          <Link to="">View</Link>
                        </button>
                        <button
                          className="act-button btn btn-primary"
                          onClick={() => handleClickBlock(row.to._id, row._id)}
                        >
                          <Link to="">Block</Link>
                        </button>
                        <button
                          className="act-button btn btn-danger"
                          onClick={() => deleteReport(row._id)}
                        >
                          <Link to="">Delete</Link>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            ;
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default ViewReports;
