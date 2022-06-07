import axios from "axios";
import { localhost, tokenKey } from "../constants";

export const getAllListForm = () => {
  return axios({
    url: localhost + "/form/listForm",
    method: "GET",
    headers: {
      "x-access-token": tokenKey,
    },
  });
};

export const getListFormId = (id) => {
  return axios({
    url: localhost + "/form/" + id,
    method: "GET",
    headers: {
      "x-access-token": tokenKey,
    },
  });
};

export const deleteForm = (id) => {
  return axios({
    url: localhost + "/form/deleteForm/" + id,
    method: "DELETE",
    headers: {
      "x-access-token": tokenKey,
    },
    data: id,
  });
};

export const addNewFormList = (name) => {
  return axios({
    url: localhost + "/form/addForm",
    method: "POST",
    headers: {
      "x-access-token": tokenKey,
    },
    data: name,
  });
};
