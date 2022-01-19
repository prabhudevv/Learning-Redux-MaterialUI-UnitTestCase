import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { SPACING } from "../../constants/styleGuide";
import { WHITE } from "../../constants/colors";
import {
  NO_RECORDS,
  DELETE_CONFIRM_MESSAGE,
  STATUS_CONFIRM_MESSAGE,
  YES,
  NO,
  TITLE,
  AUTHOR,
  ACTIONS,
} from "../../constants/constants";
import { getService, deleteService, putService } from "../../axios/axios";
import { setUserData } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// MUI Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

// MUI Components
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

const useStyles = makeStyles({
  modalStyle: {
    top: "50%",
    left: "50%",
    width: "500px",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    boxShadow: SPACING.s24,
    background: WHITE,
    padding: SPACING.s16,
  },
  buttonContainer: {
    position: "relative",
    float: "right",
  },
  modalBtn: {
    margin: "0rem 5px",
  },
});

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalId, setModalId] = useState("");
  const [modalType, setModalType] = useState("");
  const [modalIdx, setModalIdx] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = (id, idx, type) => {
    setModalId(id);
    setModalType(type);
    setModalIdx(idx);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const allUsers = useSelector((state) => state.user.userData);

  const deleteUser = (id) => {
    deleteService("USER_SERVICE", `/users/${id}`)
      .then((res) => {
        handleClose();
        alert("success", "Successfully deleted user");
        getAllUsers();
      })
      .catch((err) => {
        console.log("deleted fail");
      });
  };

  const editUser = (id) => {
    navigate(`/adduser/${id}`);
  };

  const statusUpdate = (id, idx) => {
    debugger;
    const statusUpdateReq = {
      title: allUsers[idx].title,
      author: allUsers[idx].author,
      isActive: !allUsers[idx].isActive,
    };
    putService("USER_SERVICE", `/users/${id}`, statusUpdateReq)
      .then((res) => {
        handleClose();
        alert("success", "Successfully changed status");
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUsers = () => {
    getService("USER_SERVICE", "/users")
      .then((res) => {
        dispatch(setUserData(res.data));
      })
      .catch((err) => {
        dispatch(setUserData(err));
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {allUsers.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>{TITLE}</TableCell>
                <TableCell>{AUTHOR}</TableCell>
                <TableCell align="right">{ACTIONS}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="" aria-label=" button group">
                      <Button
                        onClick={(e) => handleOpen(item.id, idx, "delete")}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                      <Button onClick={(e) => editUser(item.id)}>
                        <EditOutlinedIcon />
                      </Button>
                      <Button
                        onClick={(e) => handleOpen(item.id, idx, "status")}
                      >
                        {item.isActive ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <BlockOutlinedIcon />
                        )}
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h5>{NO_RECORDS}</h5>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalType === "delete"
              ? DELETE_CONFIRM_MESSAGE
              : STATUS_CONFIRM_MESSAGE}
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              size="small"
              className={classes.modalBtn}
              onClick={(e) =>
                modalType === "delete"
                  ? deleteUser(modalId)
                  : statusUpdate(modalId, modalIdx)
              }
            >
              {YES}
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.modalBtn}
              onClick={handleClose}
            >
              {NO}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
