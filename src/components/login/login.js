import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { WARNINGS } from "../../constants";
import { loginUser, loginUserOTP } from "../../services/users";
import { ToastContainer, toast } from "react-toastify";

function Login(props) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [forgot, setForgot] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email: email, password: pass })
      .then((res) => {
        if (res?.status === 200) {
          if (res?.data?.user_agent === window.navigator.userAgent) {
            localStorage.setItem("token-key", res?.data?.token);
            alert(`Welcome: ${res?.data?.email}`);
            navigate("/");
            window.location.reload();
          } else {
            toast.error(WARNINGS.ANOTHER_DEVICE);
            setSendOtp(true);
          }
        }
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleSendOtp = () => {
    loginUserOTP({ email: email })
      .then((res) => {
        if (res?.status === 200) {
          alert(res?.data?.message);
          localStorage.setItem("email", res?.data?.data?.email);
          navigate("/otpmail");
        }
      })
      .catch((err) => toast.error(err.response.data));
  };
  const forgotPass = () => {
    setForgot(!forgot);
  };

  return (
    <div>
      <div className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <Link to={`/`}>
                    <button className="btn btn-outline-light btn-lg px-5">
                      Back to homepage
                    </button>
                  </Link>
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          name="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={forgot ? true : false}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          name="password"
                          className="form-control form-control-lg"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          disabled={forgot ? true : false}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>

                      <p
                        style={{ cursor: "pointer" }}
                        className="small mb-5 pb-lg-2"
                        onClick={forgotPass}
                      >
                        {!forgot ? "Forgot password?" : "Login with password"}
                      </p>
                      {forgot ? (
                        <>
                          <Link to={`/loginOTP`}>
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{ marginTop: 20 }}
                            >
                              Login with OTP
                            </button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-outline-light btn-lg px-5"
                            type="submit"
                          >
                            Login
                          </button>
                        </>
                      )}
                    </form>
                    {sendOtp && (
                      <div className="sendotp">
                        <button
                          className="btn btn-primary"
                          onClick={handleSendOtp}
                        >
                          Send OTP
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account? <Link to={`/signup`}>Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Login;
