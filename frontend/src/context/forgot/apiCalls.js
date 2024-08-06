import axios from "axios";
import Swal from "sweetalert2";
const api_url = import.meta.env.VITE_APP_API_URL;

const do_redirect = () => {
  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
};

export const forgot = async (user) => {
  try {
    console.log(user);
    const res = await axios.post(api_url + "auth/forgot-pass", user);
    console.log(res);

    return;
    if (!res.data.error && res.statusText === "Created") {
      Swal.fire({
        title: "Hurray!",
        text: "Your reset link has been sent to email!",
        icon: "success",
        timer: 1500,
      });

      // do_redirect();
    } else {
      Swal.fire({
        title: "Oops!",
        text: res.data.statusText,
        icon: "error",
      });
    }
  } catch (err) {
    return err;
  }
};
