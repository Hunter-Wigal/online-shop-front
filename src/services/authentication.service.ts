import { jwtDecode } from "jwt-decode";
import { checkCart } from "./account.service";
import { ProductType } from "../components/ProductCard";

export interface User {
  username: string;
  full_name: string;
  sessionID: string;
  sessionExp: Date;
}

export async function login(username: string, password: string, setCart: React.Dispatch<React.SetStateAction<ProductType[]>>) {
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
      // document.cookie = "jwt=" + token + `;expires=${new Date(exp * 1000)}`;
      response = result;

      await setCurrentUser(username);

      checkCart().then((response)=>{
        setCart(response);
      });
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
  age: number,
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>
) {
  return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email: username, password: password }),
  })
    .then(async (response) => {
      // let result = await response.text();
      response;
      let success = await login(username, password, setCart);

      if (success) {
        await updateUser(username, age, name);
        
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

export function getUserDetails(jwt: string): JWTDetails | null {
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
      console.log("Setting user");
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

// function deleteAllCookies() {
//   document.cookie.split(";").forEach((cookie) => {
//     const eqPos = cookie.indexOf("=");
//     const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
//     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   });
// }

function removeCurrUser() {
  sessionStorage.removeItem("user");
  localStorage.removeItem("jwt");
  // deleteAllCookies();
}

// Check if JWT is expired
export async function checkJWT() {

  const details = getUserDetails(localStorage["jwt"]);

  // Reset if no jwt
  if (!details) {
    removeCurrUser();
    return false;
  }

  let exp = new Date(details.exp * 1000);

  let validSession = exp > new Date();

  if (!validSession) {
    removeCurrUser();
    return false;
  }

  return true;
}

export function logout(setCart: React.Dispatch<React.SetStateAction<ProductType[]>>) {
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

  checkCart().then((response)=>{

    setCart(response);
  });
}
