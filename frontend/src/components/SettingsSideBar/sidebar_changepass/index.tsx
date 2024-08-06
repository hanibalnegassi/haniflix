import * as React from "react";
import ChangePasswordForm from "../../forms/ChangePasswordForm";

import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
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
import { useUpdateUserPasswordMutation } from "../../../store/rtk-query/usersApi";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/reducers/auth";
import {motion} from "framer-motion";

const SidebarChangePass = ({ variantGroup }) => {
  const user = useAppSelector(selectUser);
  const accessToken = user?.accessToken;

  const userId = user?._id;

  const [updatePassword, updatePasswordState] = useUpdateUserPasswordMutation();

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

  const { tabVariant, tabChildVariant, parentTransition } = variantGroup;

  return (
    <motion.div
      key="uniqueChangepass"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariant}
      transition={parentTransition}
    >
      <motion.div variants={tabChildVariant}>
        <ChangePasswordForm
          formik={changePassFormik}
          isLoading={updatePasswordState.isLoading}
        />
      </motion.div>
    </motion.div>
  );
};

export default SidebarChangePass;
