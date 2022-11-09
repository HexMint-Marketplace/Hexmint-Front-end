import React, { useState, useEffect } from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import { Link } from "react-router-dom";
import { REPORT__DATA } from "../../asssets/data/data";
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
import AdminServices from "../../services/AdminServices";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader/Loader";

function ViewReports() {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [requests, setRequests] = useState([]);
  const [data, setData] = useState({});
  const [runUseEffect, setRunUseEffect] = useState(false);

  const handleClose = () => {
    setOpen(false);
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

  const handleClickOpen = (id) => {
    const object = requests.find((obj) => obj.userid === id);
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Reported Customer</TableCell>
                  <TableCell>Reporter</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {REPORT__DATA.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.user}
                    </TableCell>
                    <TableCell>{row.reporter}</TableCell>
                    <TableCell>
                      <button
                        className="act-button btn btn-primary"
                        onClick={() => handleClickOpen()}
                      >
                        <Link to="">View</Link>
                      </button>
                      <button className="act-button btn btn-primary">
                        <Link to="">Block</Link>
                      </button>
                      <button className="act-button btn btn-danger">
                        <Link to="">Delete</Link>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default ViewReports;
