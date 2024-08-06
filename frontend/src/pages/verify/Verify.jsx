import Swal from "sweetalert2";
import "../../Assets/css/styles.scss";
import "./login.scss";
import Logo from "../../Assets/Images/Nav-logo.png";
import { verify_email } from "../../context/login/apiCalls";

export default function Verify() {
  const url = new URL(window.location.href);
  const otp = url.searchParams.get("otp");
  const email = url.searchParams.get("email");

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const validateEmail = (email) => {
    var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    return emailReg.test(email);
  };

  if (email.length < 5) {
    Swal.fire({ title: "", icon: "error", text: "Your email is invalid!" });
    return false;
  }

  if (!validateEmail(email)) {
    showSwal("", "Invalid email supplied!", "error");
    return false;
  }

  if (otp.length < 15) {
    showSwal("", "Your OTP is too short!", "error");
    return false;
  }

  verify_email({
    email: email,
    otp: otp,
  });

  return (
    <div className="loginNew">
      <div className="top">
        <div className="wrapper">
          <a href={"/"} className="link">
            <img
              className="logo"
              src={Logo}
              width="100px"
              height="100px"
              alt=""
            />
          </a>
        </div>
      </div>

      <div className="section">
        <div className="intro-section">
          <h1 className="text-center">Please wait..</h1>
        </div>
      </div>
    </div>
  );
}
