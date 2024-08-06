import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { CloseIcon } from "../../Assets/svgs/tsSvgs";
import { useGetAvatarsQuery } from "../../store/rtk-query/avatarsApi";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../store/rtk-query/usersApi";
import { addClassNames } from "../../store/utils/functions";

import CircularProgress from "@mui/material-next/CircularProgress";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/reducers/auth";
import styles from "./change_avatar.module.scss";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Hanipic from "../../Assets/Images/Hani.jpg"

const ChangeAvatarModal = ({ show, onClose, first, variants }) => {
  const user = useAppSelector(selectUser);

  const userId = user?._id;

  const {
    data: userData,
    isLoading: userDataLoading,
    refetch: refetchUserData,
  } = useGetUserQuery(userId);

  const { data: avatarsData, isLoading: avatarsLoading } = useGetAvatarsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [updateUser, updateUserState] = useUpdateUserMutation();

  const [selectedAvatar, setSelectedAvatar] = React.useState<undefined | any>(
    undefined
  );

  const closeButtonRef = React.useRef();

  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  // Close on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.code === "Escape") {
        onClose();
        setSelectedAvatar(undefined);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const onSubmit = async () => {
    const data = {
      ...(selectedAvatar && { avatar: selectedAvatar?.url }),
    };

    if (Object.keys(data).length == 0) {
      return;
    }

    const res = await updateUser({
      data,
      id: userId,
    });

    if (res?.data) {
      localStorage.setItem(`fisrtAvatarTime_${userId}`, "true");
      Swal.fire({
        title: "",
        text: "Profile updated",
        icon: "success",
        timer: 1500,
      });
      refetchUserData();
    } else {
      Swal.fire({
        title: res?.error?.data?.message || "Error encountered during update",
        text: res?.error?.data?.message,
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    onClose(); // Pass closure to ensure correct state update
    setSelectedAvatar(undefined);
  };

  const dup = { 
    avatars : [
      {
        _id:"1",
        url:Hanipic
      },
      {
        _id:"2",
        url:Hanipic
      },
      {
        _id:"3",
        url:Hanipic
      },
      {
        _id:"4",
        url:Hanipic
      }
    ]
  } 

  if (false)
    return (
      <Transition show={show}>
        <div
          className={addClassNames(
            "fixed top-0 right-0 left-0 bottom-0 overflow-hidden z-[1000] bg-transparent border",
            "flex items-center justify-center"
          )}
        >
          <div
            className="absolute top-0 right-0 left-0 bottom-0 backdrop-filter backdrop-brightness-[0.3]"
            onClick={handleClose}
          ></div>

          <Transition.Child
            enter="transition duration-150 ease-out"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition duration-100 ease-in-out"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div
              className={addClassNames(
                " shadow-xl rounded-lg  p-[37px]  text-left   ",
                "backdrop-blur-[13px] bg-[#FFFFFF1A] border border-[#4B4B4B]",
                "min-w-[52vw] !max-w-[1221px] max-h-[70vh]",
                styles["choose-your-profile-modal"]
              )}
            >
              {/* Top section with heading and close button */}
              <div className="flex position-static items-center justify-between mb-[35px]">
                <h3 className="text-[25px] font-[500] leading-6 text-white">
                  Choose Your Profile Picture
                </h3>
                {!first && (
                  <button
                    type="button"
                    ref={closeButtonRef}
                    onClick={handleClose}
                    className="h-[40px] w-[40px] rounded-[40px] bg-[#FFFFFF40] inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
              {/* Divider */}
              <div className="mb-6 border-b border-[#4B4B4B]" />
              <div
                className="mt-5 flex flex-wrap gap-[13px] overflow-auto !max-w-[1221px] max-h-[50vh] overflow-y-auto h-[80%] scrollbar-thin scrollbar-thumb-gray-200 sm:scrollbar-thumb-gray-300"
                aria-labelledby="modal-title"
              >
                {avatarsData?.avatars?.map((avatar, index) => {
                  const imageUrl = avatar?.url?.replace("/api/", "");
                  return (
                    <div
                      key={avatar?._id}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={addClassNames(
                        // "h-[110px] w-[110px] bg-[gray] rounded-[2px] cursor-pointer relative",
                        selectedAvatar?._id == avatar?._id
                          ? "border relative border-[4px] border-[#FFFFFF]"
                          : "",
                        styles["avatar"]
                      )}
                    >
                      {selectedAvatar?._id == avatar?._id ? (
                        <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center left-0 backdrop-filter backdrop-brightness-[0.3]">
                          <div
                            onClick={onSubmit}
                            className={addClassNames(
                              styles["app_button"],
                              "!h-[33px] !w-[70px] !text-[12px] "
                            )}
                          >
                            {updateUserState.isLoading ? (
                              <div className="text-white">
                                <CircularProgress color="inherit" size={24} />
                              </div>
                            ) : (
                              "Select"
                            )}
                          </div>
                        </div>
                      ) : undefined}
                      <img
                        className="w-full h-full rounded-[2px]"
                        src={`${BASE_URL}${imageUrl}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    );

  return (
    <motion.div variants={variants} className="flex flex-wrap gap-[2vw]">
      {avatarsData?.avatars?.map((avatar, index) => {
        const imageUrl = avatar?.url?.replace("/api/", "");
        return (
          <button
            key={avatar?._id}
            onClick={() => {setSelectedAvatar(avatar);onsubmit;}}
            className={`!w-[100px] !h-[100px] xl:!w-[120px] xl:!h-[120px] relative rounded-lg overflow-hidden group border-2 ${
              (selectedAvatar?._id == avatar?._id) && "border-solid border-main"
            }`}
          >
            <img
              src={`${BASE_URL}${imageUrl}`}
              alt=""
              className="block w-full h-full object-cover"
            />
            <div className="bg-main absolute bottom-0 left-0 right-0 top-0 opacity-0 group-hover:opacity-30 transition-all duration-200"></div>
            <button
              className=" theme_button_small absolute -bottom-1/2 left-1/2 -translate-x-1/2 group-hover:bottom-1 z-10"
            >
              {updateUserState.isLoading ? (
                <div className="text-white">
                  <CircularProgress color="inherit" size={14} />
                </div>
              ) : (
                "Select"
              )}
            </button>
          </button>
        );
      })}
    </motion.div>
  );
};

export default ChangeAvatarModal;
