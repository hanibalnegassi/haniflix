import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Assets/css/styles.scss";
import { addClassNames } from "../../store/utils/functions";
import styles from "./register.module.scss";

const api_url = import.meta.env.VITE_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

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

  // click on sign up
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

    fetch(api_url + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ success, statusText }) => {
        if (success) {
          // Proceed with subscription flow if both email and username are available
          navigate(`/thank-you/?success=true&sub=`);
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

  return (
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
                <p>Continue</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
