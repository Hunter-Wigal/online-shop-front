import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddressCard(){
    const [street1Valid, setStreet1Valid] = useState(true);
    const [street2Valid, setStreet2Valid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [stateValid, setStateValid] = useState(true);
    const [zipValid, setZipValid] = useState(true);

    return <Stack  spacing={{ xs: 1, sm: 2 }} direction="column"> 
        <TextField error={street1Valid} onChange={(event)=>{setStreet1Valid(false)}} className="row" fullWidth id="filled-basic" label="Street Address" variant="filled" />
        <TextField error={street2Valid} onChange={(event)=>{setStreet2Valid(false)}} className="row" fullWidth id="filled-basic" label="Street Address 2" variant="filled" />
        <Stack direction="row" spacing={{ xs: 1, sm: 1}} flexWrap="wrap" justifyContent="space-between">
            <TextField error={cityValid} onChange={(event)=>{setCityValid(false)}} sx={{minWidth: "30%"}} id="filled-basic" label="City" variant="filled" />
            <TextField error={stateValid} onChange={(event)=>{setStateValid(false)}} sx={{minWidth: "30%"}} id="filled-basic" label="State" variant="filled" />
            <TextField error={zipValid} onChange={(event)=>{setZipValid(false)}} sx={{minWidth: "30%"}} id="filled-basic" label="Zip Code" variant="filled" />
        </Stack>
    </Stack>
}