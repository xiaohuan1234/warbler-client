import axios from "axios";

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
const SERVER_URL="https://abbey-today-xiaohuan123.c9users.io:8081";
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](SERVER_URL+path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
