import React, { useRef } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Logo.png";
import "../../Assets/css/styles.scss";
import styles from "./change.module.scss";
import { change } from "../../context/forgot/changePass";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet";
import { addClassNames } from "../../store/utils/functions";
import { Box } from "@mui/material";

const showSwal = (title, message, type) => {
  Swal.fire({
    title: title ?? "",
    text: message,
    icon: type,
  });
};

export default function ChangePassword() {
  const { id, email } = useParams();
  const [emailId] = useState(email);
  console.log(id, email);

  const [passwordError, setPasswordError] = React.useState("");
  const [repeatPasswordError, setRepeatPasswordError] = React.useState("");
  const [appHeight, setAppHeight] = React.useState(window.innerHeight);
  const [appWidth, setAppWidth] = React.useState(window.innerWidth);
  const [isMobile, setIsMobile] = React.useState(
    window.matchMedia("(pointer: coarse)").matches
  );

  const [isFormValid, setIsFormValid] = useState(false);


  React.useEffect(() => {
    setIsFormValid(
      !passwordError && !repeatPasswordError
    );
  }, [passwordError, repeatPasswordError]);


  React.useEffect(() => {
    const handleResize = () => {
      setAppHeight(window.innerHeight); // Update appHeight
      setAppWidth(window.innerWidth); // Update appWidth
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, [window.innerHeight, window.innerWidth]);

  const imageHeight = 1008;
  const imageWidth = 1440;

  const imageHeightInScreen = React.useMemo(() => {
    const aspectRatio = imageHeight / imageWidth;
    const newHeight = aspectRatio * appWidth;
    return newHeight;
  }, [imageHeight, imageWidth, appWidth]);

  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const handleStart = () => {
    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      setPasswordError("Passwords do not match");
      setRepeatPasswordError("Passwords do not match");
      return false;
    } else if (repeatPasswordRef.current.value.length < 6) {
      setPasswordError("Password is required");
      setRepeatPasswordError("Password is required");
      repeatPasswordRef.current.focus();
      return false;
    } else {
      const user = {
        username: emailId,
        email: emailId,
        password: repeatPasswordRef.current.value,
      };

      change(user);
    }
  };

  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet> */}
      <div
        // style={{
        //   height: isMobile ? imageHeightInScreen : "100%",
        //   backgroundSize: isMobile ? "contain" : "cover",
        // }}
        className={addClassNames(styles["loginNew"])}
      >
                <div className="absolute pointer-events-none top-0 right-0 left-0 h-[60px] bg-gradient-to-b from-black to-transparent"></div>

        <Box
          className={addClassNames(styles["top"], "ml-[40px] mr-[40px]")}

        // style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            className={addClassNames(
              styles["wrapper"],
              " flex items-center justify-between "
            )}
          >
            <a href={"/"} style={{ textDecoration: "none" }} className={styles["link"]}>
              <h1> <span style={{ fontWeight: '700', fontSize: "20px" }} className="gradient-text">HANIFLIX</span></h1>

            </a>

          </div>
        </Box>
        {/* <div className="rightBlob1" style={{
          left: '-20%',
          top: '0',
          width: '25vw',
          height: '25vw',
          filter: "blur(150px)",
          opacity: "0.5"
        }}></div>
        <div className="rightBlob1" style={{
          left: '10%',
          top: '15%',
          width: '25vw',
          height: '25vw',
          filter: "blur(150px)",
          opacity: "0.5"
        }}></div>

        <div className="centerBlob2" style={{
          top: '90%',
          right: "10%",
          height: "40vw",
          width: "40vw",
          opacity: ".60"
        }}></div>
        <div className="centerBlob3" style={{
          top: '85%',
          right: "90%",
          height: "40vw",
          width: "40vw",
          opacity: ".60"
        }}></div> */}


        <div className={styles["section"]}>
          <div className={styles["intro-section"]}>
            <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text" >
              Change Password
            </h2>

            <div className={styles["OutWrapper"]}>
              <div className={styles["inputWrapper"]}>
                <input type="password" placeholder="Password" ref={passwordRef} />
              </div>

              <small className="text-red-600">
                {passwordError.length > 0 && passwordError}
              </small>
            </div>

            <div className={styles["OutWrapper"]}>
              <div className={styles["inputWrapper"]}>
                <input
                  type="password"
                  placeholder="Repeat Password"
                  ref={repeatPasswordRef}
                />
                <br />

              </div>

              <small className="text-red-600">
                {" "}
                {repeatPasswordError.length > 0 && repeatPasswordError}
              </small>
            </div>
            <button
              className={"theme_button_danger"}
              style={{
                borderColor: '#14f59e',
                background: '#14f59e1f',
                color: '#14f59e',
              }}
              disabled={!isFormValid}
              onClick={handleStart}>
              Confirm
            </button>
            <br />
            <div className="text-white text-md text-center">
              <span>Remember password? </span>
              <span>
                <Link className={styles["link"]} to={{ pathname: "/login" }}>
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
