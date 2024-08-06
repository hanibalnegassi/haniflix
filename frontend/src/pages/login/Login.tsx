import React, { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { login } from "../../context/login/apiCalls";
import landingBg from "../../Assets/Images/landing-bg.png";
import useApiClient from "../../hooks/useApiClient";
import { useDispatch } from "react-redux";
import { selectUser, setUser } from "../../store/reducers/auth";
import { useAppSelector } from "../../store/hooks";
import { useLoginMutation } from "../../store/rtk-query/authApi";


import { useNavigate } from "react-router-dom";

import SocketContext from "../../context/SocketContext";
// import styles from "../register/register.module.scss";
import styles from "./login.module.scss";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { addClassNames } from "../../store/utils/functions";

import { Helmet } from "react-helmet";
import { Box } from "@mui/material";

export default function Login() {
  const emailRef = useRef();

  const navigate = useNavigate();
  // const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const client = useApiClient();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const [rememberMe, setRememberMe] = useState(false);

  const [login, loginState] = useLoginMutation();

  const { handleUserLogin } = React.useContext(SocketContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [appHeight, setAppHeight] = React.useState(window.innerHeight);
  const [appWidth, setAppWidth] = React.useState(window.innerWidth);
  const [isMobile, setIsMobile] = React.useState(
    window.matchMedia("(pointer: coarse)").matches
  );

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

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email address is required");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
      return true;
    }
  };
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
      return true
    }
  };


  useEffect(() => {
    setIsFormValid(
      !emailError && !passwordError
    );
  }, [emailError, passwordError]);


  // useEffect(() => {
  //   if (user != null) {
  //     window.location.href = "/";
  //   }
  // }, [user]);

  const onLogin = async (email: string, password: string) => {
    const res = await login({ email, password, rememberMe });

    if (res?.data) {
      console.log("Login successful");
    }

    if (!res?.data) {
      Swal.fire({
        title: res?.error.message || "Error encountered during login",
        text: res?.error.message,
        icon: "error",
      });
    }
  };

  const handleStart = useCallback(() => {

    if (!email || !password) {
      validateEmail(email)
      validatePassword(password)
      return
    }
    // const user = { email, password };


    // console.log("user : ", user)
    // return;

    onLogin(email, password);
  }, [email, password, emailRef, rememberMe]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleStart(); // Trigger login on Enter key press
    }
  };

  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet> */}


      <div
        // style={{
        //   height: isMobile ? "100%" : "100%",
        // }}
        // <div className={styles["section"]}>
        // <div className={styles["intro-section"]}>
        // style={{
        //   height: isMobile ? imageHeightInScreen : "100%",
        //   backgroundSize: isMobile ? "contain" : "cover",
        // }}
        className={`${addClassNames(styles["loginNew"])} bg-sred-50s0`}
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

        {/* <div className={styles["top"]}>
          <div className={styles["wrapper"]}>
            <a href={"/"} className="link">
              <img
                className={styles["logo"]}
                src={Logo}
                width="100px"
                height="100px"
                alt=""
              />
            </a>
          </div>
        </div> */}
        {/* <div className={styles["top"]}>
          <div className={styles["wrapper"]}>
            <a href={"/"} className="link">
              <img
                className="logo"
                src={Logo}
                width="100px"
                // height="100px"
                alt=""
                loading="lazy"
              />
            </a>
          </div>
        </div> */}

        <div className={styles["section"]}>
          <div
            className={addClassNames(
              // "bg-[#FFFFFF1A] rounded-[20px] px-[48px] py-[64px] ",
              styles["intro-section"]
            )}
          >
            <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text" >
              Sign In
            </h2>

            <div className={styles["OutWrapper"]}>
              <div className={styles["inputWrapper"]}>
                <input
                  type="email"
                  placeholder="Email Address"
                  ref={emailRef}
                  value={email}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <small className="text-red-600">
                {emailError.length > 1 && emailError}
              </small>
            </div>
            <div className={styles["OutWrapper"]}>
              <div className={styles["inputWrapper"]}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  // ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div
                  className="cursor-pointer mr-2 text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>

              <small className="text-red-600">
                {passwordError.length > 1 && passwordError}
              </small>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className={addClassNames(
                  "flex items-center gap-2 w-[fit-content]",
                  styles["rememberMe_wrapper"]
                )}
              >
                <input
                  type="checkbox"
                  name="rememberMe"
                  className={addClassNames(
                    "!h-[20px] !w-[20px] rounded border border-white text-white shadow-sm"
                  )}
                  checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                  onChange={() => { }}
                />
                <label htmlFor="rememberMe" className="text-sm text-white">
                  Remember Me
                </label>
              </div>

              <div>
                <span style={{ color: "#222" }}>
                  <Link
                    className={styles["link"]}
                    to={{ pathname: "/forgot-pass" }}
                  >
                    Forgot Password
                  </Link>
                </span>
              </div>
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
              Sign In
            </button>
            <div className="text-white text-md text-center">
              <span>Don’t have an account? </span>
              <span>
                <Link className={styles["link"]} to={{ pathname: "/register" }}>
                  {" "}
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
