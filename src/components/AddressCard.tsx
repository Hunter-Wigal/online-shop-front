import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const validChecker = function(value: string, pattern: RegExp, setter: React.Dispatch<React.SetStateAction<boolean>>){
    pattern.test(value) ? setter(true) : setter(false);
}

export default function AddressCard(){
    const [street1Valid, setStreet1Valid] = useState(true);
    // const [street2Valid, setStreet2Valid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [stateValid, setStateValid] = useState(true);
    const [zipValid, setZipValid] = useState(true);


    return <Stack  spacing={{ xs: 1, sm: 2 }} direction="column"> 
        <TextField error={!street1Valid} onChange={(event)=>{validChecker(event.target.value, /[0-9]+\s[A-Z]+[a-zA-Z0-9]+/, setStreet1Valid)}} className="row" fullWidth id="filled-basic" label="Street Address" variant="filled" />
        <TextField error={false} className="row" fullWidth id="filled-basic" label="Street Address 2" variant="filled" />
        <Stack direction="row" spacing={{ xs: 1, sm: 1}} flexWrap="wrap" justifyContent="space-between">
            <TextField error={!cityValid} onChange={(event)=>{validChecker(event.target.value, /[A-Za-z]{3,}/, setCityValid)}} sx={{minWidth: "30%"}} id="filled-basic" label="City" variant="filled" />
            <TextField error={!stateValid} onChange={(event)=>{validChecker(event.target.value, /[A-Z]{2}/, setStateValid)}} sx={{minWidth: "30%"}} id="filled-basic" label="State" variant="filled" />
            <TextField error={!zipValid} onChange={(event)=>{validChecker(event.target.value, /[0-9]{5}/, setZipValid)}} sx={{minWidth: "30%"}} id="filled-basic" label="Zip Code" variant="filled" />
        </Stack>
    </Stack>
}