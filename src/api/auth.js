import { request, throwErrorUnless200 } from "../request";

export const login = (email, password) => {
  return request({
    url: "/login",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .then(throwErrorUnless200)
    .then(response => {
      return response;
    });
};

export const registration = (displayName, email, password) => {
  return request({
    url: "/users",
    method: "POST",
    data: {
      displayName,
      email,
      password
    }
  })
    .then(throwErrorUnless200)
    .then(response => {
      return response;
    });
};

export const logout = (id) => {
  return request({
    url: "/users",
    method: "DELETE",
    data: {
      id,
    }
  })
    .then(throwErrorUnless200)
    .then(response => {
      return response;
    });
};

export const checkLogin = () => {
  return request({
    url: "/login",
    method: "GET",
  })
    .then(throwErrorUnless200)
    .then(response => {
      return response;
    });
};