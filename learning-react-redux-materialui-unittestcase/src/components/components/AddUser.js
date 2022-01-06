import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { setInputValue, resetUserData } from "../../store/actions/userActions";
import { postService } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  useEffect(() => {
    dispatch(resetUserData());
  }, []);
  return (
    <>
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
            onClick={(e) => handleSubmit()}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddUser;
