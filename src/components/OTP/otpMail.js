import React, { useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginUserOTP, vertifyOTPFromMail } from "../../services/users";

function OTPMail(props) {
  let navigate = useNavigate();
  const [otp, setOtp] = useState();
  const handleGetOTP = () => {
    vertifyOTPFromMail({
      email: localStorage.getItem("email"),
      otp: otp,
    })
      .then((res) => {
        if (res?.status === 200) {
          localStorage.setItem("token-key", res?.data?.token);
          alert("Welcome");
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
        return;
      });
  };
  const handleSendOtp = () => {
    loginUserOTP({ email: localStorage.getItem("email") })
      .then((res) => {
        if (res?.status === 200) {
          alert(res?.data?.message);
          navigate("/otpmail");
        }
      })
      .catch((err) => toast.error(err.response.data));
  };
  const ResendOtp = () => {
    return (
      <>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleSendOtp}
          style={{ margin: "10px 0 0 10px" }}
        >
          Resend otp
        </button>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h2>OTP mail sent. PLease check inbox your email</h2>
        <input
          name="otp"
          className="form-control form-control-lg"
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 4 code digit"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleGetOTP}
          style={{ marginTop: 10 }}
        >
          Submit
        </button>
        <Countdown date={Date.now() + 60000}>
          <ResendOtp />
        </Countdown>
      </div>
      <ToastContainer
        style={{ fontSize: 14 }}
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
      />
    </div>
  );
}

export default OTPMail;
