import { makeStyles } from "@mui/styles";
import { SPACING } from "../../constants/styleGuide";
import { PRIMARY_PURPLE } from "../../constants/colors";
import { PROJECT_TITLE } from "../../constants/constants";
import { useEffect } from "react";
import { getService, deleteService } from "../../axios/axios";
import { setUserData } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// MUI Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

// MUI Components
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const useStyles = makeStyles({
  projectTitle: {
    color: PRIMARY_PURPLE,
    fontSize: SPACING.s24,
  },
});

const Home = () => {
  const rows = [];
  const classes = useStyles();
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.user.userData);

  allUsers.map((item, idx) => {
    rows.push({
      title: item.title,
      author: item.author,
      id: item.id,
    });
  });

  const deleteUser = (id) => {
    deleteService("USER_SERVICE", `/users/${id}`)
      .then((res) => {
        getAllUsers();
      })
      .catch((err) => {
        console.log("deleted fail");
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
      <p className={classes.projectTitle}>{PROJECT_TITLE}</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell align="right">
                  <ButtonGroup variant="" aria-label=" button group">
                    <Button onClick={(e) => deleteUser(item.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                    <Button>
                      <EditOutlinedIcon />
                    </Button>
                    <Button>
                      {true ? (
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
    </>
  );
};

export default Home;
