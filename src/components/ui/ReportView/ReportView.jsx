import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
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
                  <TableCell>Reported Customer Wallet Address</TableCell>
                  <TableCell align="left">543873834753534853437</TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell>Reporter Wallet Address</TableCell>
                  <TableCell align="left">5438738565464534853437</TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                <TableRow>
                  <TableCell>Reason for Report</TableCell>
                  <TableCell align="left">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Veniam adipisci cupiditate officia
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* {props.data.new.mobilenumber
                      ? props.data.new.mobilenumber
                      : "Null"} */}
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
