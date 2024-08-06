import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  // CircularProgress,
  Typography,
  Modal,
  Container,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, setUser } from "../../store/reducers/auth";
import useApiClient from "../../hooks/useApiClient";
import Swal from "sweetalert2";
import { Close } from "@mui/icons-material";

import { useFormik } from "formik";

import "./settings.scss";
import ChangePasswordForm from "../../components/forms/ChangePasswordForm";
import {
  useGetUserQuery,
  useUpdateUserPasswordMutation,
} from "../../store/rtk-query/usersApi";

import CircularProgress from "@mui/material-next/CircularProgress";

import { styled } from "@mui/material/styles";

const url = import.meta.env.VITE_APP_API_URL;

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[500], // Darker gray outline
      "&:hover fieldset": {
        borderColor: theme.palette.grey[600], // Slightly lighter on hover
      },
    },
  },
  "& .MuiInputLabel-root": {
    // Target the label
    color: "white", // Set label color to white
  },
  "& .MuiInputBase-input": {
    color: "white", // Set text color to white
  },
}));

const AccSettings = () => {
  const user = useAppSelector(selectUser);
  const accessToken = user?.accessToken;

  const userId = user?._id;
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: userId,
    name: user?.fullname,
    email: user?.email,
  });

  const client = useApiClient();
  const dispatch = useAppDispatch();

  const {
    data: userData,
    isLoading: userDataLoading,
    refetch: refetchUserData,
  } = useGetUserQuery(userId);
  const [updatePassword, updatePasswordState] = useUpdateUserPasswordMutation();

  useEffect(() => {
    // fetchUserDetails();
    if (userData) {
      setUserDetails({
        id: userId,
        name: userData?.fullname,
        email: userData?.email,
      });
    }
  }, [userData]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name cannot be left blank"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email cannot be left blank"),
  });

  const changePassValidationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const changePassFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePassValidationSchema,
    onSubmit: (values) => {
      // Submit form data to the server
      console.log("change pass ", values);
      onUpdatePassword(values);
    },
  });

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const onUpdatePassword = async (values) => {
    const newPassword = values?.newPassword;
    const currentPassword = values.currentPassword;

    const data = { newPassword, currentPassword };

    const res = await updatePassword({
      data,
      id: userId,
    });

    if (res?.data) {
      Swal.fire({
        title: "",
        text: "Password changed",
        icon: "success",
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: res?.error?.data?.message || "Error encountered during update",
        text: res?.error?.data?.message,
        icon: "error",
      });
    }
  };

  const handleSubmitUserDetails = async (
    values,
    { resetForm, setSubmitting }
  ) => {
    setLoading(true);
    const config = {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    };

    try {
      const res = await axios.put(
        `${url}users/updateUserDetails/${userId}`,
        {
          id: userId,
          name: values.name,
          email: values.email,
        },
        config
      );
      setUserDetails({
        id: res.data._id,
        name: res.data.fullname,
        email: res.data.email,
      });
      dispatch(
        setUser({ ...user, fullname: res.data.fullname, email: res.data.email })
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      // alert("Details Updated Successfully");
      showSwal("", "Details Updated Successfully", "success");
    } catch (error) {
      showSwal("", "Error encountered", "error");
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const onDeleteAccount = () => {
    setDeleteLoading(true);
    client
      .deleteUser(user?._id)
      .then(() => {
        setDeleteLoading(false);
        Swal.fire({
          title: "",
          text: "Subscription canceled and account deleted successfully.",
          icon: "success",
          timer: 1500,
        }).then(function () {
          dispatch(setUser(null));
          window.location.href = "/";
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed - try again later",
        });
      });
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        open={deleteAccount}
        onClose={() => setDeleteAccount(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            // padding: 2,
            maxWidth: 600,
            margin: "auto",
            borderRadius: 3,
            position: "relative",
          }}
        >
          <Paper sx={{ color: "#000", padding: 5 }}>
            <Typography variant="h6">
              Delete account and cancel subscription
            </Typography>
            <p style={{ marginBottom: 50 }}>
              Are you sure to cancel your subscription and delete your account ?
            </p>
            <IconButton
              edge="end"
              color="inherit"
              //onClick={handleCloseModal}
              onClick={() => setDeleteAccount(false)}
              aria-label="close"
              style={{ position: "absolute", top: 0, right: 35 }}
            >
              <Close />
            </IconButton>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDeleteAccount(false)}
                className="gradientButton"
                sx={{ color: "#fff" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onDeleteAccount()}
                style={{ marginLeft: 10 }}
                className="gradientButton"
                sx={{ color: "#fff" }}
              >
                {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
              </Button>
            </Grid>
          </Paper>
        </Container>
      </Modal>
    );
  };

  return (
    <>
      <Navbar />
      <Box
        style={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{ fontWeight: 700 }}
          sx={{ mt: 4, mb: 2, color: "#fff" }}
        >
          Update Account Details
        </Typography>

        <Formik
          initialValues={userDetails}
          validationSchema={validationSchema}
          onSubmit={handleSubmitUserDetails}
        >
          {({ isSubmitting }) => (
            <Form
              style={{
                maxWidth: "450px",
                width: "100%",
                // background: "#fff",
                border: "1px solid gray",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Field
                as={CustomTextField}
                fullWidth
                id="name"
                name="name"
                label="Name"
                margin="normal"
                variant="outlined"
              />

              <Field
                as={CustomTextField}
                fullWidth
                id="email"
                name="email"
                label="E-mail"
                margin="normal"
                variant="outlined"
              />

              <Button
                className="gradientButton"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#1976d2" }}
                disabled={isSubmitting || loading}
                sx={{ mt: 2, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <div className="w-full flex justify-center">
        <div className="w-[fit-content]">
          <ChangePasswordForm
            formik={changePassFormik}
            isLoading={updatePasswordState.isLoading}
          />
        </div>
      </div>

      <div className="fixed bottom-[10px] right-0 left-0 flex justify-center">
        <Button
          className="gradientButton"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#1976d2" }}
          sx={{ maxWidth: 450 }}
          onClick={() => {
            setDeleteAccount(true);
          }}
        >
          Cancel subscription and delete account
        </Button>
      </div>

      {renderDeleteModal()}
    </>
  );
};

export default AccSettings;
