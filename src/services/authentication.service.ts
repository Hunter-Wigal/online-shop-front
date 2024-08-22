import { jwtDecode } from "jwt-decode";

export interface User {
  username: string;
  full_name: string;
  sessionID: string;
  sessionExp: Date;
}

export async function login(username: string, password: string) {
  // TODO find out if sending passwords is fine
  // let response = null;
  //TODO look into axios

  fetch("http://localhost:8080/api/v1/auth/login", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email: username, password: password }),
  })
    .then(async (response) => {
      let result = await response.json();
      console.log(result.message);
      let token = result.accessToken;
      console.log(token);
      window.localStorage.setItem("jwt", token);
      document.cookie = "jwt=" + token;
      response = result;

      setCurrentUser(username);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function register(
  username: string,
  password: string,
  name: string,
  age: number
) {
  fetch("http://localhost:8080/api/v1/auth/register", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email: username, password: password }),
  })
    .then(async (response) => {
      let result = await response.text();
      console.log(result);
      updateUser(username, age, name);
      login(username, password);
      // console.log(result.message);
      // let token = result.accessToken;
      // console.log(token);
      // window.localStorage.setItem('accessToken', token);
      // document.cookie += "accessToken=" + token;
      // response = result;
    })
    .catch((err) => {
      console.log(err);
    });
}

export interface JWTDetails {
  sub: string;
  iat: number;
  exp: number;
}

export interface UserDetails {
  name: string;
  age: number;
  email: string;
}

export function getUserDetails(): JWTDetails | null {
  const jwt = localStorage["jwt"];
  if (!jwt || jwt === "") return null;
  // console.log(localStorage['jwt']);

  const decoded = <JWTDetails>jwtDecode(jwt);
  return decoded;
}

function setCurrentUser(username: string) {
  fetch(`http://localhost:8080/api/v1/user/user?username=${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage["jwt"],
    },
    method: "GET",
    // body: JSON.stringify({ username: username}),
  })
    .then(async (response) => {
      // Result should be info on user
      let result = await response.text();
      console.log(result);
      localStorage["user"] = result;
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateUser(username: string, age: number, name: string) {
  fetch("http://localhost:8080/api/v1/user/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage["jwt"],
    },
    method: "PUT",
    body: JSON.stringify({ email: username, name: name, age: age }),
  }).then(async (response) => {
    let result = await response.text();
    console.log(result);
  });
}

// TODO remove JWT if invalid
export function checkJWT() {
  const details = getUserDetails();
  if (!details) {
    localStorage.removeItem("user");
    return;
  }
  const seconds = details["exp"];
  // const date = new Date(seconds * 1000)
  const currTime = new Date().getTime() / 1000;
  console.log(seconds - currTime);

  if (seconds - currTime < 0) {
    console.log("logging out...");
    // localStorage.setItem("jwt", "");
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
  }
}
