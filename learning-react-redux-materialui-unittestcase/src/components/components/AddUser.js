import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  setInputValue,
  resetUserData,
  setUserDetail,
} from "../../store/actions/userActions";
import { postService, getService, putService } from "../../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import { INVALID_USERID } from "../../constants/constants";

const AddUser = () => {
  let { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValidId, setIsValidId] = useState(true);

  const newUserData = useSelector((state) => state.user.newUserData);
  const { title, author } = newUserData;

  const onInputChange = (name, value) => {
    dispatch(setInputValue(name, value));
  };

  const handleSubmit = () => {
    postService("USER_SERVICE", "/users", newUserData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    putService("USER_SERVICE", `/users/${userId}`, newUserData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserDetail = () => {
    getService("USER_SERVICE", `/users/${userId}`)
      .then((res) => {
        dispatch(setUserDetail(res.data));
      })
      .catch((err) => {
        setIsValidId(false);
      });
  };

  useEffect(() => {
    if (userId === "0") {
      dispatch(resetUserData());
    } else {
      getUserDetail();
    }
  }, []);

  return (
    <>
      {isValidId ? (
        <Grid container spacing={1}>
          <Grid item xs={2} md={2}>
            <TextField
              id="outlined-basic"
              name="title"
              value={title}
              label="Title"
              variant="outlined"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <TextField
              id="outlined-basic"
              name="author"
              value={author}
              label="Author"
              variant="outlined"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <Button
              variant="contained"
              size="large"
              onClick={(e) =>
                userId === "0" ? handleSubmit() : handleUpdate()
              }
            >
              {userId === "0" ? "Submit" : "Update"}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <h5>{INVALID_USERID}</h5>
      )}
    </>
  );
};

export default AddUser;
