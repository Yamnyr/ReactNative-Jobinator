import {useReducer} from "react";

const BASE_URL = "http://localhost:8000";

export async function Authentification(credentials) {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json());
}

export async function register(credentials) {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json());
}

export async function FetchUser(jwt) {
  return fetch(`${BASE_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jwt),
  })
    .then((response) => response.json());
}
