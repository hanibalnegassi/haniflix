import axios from "axios";
import Swal from "sweetalert2";
const api_url = import.meta.env.VITE_APP_API_URL;

const do_redirect = () => {
  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
};

export const change = async (user) => {
  try {
    console.log(user);
    const res = await axios.put(api_url + "auth/change-password", user);
    console.log(res);
    if (res.status === 200) {
      Swal.fire({
        title: "Hurray!",
        text: "Your password has been reset!",
        icon: "success",
        timer: 1500,
      });

      do_redirect();
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
