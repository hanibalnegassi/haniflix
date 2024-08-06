import axios from "axios";
import Swal from "sweetalert2";
const api_url = import.meta.env.VITE_APP_API_URL;

const do_redirect = () => {
  //setTimeout(() => {
  window.location.href = "/";
  //}, 1500);
};

export const login = async (user) => {
  try {
    const res = await axios.post(api_url + "auth/login", user);

    if (
      res.data === "Wrong email provided!" ||
      res.data === "Wrong password or username!" ||
      res.data === "Your email address is not verified! Check your inbox."
    ) {
      Swal.fire({
        title: "Oops",
        text: res.data,
        icon: "error",
      });
    }

    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res.data);

      Swal.fire({
        title: "",
        text: "Login successful. Redirecting..",
        icon: "success",
        timer: 1500,
      }).then(function () {
        do_redirect();
      });
    }
  } catch (err) {
    return err;
  }
};

export const verify_email = async (user) => {
  try {
    const res = await axios.post(api_url + "auth/verify_email", user);

    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data.accessToken));
      localStorage.setItem("userEmail", res.data.email);

      Swal.fire({
        title: "",
        text: "Email verified. Redirecting..",
        icon: "success",
        timer: 1500,
      }).then(function () {
        do_redirect();
      });
    } else {
      Swal.fire({
        title: "",
        text: res.data,
        icon: "error",
      }).then(function () {
        do_redirect();
      });
    }
  } catch (err) {
    console.log(err);
  }
};
