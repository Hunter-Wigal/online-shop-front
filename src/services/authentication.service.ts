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

  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email: username, password: password }),
  })
    .then(async (response) => {
      let result = await response.json();

      let token = result.accessToken;

      if (!token) {
        console.log("JWT is null");
        return null;
      }
      window.localStorage.setItem("jwt", token);
      document.cookie = "jwt=" + token;
      response = result;

      await setCurrentUser(username);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export async function register(
  username: string,
  password: string,
  name: string,
  age: number
) {
  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email: username, password: password }),
  })
    .then(async (response) => {
      // let result = await response.text();
      response;
      let success = await login(username, password);

      if (success) {
        updateUser(username, age, name);
        return true;
      } else {
        console.log("Failed to register");
        return false;
      }
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
  if (!localStorage["jwt"]) return null;

  return fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/user?username=${username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage["jwt"],
      },
      method: "GET",
      // body: JSON.stringify({ username: username}),
    }
  )
    .then(async (response) => {
      // Result should be info on user
      let result = await response.text();
      console.log(result);
      sessionStorage["user"] = result;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateUser(username: string, age: number, name: string) {
  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage["jwt"],
    },
    method: "PUT",
    body: JSON.stringify({ email: username, name: name, age: age }),
  })
    .then(async (response) => {
      let result = await response.text();
      console.log(`Successfully updated user: ${result}`);
      return true;
    })
    .catch((err) => {
      console.log(`Error with updating user info ${err}`);
      return false;
    });
}

function removeCurrUser() {
  sessionStorage.removeItem("user");
  localStorage.removeItem("jwt");
  document.cookie = "logged_in=false;SameSite=Lax";
  document.cookie = "jwt=null; SameSite=Lax";
}

// Check if JWT is expired
export async function checkJWT() {
  const details = getUserDetails();

  // No jwt, remove user
  if (!details) {
    removeCurrUser();
    return false;
  }

  let validSession = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/valid`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage["jwt"],
      },
      method: "GET",
    }
  );

  if (!validSession.ok) {
    removeCurrUser();
    return false;
  }

  const seconds = details["exp"];
  // const date = new Date(seconds * 1000)
  const currTime = new Date().getTime() / 1000;

  // Session expired, remove stored jwt and user
  if (seconds - currTime < 0) {
    console.log("logging out...");
    removeCurrUser();
    return false;
  }
  console.log("here");
  return true;
}

export function logout() {
  const jwt = localStorage["jwt"];
  localStorage.removeItem("jwt");
  sessionStorage.removeItem("user");
  fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    method: "POST",
  }).then((response) => {
    console.log("Successfully logged out");
    response;
  });
}
