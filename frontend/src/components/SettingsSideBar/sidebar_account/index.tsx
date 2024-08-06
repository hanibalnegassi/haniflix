import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { selectUser, setUser } from "../../../store/reducers/auth";
import useApiClient from "../../../hooks/useApiClient";
import Swal from "sweetalert2";
import { Close } from "@mui/icons-material";

import { useFormik } from "formik";

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
import { useGetUserQuery } from "../../../store/rtk-query/usersApi";

import styles from "../sidebar.module.scss";
import { addClassNames } from "../../../store/utils/functions";

import CircularProgress from "@mui/material-next/CircularProgress";
import ModelPopup from "../../ModelPopup";
import { motion, AnimatePresence } from "framer-motion";

import NavLogo1 from "../../../Assets/Images/Nav-logo.png";

const url = import.meta.env.VITE_APP_API_URL;

const SidebarAccount = ({ variantGroup }) => {
  const user = useAppSelector(selectUser);
  const accessToken = user?.accessToken;

  const userId = user?._id;

  const [loading, setLoading] = React.useState(false);

  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [deleteAccount, setShowDeleteModal] = React.useState(false);

  const [userDetails, setUserDetails] = React.useState({
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

  React.useEffect(() => {
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

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
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
          username: values.name,
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

      refetchUserData();
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
        setShowDeleteModal(false);

        Swal.fire({
          title: "",
          text: "Account deleted successfully.",
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

  const makeImageUrl = (url) => {
    const BASE_URL = import.meta.env.VITE_APP_API_URL;

    let imageSuffix = url?.replace("/api/", "");
    let finalUrl = `${BASE_URL}${imageSuffix}`;

    return finalUrl;
  };

  const renderDeleteAccModal = () => {
    return (
      <Modal
        open={deleteAccount}
        onClose={() => setShowDeleteModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="">
          <Paper
            className={addClassNames(
              "relative border !bg-[#FFFFFF1A] !rounded-[20px] !backdrop-blur-[13px]"
            )}
            sx={{
              color: "#fff",
              padding: 5,
              background: "rgba(0,0,0,0.7)",
            }}
          >
            <Typography variant="h6">Delete Account</Typography>
            <p style={{ marginBottom: 50 }}>
              Are you sure to delete your account?
            </p>
            <IconButton
              edge="end"
              color="white"
              //onClick={handleCloseModal}
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteLoading(false);
              }}
              aria-label="close"
              style={{
                position: "absolute",
                top: 0,
                right: 35,
                color: "#fff",
              }}
            >
              <Close />
            </IconButton>
            <div className="flex gap-[8px]">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteLoading(false);
                }}
                className={"theme_button"}
              >
                Cancel
              </button>
              <button
                onClick={() => onDeleteAccount()}
                className={"theme_button_danger"}
              >
                {deleteLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </Paper>
        </div>
      </Modal>
    );
  };

  const { tabVariant, tabChildVariant, parentTransition } = variantGroup;

  return (
    <motion.div
      key="uniqueAccount"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariant}
      transition={parentTransition}
    >
      <motion.div variants={tabChildVariant}>
        <Formik
          initialValues={userDetails}
          validationSchema={validationSchema}
          onSubmit={handleSubmitUserDetails}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div>
                <label className={styles["input_label"]}>Username</label>
                <div className={styles["inputWrapper"]}>
                  <Field
                    id="name"
                    name="name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                {errors.name && touched.name && (
                  <div className="text-[red] text-xs">{errors.name}</div>
                )}
              </div>
              <div>
                <label className={styles["input_label"]}>Email</label>
                <div className={styles["inputWrapper"]}>
                  <Field
                    id="email"
                    name="email"
                    label="E-mail"
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-[red] text-xs">{errors.email}</div>
                )}
              </div>

              {/* Divider */}
              <div className="my-5 border-b border-[#4B4B4B]" />

              <button
                className={"theme_button_danger mt-[10px]"}
                style={{
                  borderColor: '#14f59e',
                  background: '#14f59e1f',
                  color: '#14f59e',
                }}
                type="submit"
                disabled={isSubmitting || loading}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>

      <motion.div className="mt-[25px]" variants={tabChildVariant}>
          <button
            className={"theme_button_danger"}
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            Delete Account
          </button>
        </motion.div>

      <AnimatePresence>
        {deleteAccount && (
          <ModelPopup>
            <p className="text-lg mb-2">Delete Account</p>
            <p className="text-base text-muted">
              Are you sure to delete your account?
            </p>

            <div className="mt-10 flex gap-5 justify-center">
              <button
                className="theme_button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteLoading(false);
                }}
              >
                Cancel
              </button>
              <button
                className="theme_button_danger"
                onClick={() => onDeleteAccount()}
              >
                Delete
              </button>
            </div>
          </ModelPopup>
        )}
      </AnimatePresence>
      {/* {renderDeleteAccModal()} */ }
    </motion.div >
  );
};

export default SidebarAccount;
