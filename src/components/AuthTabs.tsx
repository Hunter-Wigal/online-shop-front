import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FormEvent, useContext, useState } from "react";
import { healthCheck } from "../services/health.service";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as as from "../services/authentication.service";
import { AdminContext, AdminContextType, CartContext, CartContextType } from "../App";
import { NavigateFunction, useNavigate } from "react-router-dom";

import "../styles/auth.scss";

export default function AuthTabs(props: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  let navigate = useNavigate();
  let cartContext = useContext(CartContext);
  let adminContext = useContext(AdminContext);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ paddingInline: "7.5%" }}
          >
            <Tab style={{ fontSize: "1.25rem" }} label="Login" value="1" />
            <Tab style={{ fontSize: "1.25rem" }} label="Register" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="1" className="forms">
          <LoginTab
            navigate={navigate}
            context={cartContext}
            adminContext={adminContext}
            setOpenModal={props.setOpenModal}
          />
        </TabPanel>
        <TabPanel value="2" className="forms">
          <RegisterTab
            navigate={navigate}
            context={cartContext}
            adminContext={adminContext}
            setOpenModal={props.setOpenModal}
          />
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}

function StyledInput(props: {
  label: string;
  value: any;
  setter: Function;
  type: string;
  validation?: Function;
  valid: boolean;
}) {
  return (
    <TextField
      fullWidth
      error={!props.valid}
      sx={{ marginBottom: "5% !important", width: "90%" }}
      id="outlined-basic"
      type={props.type}
      label={props.label}
      variant="outlined"
      color="secondary"
      // autoSave="false"
      value={props.value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.setter(event.target.value);
      }}
    />
  );
}

function RegisterTab(props: {
  navigate: NavigateFunction;
  context: CartContextType;
  adminContext: AdminContextType
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);



  return (
    <div className="login">
      <h1 style={{ textDecoration: "underline" }}>Register</h1>
      <form
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!nameValid && !emailValid && !passwordValid) return
          if (await healthCheck()) {
            if (
              await as.register(
                registerEmail,
                registerPassword,
                name,
                age,
                props.context.setCart
              )
            ) {
              props.setOpenModal(false);
              return props.navigate("/account");
            } else {
              alert("Failed to register");
            }
          }
        }}
      >
        <StyledInput
          label="Full Name"
          type="text"
          value={name}
          setter={setName}
          validation={(value: string) => {
            if (value.length < 5) {
              setNameValid(false);
            }
          }}
          valid={nameValid}
        />
        {/* //TODO remove age input, probably not needed */}
        <StyledInput
          label="Age"
          type="number"
          value={age}
          setter={(value: any)=>{
            if(!isNaN(value)){
              setAge(value);
            }
          }
            
            }
          valid={true}
        />
        <StyledInput
          label="Email"
          type="text"
          value={registerEmail}
          setter={setRegisterEmail}
          validation={(value: string) => {
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
              setEmailValid(true);
            else setEmailValid(false);
          }}
          valid={emailValid}
        />
        <StyledInput
          label="Password"
          type="text"
          value={registerPassword}
          setter={setRegisterPassword}
          valid={passwordValid}
          validation={(value: string) => {
            if (value.length < 6){
              setPasswordValid(false);
            }
          }}
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

function LoginTab(props: {
  navigate: NavigateFunction;
  context: CartContextType;
  adminContext: AdminContextType
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (await healthCheck()) {
      as.login(loginEmail, loginPassword, props.context.setCart).then(
        (result) => {
          if (result) {
            props.setOpenModal(false);
            as.checkAdmin().then((admin)=>{
              props.adminContext.setAdmin(admin);
              if (admin) return props.navigate("/admin");
              else return props.navigate("/account");
            })
          }
        }
      );
    }
  }

  return (
    <div className="login">
      <h1 style={{ textDecoration: "underline" }}>Login</h1>
      <form onSubmit={(e) => login(e)}>
        <StyledInput
          label="Email"
          type="text"
          value={loginEmail}
          setter={setLoginEmail}
          valid={emailValid}
          validation={(value: string) => {
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
              setEmailValid(true);
            else setEmailValid(false);
          }}
        />
        <StyledInput
          label="Password"
          type="password"
          value={loginPassword}
          setter={setLoginPassword}
          valid={passwordValid}
          validation={(value: string) => {
            if(value.length < 6)
              setPasswordValid(false);
            
              else setPasswordValid(true);
            }
          }
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
