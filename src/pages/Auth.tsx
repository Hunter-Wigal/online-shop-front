import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "../styles/auth.scss";
import * as as from "../services/authentication.service";
import { Navigate, useNavigate } from "react-router-dom";


async function register(
  name: string,
  age: number,
  email: string,
  password: string
) {
  await as.register(email, password, name, age);
}



export default function Auth() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function login(){
    as.login(email, password);
    return navigate('/account');
}

  return (
    <>
      <div className="forms">
        <div className="login">
          <h1>Register</h1>
          <form>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
            />
            <TextField
              id="outlined-basic"
              type="number"
              label="Age"
              variant="outlined"
              value={age}
              onInput={(e) =>
                setAge(Number((e.target as HTMLInputElement).value))
              }
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            />
            <Button className="submit" onClick={async () => register(name, age, email, password)}>
              Submit
            </Button>
          </form>
        </div>
        <div className="login">
          <h1>Login</h1>
          <form>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            />
            <Button className="submit" onClick={() => login()}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
