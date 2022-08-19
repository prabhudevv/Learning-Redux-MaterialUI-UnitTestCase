import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
  INVALID_USERID,
  ADD_SUCCESS,
  UPDATE_SUCCESS,
  FIRST_NAME,
  LAST_NAME,
  SUBMIT,
  UPDATE
} from "../../constants/constants";

import {
  setInputValue,
  resetUserData,
  setUserDetail,
} from "../../store/actions/userActions";
import { postService, getService, putService } from "../../axios/axios";

import Loader from "../Loader/Loader";

const AddUser = () => {
  let { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isValidId, setIsValidId] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
  });

  const newUserData = useSelector((state) => state.user.newUserData);
  const { firstName, lastName } = newUserData;

  const isDirty =
    firstName !== initialValues.firstName || lastName !== initialValues.lastName;
  const isInputFieldNotNull = firstName !== "" && lastName !== "";

  useEffect(() => {
    if (userId === "0") {
      dispatch(resetUserData());
    } else {
      setLoading(true);
      getUserDetail();
    }
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    postService("USER_SERVICE", "/users", newUserData)
      .then((res) => {
        alert("success", ADD_SUCCESS);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    putService("USER_SERVICE", `/users/${userId}`, newUserData)
      .then((res) => {
        alert("success", UPDATE_SUCCESS);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getUserDetail = () => {
    getService("USER_SERVICE", `/users/${userId}`)
      .then((res) => {
        dispatch(setUserDetail(res.data));
        setInitialValues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setIsValidId(false);
        setLoading(false);
      });
  };

  const onInputChange = (name, value) => {
    dispatch(setInputValue(name, value));
  };

  return (
    <>
      {isValidId ? (
        <Grid container spacing={1}>
          <Grid item xs={2} md={2}>
            <TextField
              id="outlined-basic"
              name="firstName"
              value={firstName}
              label={FIRST_NAME}
              variant="outlined"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <TextField
              id="outlined-basic"
              name="lastName"
              value={lastName}
              label={LAST_NAME}
              variant="outlined"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <Button
              variant="contained"
              size="large"
              disabled={!isDirty || !isInputFieldNotNull}
              onClick={(e) =>
                userId === "0" ? handleSubmit() : handleUpdate()
              }
            >
              {userId === "0" ? SUBMIT : UPDATE}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <h5>{INVALID_USERID}</h5>
      )}
      {loading ? <Loader /> : <></>}
    </>
  );
};

export default AddUser;
