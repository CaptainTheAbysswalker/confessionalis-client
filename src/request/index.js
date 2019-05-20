import axios from "axios";

const instance = axios.create({
  baseURL: "https://confessionalis-server.herokuapp.com"
});

export const throwErrorUnless200 = response => {
  if (response.status !== 200) {
    throw new Error(response.data);
  }

  return response;
};

export const request = (options = {}) => {
  const { url = "", method = "GET", data } = options;

  const headers = {
    "Content-Type": "application/json"
  };

  return instance({
    url,
    data,
    method,
    headers,
    withCredentials: true,
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      const { data = error.message } = error.response;
      throw new Error(data);
    });
};
