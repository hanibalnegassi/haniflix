import axios from "axios";
import Swal from "sweetalert2";
const api_url = import.meta.env.VITE_APP_API_URL;

const do_redirect = () => {
  setTimeout(() => {
    window.location.href = "/login";
  }, 3500);
};

export const register = async (user, token) => {
  try {
    console.log("Reg", token);
    const res = await axios.post(api_url + "auth/register", { user, token });

    console.log(res.data);

    if (res.data.statusText) {
      Swal.fire({
        title: "Hurray!",
        text: "Your account has been created! Check your email to Verify",
        icon: "success",
        timer: 3500,
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
