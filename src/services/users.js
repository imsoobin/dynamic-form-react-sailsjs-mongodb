import axios from "axios";
import { localhost, tokenKey } from "../constants";

export const getCurrentUser = () => {
  return axios({
    url: localhost + "/user/listuser",
    method: "GET",
    headers: {
      "x-access-token": tokenKey,
    },
  });
};

export const loginUser = (info) => {
  return axios({
    url: localhost + "/user/login",
    method: "POST",
    data: info,
  });
};

export const signUpUser = (dataSignUp) => {
  return axios({
    url: localhost + "/user/signup",
    method: "POST",
    data: dataSignUp,
  });
};

export const loginUserOTP = (email) => {
  return axios({
    url: localhost + "/user/loginOTP",
    method: "POST",
    data: email,
  });
};

export const vertifyOTPFromMail = (optCode) => {
  return axios({
    url: localhost + "/user/vertifyOTP",
    method: "POST",
    data: optCode,
  });
};
