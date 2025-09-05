import Autocomplete from "@mui/material/Autocomplete";
import { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, useState } from "react";
import AddressCard from "./AddressCard";
import Box from "@mui/material/Box";

function StyledAutocomplete(props: {
  label: string;
  type?: string;
  error?: boolean;
  autoComplete?: boolean;
  style?: SxProps<Theme> | undefined;
  required?: boolean;
  validate:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  helperText?: string;
}) {
  let input = props.autoComplete ? (
    <Autocomplete
      sx={{ width: "50%" }}
      className="mb-1"
      renderInput={(params) => (
        <TextField
          error={props.error}
          onChange={props.validate}
          helperText={!props.error ? props.helperText : ""}
          type={props.type}
          sx={props.style}
          {...params}
          label={props.label}
          slotProps={{
            input: params.InputProps,
          }}
        />
      )}
      options={["Autofill will be added later..."]}
    ></Autocomplete>
  ) : (
    <TextField
      error={!props.error}
      onChange={props.validate}
      helperText={!props.error ? props.helperText : ""}
      type={props.type}
      sx={{ width: "75% !important", marginTop: "1%" }}
      required={props.required}
      label={props.label}
    />
  );

  return input;
}

interface ShippingInputs {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export default function ShippingForm(props: {
  setShippingVal: (val: Function) => void;
}) {
  const [shippingInputs, setShippingInputs] = useState<ShippingInputs>({
    email: "",
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  /**
   * Calls form valid handler from checkout page and calls passed statehandler with new value
   *
   * @param {React.Dispatch<React.SetStateAction<any>>} stateUpdate
   * @param {boolean} newState
   */
  const validCheck = (
    stateUpdate: React.Dispatch<React.SetStateAction<any>>,
    newState: boolean
  ) => {
    stateUpdate(newState);
  };
  setAddressValid(true);
  function finalValidation() {
    if (
      !nameValid ||
      shippingInputs.name.length < 1 ||
      !emailValid ||
      shippingInputs.email.length < 1 ||
      !addressValid ||
      !phoneValid ||
      shippingInputs.phoneNumber.length < 9
    ) {
      return false;
    }
    return true;
  }

  props.setShippingVal(finalValidation);

  // TODO change to not use autocomplete unless necessary
  return (
    <div className="delivery">
      <StyledAutocomplete
        label="Name"
        error={nameValid}
        required={true}
        helperText={"Please enter your name"}
        validate={(event) => {
          let name = event.target.value;
          let newInputs = shippingInputs;
          newInputs.name = name;

          if (name.length > 0 && name.length < 5) {
            validCheck(setNameValid, false);
          } else {
            validCheck(setNameValid, true);
          }
        }}
      ></StyledAutocomplete>
      <StyledAutocomplete
        label="Email"
        error={emailValid}
        helperText={"Please enter your email address"}
        validate={(event) => {
          let email = event.target.value;
          let newInputs = shippingInputs;
          newInputs.email = event.target.value;
          setShippingInputs(newInputs);
          if (
            (!email.includes("@") || !email.includes(".com")) &&
            email.length > 0
          ) {
            validCheck(setEmailValid, false);
          } else {
            validCheck(setEmailValid, true);
          }
        }}
      ></StyledAutocomplete>
      <StyledAutocomplete
        label="Phone Number"
        validate={(event) => {
          let phone = event.target.value;
          let newInputs = shippingInputs;
          newInputs.phoneNumber = event.target.value;
          setShippingInputs(newInputs);

          if (phone.length > 0 && phone.length < 10) {
            validCheck(setPhoneValid, false);
          } else {
            validCheck(setPhoneValid, true);
          }
        }}
        error={phoneValid}
        required={true}
        helperText={"Please enter your phone number without dashes or spaces"}
      ></StyledAutocomplete>

      <Box sx={{ marginTop: "2%", width: "75%" }}>
        <AddressCard />
      </Box>
    </div>
  );
}
