import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FormEvent, useContext, useState } from "react";
import { healthCheck } from "../services/health.service";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import * as as from "../services/authentication.service";
import { CartContext, CartContextType } from '../App';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ProductType } from "./ProductCard";

import "../styles/auth.scss";

export default function AuthTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  let navigate = useNavigate();
  let context = useContext(CartContext);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{paddingInline: "7.5%"}}>
            <Tab style={{fontSize: "1.25rem"}} label="Login" value="1" />
            <Tab style={{fontSize: "1.25rem"}} label="Register" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="1" className="forms"><LoginTab  navigate={navigate} context={context}/></TabPanel>
        <TabPanel value="2" className="forms"><RegisterTab navigate={navigate} context={context}/></TabPanel>
      </TabContext>
    </Box>
  );
}

function StyledInput(props: {
  label: string;
  value: any;
  setter: Function;
  type: string;
}) {
  return (
    <TextField
      fullWidth
      sx={{ marginBottom: "5% !important", width: "90%" }}
      id="outlined-basic"
      type={props.type}
      label={props.label}
      variant="outlined"
      color="secondary"
      // autoSave="false"
      value={props.value}
      onInput={(e) => props.setter((e.target as HTMLInputElement).value)}
    />
  );
}

async function register(
  e: FormEvent<HTMLFormElement>,
  name: string,
  age: number,
  email: string,
  password: string,
  navigate: NavigateFunction,
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>
) {
  e.preventDefault();
  if (await healthCheck()) {
    if (await as.register(email, password, name, age, setCart)) {
      return navigate("/account");
    } else {
      alert("Failed to register");
    }
  }
}


function RegisterTab(props: {navigate: NavigateFunction, context: CartContextType}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  return (
    <div className="login">
      <h1 style={{textDecoration: "underline"}}>Register</h1>
      <form
        autoComplete="off"
        onSubmit={async (e) =>
          register(
            e,
            name,
            age,
            registerEmail,
            registerPassword,
            props.navigate,
            props.context.setCart
          ).then(()=>{
              
          })
        }
      >
        <StyledInput
          label="Full Name"
          type="text"
          value={name}
          setter={setName}
        />
        <StyledInput label="Age" type="number" value={age} setter={setAge} />
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
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

function LoginTab(props: {navigate: NavigateFunction, context: CartContextType}) {
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (await healthCheck()) {
      as.login(loginEmail, loginPassword, props.context.setCart).then((result) => {
        if (result) return props.navigate("/account");
      });
    }
  }

  return (
    <div className="login">
      <h1 style={{textDecoration: "underline"}}>Login</h1>
      <form onSubmit={(e) => login(e)}>
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
          // onClick={() => login()}
          variant="outlined"
          color="secondary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
