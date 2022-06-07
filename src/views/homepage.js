import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import { tokenKey } from "../constants";
import { getCurrentUser } from "../services/users";

function HomePage(props) {
  const [user, setUser] = useState("");
  const getUser = () => {
    if (!tokenKey) {
      return;
    } else {
      getCurrentUser()
        .then((res) => {
          if (res?.status === 200) {
            setUser(res?.data[0].email);
          }
        })
        .catch((err) => alert(err.response.data));
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token-key");
    localStorage.removeItem("email");
    window.location.reload();
  };

  useEffect(() => {
    if (!tokenKey) {
      return;
    } else {
      getUser();
    }
  }, []);

  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Learn dynamic form
          </a>
          {!user ? (
            <div>
              <Link to={`/login`}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginRight: 10 }}
                >
                  Login
                </button>
              </Link>
              <Link to={`/signup`}>
                <button type="button" className="btn btn-primary">
                  SignUp
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="username">
                <span style={{ fontWeight: 600 }}>Hello: </span>
                <span>{user}</span>
              </div>
              {/* <Link to=""> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
              {/* </Link> */}
            </>
          )}
        </div>
      </nav>

      <div className="container">
        <h1>Welcome</h1>

        <Link to={`/formlist`}>
          <button className="btn btn-success">View list form</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
