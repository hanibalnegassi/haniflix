import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Logo from "../../Assets/Images/Logo.png";
import "../../Assets/css/styles.scss";
import styles from "./register.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import { addClassNames } from "../../store/utils/functions";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/rtk-query/authApi";
import { Box } from "@mui/material";

const api_url = import.meta.env.VITE_APP_API_URL;

//  please include these into env and fetch from there and change for live as well
const planID = "P-9C526924KG451722TMZ4DMLQ";
const clientID =
  "ATXOX-P3HkSsiVymj1DpP8asOm7_EyB-UmNzRDExM30eshEWIRNuy5OSNVoUL7TgXQcDA2AJNW5XxrQa";

const Register = () => {
  const [login, loginState] = useLoginMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const session_id = searchParams.get("session_id");
  console.log(success);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [verifyingStatus, setVerifyingStatus] = React.useState(false);
  const [ran, setRan] = React.useState(false);
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email address is required");
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateRepeatPassword = (value) => {
    if (!value) {
      setRepeatPasswordError("Repeat Password is required");
    } else if (value !== password) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  useEffect(() => {
    setIsFormValid(
      !emailError && !passwordError && !repeatPasswordError && !usernameError
    );
  }, [emailError, passwordError, repeatPasswordError, usernameError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const validateUsername = (value) => {
    if (!value) {
      setUsernameError("Username is required");
    } else if (value.length < 6) {
      setUsernameError("Username must be at least 6 characters long");
    } else {
      setUsernameError("");
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleRepeatPassword = (event) => {
    const value = event.target.value;
    setRepeatPassword(value);
    validateRepeatPassword(value);
  };

  const checkout = () => {
    if (!email || !password) {
      validateEmail(email);
      validatePassword(password);
      validateRepeatPassword("");
      validateUsername("");
      return;
    }

    localStorage.setItem("haniemail", email);
    localStorage.setItem("hanipassword", password);
    localStorage.setItem("haniusername", username);
    console.log(api_url);

    fetch(api_url + "auth/v1/create-subscription-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ success, statusText }) => {
        if (success) {
          // Proceed with subscription flow if both email and username are available
          setShowPayPalButton(true);
        } else {
          // Handle the error case
          Swal.fire({
            title: "Error",
            text: statusText,
            icon: "error",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Error",
          text: e.statusText || "An unexpected error occurred",
          icon: "error",
        });
      });
  };

  const onLogin = async (email, password) => {
    console.log("i tried logging in");
    const res = await login({ email, password });
    console.log(res);
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

  // useEffect(() => {
  //   console.log(" i ran ");
  //   if (success) {
  //     console.log(ran);
  //     setVerifyingStatus(true);
  //     setRan(true);
  //     const getQueryParams = () => {
  //       const params = new URLSearchParams(window.location.search);
  //       return {
  //         subscriptionId: params.get('sub'),
  //       };
  //     };
  //
  //     const { subscriptionId } = getQueryParams();
  //
  //     axios
  //         .post(api_url + "auth/v1/payment-success", {
  //           subscriptionId: subscriptionId,
  //           email,
  //           password,
  //           username,
  //         })
  //         .then(async (res) => {
  //           Swal.fire({
  //             title: "Success",
  //             text: "Success! Check your email for the invoice. You can proceed to login",
  //             icon: "success",
  //           });
  //           setVerifyingStatus(false);
  //           const savedEmail = localStorage.getItem("haniemail");
  //           const savedPassword = localStorage.getItem("hanipassword");
  //
  //           console.log(savedEmail, "savedEmail");
  //           console.log(savedPassword, "savedPassword");
  //           await onLogin(savedEmail, savedPassword);
  //           console.log(" after trying to login");
  //           console.log(res.data.message);
  //         })
  //         .catch((e) => {
  //           setVerifyingStatus(false);
  //           Swal.fire({
  //             title: "Success",
  //             text: e.error,
  //             icon: "success",
  //           });
  //           console.log(e.error);
  //         });
  //   }
  // }, [success]);

  return (
    <>
      {verifyingStatus && (
        <div className="w-screen h-screen flex items-center justify-center">
          <ClipLoader color="white" size={"1.5rem"} />
        </div>
      )}
      {!verifyingStatus && (
        <>
          <div className={addClassNames(styles["loginNew"])}>
            <Box
              className={addClassNames(styles["top"], "ml-[40px] mr-[40px]")}
            >
              <div
                className={addClassNames(
                  styles["wrapper"],
                  "flex items-center justify-between"
                )}
              >
                <a
                  href={"/"}
                  style={{ textDecoration: "none" }}
                  className={styles["link"]}
                >
                  <h1>
                    <span
                      style={{ fontWeight: "700", fontSize: "20px" }}
                      className="gradient-text"
                    >
                      HANIFLIX
                    </span>
                  </h1>
                </a>
              </div>
            </Box>

            <div className={styles["section"]}>
              <div className={styles["intro-section"]}>
                {!showPayPalButton && (
                  <>
                    <h2 className="text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text">
                      Sign Up
                    </h2>
                    <form
                      onSubmit={handleSubmit}
                      style={{ maxWidth: "450px", width: "100%" }}
                    >
                      <div className={styles["OutWrapper"]}>
                        <div className={styles["inputWrapper"]}>
                          <input
                            type="text"
                            placeholder="Username"
                            id="username"
                            name="username"
                            onChange={handleUsernameChange}
                            value={username}
                          />
                        </div>
                        <small className="text-[red]">{usernameError}</small>
                      </div>
                      <div className={styles["OutWrapper"]}>
                        <div className={styles["inputWrapper"]}>
                          <input
                            type="email"
                            placeholder="Email address"
                            id="email"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                          />
                        </div>
                        <small className="text-[red]">{emailError}</small>
                      </div>
                      <div className={styles["OutWrapper"]}>
                        <div className={styles["inputWrapper"]}>
                          <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            onChange={handlePasswordChange}
                            value={password}
                          />
                        </div>
                        <small className="text-[red]">{passwordError}</small>
                      </div>
                      <div className={styles["OutWrapper"]}>
                        <div className={styles["inputWrapper"]}>
                          <input
                            type="password"
                            placeholder="Repeat Password"
                            id="repeat-password"
                            name="repeat-password"
                            onChange={handleRepeatPassword}
                            value={repeatPassword}
                          />
                        </div>
                        <small className="text-[red]">
                          {repeatPasswordError}
                        </small>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          type="submit"
                          className={styles["btn"]}
                          onClick={(e) => {
                            e.preventDefault();
                            checkout();
                          }}
                          disabled={!isFormValid}
                        >
                          {verifyingStatus ? (
                            <ClipLoader color="white" size={"1.5rem"} />
                          ) : (
                            <p>Continue</p>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {showPayPalButton && (
                  <div className={styles["payment-section"]}>
                    <PayPalScriptProvider
                      options={{
                        "client-id": clientID,
                        currency: "USD",
                        vault: true,
                        "disable-funding": "credit",
                        intent: "subscription",
                        components: "buttons,funding-eligibility",
                      }}
                    >
                      <PayPalButtons
                        createSubscription={(data, actions) => {
                          return actions.subscription.create({
                            plan_id: planID,
                          });
                        }}
                        onApprove={async (data, actions) => {
                          Swal.fire({
                            title: "Success",
                            text: "Subscription successful!",
                            icon: "success",
                          });
                          navigate(
                            `/thank-you/?success=true&sub=${data.subscriptionID}`
                          );
                        }}
                        onError={(err) => {
                          console.error(err);
                          Swal.fire({
                            title: "Error",
                            text: "An error occurred during the subscription process.",
                            icon: "error",
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
