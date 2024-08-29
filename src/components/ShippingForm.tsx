import { Autocomplete, TextField } from "@mui/material";
import { ChangeEventHandler, useState } from "react";

function StyledAutocomplete(props: {
  label: string;
  type?: string;
  error?: boolean;
  validate:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  helperText?: string;
}) {
  return (
    <Autocomplete
      sx={{ width: "50%" }}
      className="mb-1"
      renderInput={(params) => (
        <TextField
          error={props.error}
          onChange={props.validate}
          helperText={props.helperText}
          type={props.type}
          sx={{ width: "100% !important" }}
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
      options={["Autofill will be added later..."]}
    ></Autocomplete>
  );
}

export default function ShippingForm() {
  const [emailValid, setEmailValid] = useState(true);

  return (
    <div className="delivery">
      <StyledAutocomplete
        label="Name"
        validate={(event) => {
          console.log(event.target.value);
        }}
      ></StyledAutocomplete>
      <StyledAutocomplete
        label="Address"
        validate={() => {}}
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
            setEmailValid(false);
          } else {
            setEmailValid(true);
          }
        }}
      ></StyledAutocomplete>
      <StyledAutocomplete
        label="Phone Number"
        validate={() => {}}
      ></StyledAutocomplete>
    </div>
  );
}
