import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";
import { signUpUser } from "../../services/users";

function SignUp(props) {
  let navigate = useNavigate();
  const [signup, setSignup] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(signup)
      .then((res) => {
        if (res?.status === 201) {
          alert("sign up successful. Please login!");
          navigate("/login");
        }
      })
      .catch((err) => alert(err.response.data));
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setSignup((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div>
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div>
                <h2>SignUp</h2>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1"
                              className="form-control"
                              name="first_name"
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1"
                            >
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example2"
                              name="last_name"
                              className="form-control"
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example2"
                            >
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          className="form-control"
                          name="email"
                          onChange={handleInputChange}
                        />
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                          name="password"
                          onChange={handleInputChange}
                        />
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button>
                      <Link to={`/login`}>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                        >
                          Back to login
                        </button>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
