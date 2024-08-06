import * as React from "react";
import {
  Box,
  Typography,
  Modal,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useCancelSubMutation } from "../../../store/rtk-query/usersApi";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/reducers/auth";
import axios from "axios";
import { BASE_URL } from "../../../utils/utils";
import ModelPopup from "../../ModelPopup";
import { motion } from "framer-motion";

const SidebarSub = ({ variantGroup }) => {
  const user = useAppSelector(selectUser);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [cancelSub, cancelSubState] = useCancelSubMutation();

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const onCancelSubscription = async () => {
    try {
      const { data } = await axios.put(
          `${BASE_URL}users/cancel-sub/${user._id}`,
          // {},
          { withCredentials: true }
      );

      showSwal("Subscription cancelled", data.message, "success");
    } catch (error) {
      let errorMessage = error.response?.data?.message || "Error encountered during cancellation";
      Swal.fire({
        title: errorMessage,
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setShowCancelModal(false);
    }
  };

  const renderSubCancelModal = () => {
    return (
        <Modal
            open={showCancelModal}
            onClose={() => setShowCancelModal(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
        >
          <div className="">
            <Paper
                className="relative border !bg-[#FFFFFF1A] !rounded-[20px] !backdrop-blur-[13px] mx-2"
                sx={{ color: "#fff", padding: 5 }}
            >
              <Typography variant="h6">Cancel subscription</Typography>
              <p style={{ marginBottom: 50 }}>
                Are you sure you want to cancel your subscription?
              </p>
              <IconButton
                  edge="end"
                  color="white"
                  onClick={() => {
                    setShowCancelModal(false);
                  }}
                  aria-label="close"
                  style={{ position: "absolute", top: 0, right: 35, color: "#fff" }}
              >
                <Close />
              </IconButton>
              <div className="grid grid-cols-2 gap-[8px]">
                <button
                    onClick={() => setShowCancelModal(false)}
                    className={"theme_button"}
                >
                  Close
                </button>
                <button
                    onClick={onCancelSubscription}
                    className={"theme_button_danger"}
                >
                  {cancelSubState.isLoading ? (
                      <CircularProgress color="inherit" size={24} />
                  ) : (
                      "Proceed"
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
          key="uniqueSubscription"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabVariant}
          transition={parentTransition}
      >
        <motion.div variants={tabChildVariant}>
          <div className="mb-6 border-b mt-[-15px] border-[#4B4B4B]" />

          <button
              className={"theme_button_danger"}
              onClick={() => setShowCancelModal(true)}
          >
            End Subscription
          </button>
        </motion.div>

        {renderSubCancelModal()}
      </motion.div>
  );
};

export default SidebarSub;
