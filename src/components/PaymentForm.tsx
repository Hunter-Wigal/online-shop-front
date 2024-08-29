import { Autocomplete, TextField } from "@mui/material";

function StyledAutocomplete(props: { label: string, type: string, extraClass?: string}) {
  let extraClass = props.extraClass;
  if(!extraClass)
    extraClass = " "
    return (
      <Autocomplete
        sx={{ }}
        className={"mb-1" + " " + extraClass}
        renderInput={(params) => (
          <TextField
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

  export default function PaymentForm(){
    return(
        <div className="payment">
            <StyledAutocomplete label="Full Name" type="text" extraClass="full-column"/>
            <StyledAutocomplete label="Card Number" type="text" extraClass="full-column"/>
            <StyledAutocomplete label="Zip Code" type="text"/>
            <StyledAutocomplete label="Expiration Date" type="text"/>
            <StyledAutocomplete label="CVV" type="text"/>
        </div>
    )
  }