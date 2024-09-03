import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "../styles/auth.scss";
import * as as from "../services/authentication.service";
import { NavigateFunction, useNavigate } from "react-router-dom";

async function checkStatus() {
  return fetch("http://localhost:8080/api/v1/auth", { mode: "no-cors" })
    .then(() => {
      console.log("Request sent with no-cors mode");
      return true;
    })
    .catch(() => {
      alert("Server is currently unavailable");
      return false;
    });
}

async function register(
  name: string,
  age: number,
  email: string,
  password: string,
  navigate: NavigateFunction
) {
  if (await checkStatus()) {
    if (await as.register(email, password, name, age)) {
      return navigate("/account");
    } else {
      alert("Failed to register");
    }
  }
}

function StyledInput(props: {
  label: string;
  value: any;
  setter: Function;
  type: string;
}) {
  return (
    <TextField
      sx={{ marginBottom: "1.5% !important" }}
      id="outlined-basic"
      type={props.type}
      label={props.label}
      variant="outlined"
      color="secondary"
      autoSave="false"
      value={props.value}
      onInput={(e) => props.setter((e.target as HTMLInputElement).value)}
    />
  );
}

export default function Auth() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");



  async function login() {
    if (await checkStatus()) {
      as.login(loginEmail, loginPassword).then(result => {if(result) return navigate("/account");})

    }
  }

  return (
    <>
      <div className="forms">
        <div className="login">
          <h1>Register</h1>
          <form autoComplete="off">
            <StyledInput
              label="Full Name"
              type="text"
              value={name}
              setter={setName}
            />
            <StyledInput
              label="Age"
              type="number"
              value={age}
              setter={setAge}
            />
            <StyledInput
              label="Email"
              type="text"
              value={registerEmail}
              setter={setRegisterEmail}
            />
            <StyledInput
              label="Password"
              type="text"
              value={registerPassword}
              setter={setRegisterPassword}
            />

            <Button
              className="submit"
              variant="outlined"
              color="secondary"
              onClick={async () =>
                register(name, age, registerEmail, registerPassword, navigate)
              }
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="login">
          <h1>Login</h1>
          <form>
            <StyledInput
              label="Email"
              type="text"
              value={loginEmail}
              setter={setLoginEmail}
            />
            <StyledInput
              label="Password"
              type="password"
              value={loginPassword}
              setter={setLoginPassword}
            />

            <Button
              className="submit"
              onClick={() => login()}
              variant="outlined"
              color="secondary"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
