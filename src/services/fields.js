import axios from "axios";
import { localhost, tokenKey } from "../constants";

export const getFieldsId = (id) => {
  return axios({
    url: localhost + "/field/" + id,
    method: "GET",
  });
};

export const addFields = (data) => {
  return axios({
    url: localhost + "/field/add",
    method: "POST",
    data: data,
  });
};

export const updateFields = (id, value) => {
  return axios({
    url: localhost + "/field/update/" + id,
    method: "POST",
    headers: {
      "x-access-token": tokenKey,
    },
    data: value,
  });
};

export const deleteField = (id) => {
  return axios({
    url: localhost + "/field/" + id,
    method: "DELETE",
  });
};
