import Autocomplete from "@mui/material/Autocomplete";
import { SxProps, Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, useState } from "react";

function StyledAutocomplete(props: {
  label: string;
  type?: string;
  error?: boolean;
  autoComplete?: boolean;
  style?: SxProps<Theme> | undefined
  required?: boolean
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
          helperText={props.helperText}
          type={props.type}
          sx={ props.style }
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
      error={props.error}
      onChange={props.validate}
      helperText={props.helperText}
      type={props.type}
      sx={{"width": "75% !important", "marginTop": "1%"}}
      required={props.required}
      label={props.label}
    />
  );

  return input;
}

interface ShippingInputs{
  email: string,
  name: string,
  address: string,
  phoneNumber: string
}

export default function ShippingForm(props: {formValidHander: React.Dispatch<React.SetStateAction<boolean>>, setShippingVal: (val: Function)=>void}) {
  const setFormValid = props.formValidHander;
  const [shippingInputs, setShippingInputs] = useState<ShippingInputs>({email: "", name: "", address: "", phoneNumber: ""})
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  const validCheck = (formVal: boolean, stateUpdate: React.Dispatch<React.SetStateAction<any>>, newState: boolean)=>{
    setFormValid(formVal);
    stateUpdate(newState);
  };

  const finalValidation = () =>{
    if(shippingInputs.name.length < 3 || shippingInputs.email.length < 5 || shippingInputs.address.length < 5 || shippingInputs.phoneNumber.length < 10){
      return false;
    }
    return false;
  }
  props.setShippingVal(finalValidation);

// TODO change to not use autocomplete unless necessary
  return (
    <div className="delivery">
      <StyledAutocomplete
        label="Name"
        error={!nameValid}
        required={true}
        helperText="Please enter your name"
        validate={(event) => {
          console.log(event.target.value);
          let newInputs = shippingInputs;
          newInputs.name = event.target.value;
          setShippingInputs(newInputs);
          setNameValid(true);
        }}
      ></StyledAutocomplete>
      <StyledAutocomplete
        label="Address"
        validate={(test) => {console.log(test.target.value); return false}}
        required={true}
      ></StyledAutocomplete>
      <StyledAutocomplete
        label="Email"
        error={!emailValid}
        validate={(event) => {
          let email = event.target.value;
          if (
            (!email.includes("@") || !email.includes(".com")) &&
            email.length > 0
          ) {
            validCheck(false, setEmailValid, false);
          } else {
            validCheck(false, setEmailValid, true);
          }
        }}
      ></StyledAutocomplete>
      <StyledAutocomplete
        label="Phone Number"
        validate={() => {}}
        required={true}
      ></StyledAutocomplete>
    </div>
  );
}
