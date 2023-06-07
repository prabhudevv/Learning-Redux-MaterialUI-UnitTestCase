import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// Datepicker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import {
  INVALID_USERID,
  ADD_SUCCESS,
  UPDATE_SUCCESS,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PASSWORD,
  CONFIRM_PASSWORD,
  MALE,
  FEMALE,
  MOBILE_NUMBER,
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
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    mobileNumber: ""
  });

  const newUserData = useSelector((state) => state.user.newUserData);
  const { firstName, lastName, email, password, confirmPassword, gender, dob, mobileNumber } = newUserData;

  const isDirty =
    firstName !== initialValues.firstName || lastName !== initialValues.lastName || email !== initialValues.email || password !== initialValues.password || confirmPassword !== initialValues.confirmPassword || gender !== initialValues.gender || dob !== initialValues.dob || mobileNumber !== initialValues.mobileNumber;

  const isInputFieldNotNull = firstName !== "" && lastName !== "" && email !== "" && password !== "" && confirmPassword !== "" && gender !== "" && dob !== "" && mobileNumber !== "";

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
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    putService("USER_SERVICE", `/users/${userId}`, newUserData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
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

  const dateChange = (value) => {
    dispatch(setInputValue('dob', value));
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
            <TextField
              id="outlined-basic"
              name="email"
              value={email}
              label={EMAIL}
              variant="outlined"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <TextField
              id="outlined-basic"
              name="password"
              value={password}
              label={PASSWORD}
              variant="outlined"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <TextField
              id="outlined-basic"
              name="confirmPassword"
              value={confirmPassword}
              label={CONFIRM_PASSWORD}
              variant="outlined"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="dd/MM/yyyy"
                value={dob}
                name={dob}
                onChange={dateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2} md={2}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                name="gender"
                value={MALE}
                control={<Radio />}
                label={MALE}
                checked={(gender === MALE) ? true : false}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
              <FormControlLabel
                name="gender"
                value={FEMALE}
                control={<Radio />}
                label={FEMALE}
                checked={(gender === FEMALE) ? true : false}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={2} md={2}>
            <TextField
              id="outlined-basic"
              name="mobileNumber"
              value={mobileNumber}
              label={MOBILE_NUMBER}
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
