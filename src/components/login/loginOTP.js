import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUserOTP } from "../../services/users";

function LoginOTP(props) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const getEmail = () => {
    loginUserOTP({ email: email })
      .then((res) => {
        if (res?.status === 200) {
          alert(res?.data?.message);
          localStorage.setItem("email", res?.data?.data?.email);
          navigate("/otpmail");
        }
      })
      .catch((err) => alert(err.response.data));
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
        <h4>Enter your email</h4>
        <form>
          <input
            type="email"
            name="otp"
            className="form-control form-control-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div style={{ marginTop: 20 }}>
            <button
              className="btn btn-primary btn-block mb-4"
              onClick={getEmail}
              style={{ marginRight: 10 }}
              type="button"
            >
              Submit
            </button>
            <Link to={`/login`}>
              <button type="button" className="btn btn-primary btn-block mb-4">
                Back to login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginOTP;
