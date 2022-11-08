import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function AdminReqPop(props) {
  return (
    <Dialog
      sx={{ pt: 10 }}
      open={props.open}
      aria-labelledby="draggable-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperComponent={PaperComponent}
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {"Changes"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell align="left">Old</TableCell>
                  <TableCell align="left">New</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    Profile Picture
                  </TableCell>
                  <TableCell align="left">
                    {props.data.exist.propic ? props.data.exist.propic : "Null"}
                  </TableCell>
                  <TableCell align="left">
                    {props.data.new.propic ? props.data.new.propic : "Null"}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                  <TableCell align="left">
                    {props.data.exist.email ? props.data.exist.email : "Null"}
                  </TableCell>
                  <TableCell align="left">
                    {props.data.new.email ? props.data.new.email : "Null"}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    Number
                  </TableCell>
                  <TableCell align="left">
                    {props.data.exist.mobilenumber
                      ? props.data.exist.mobilenumber
                      : "Null"}
                  </TableCell>
                  <TableCell align="left">
                    {props.data.new.mobilenumber
                      ? props.data.new.mobilenumber
                      : "Null"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminReqPop;
