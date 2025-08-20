import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function AddressCard(){

    return <Stack  spacing={{ xs: 1, sm: 2 }} direction="column"> 
        <TextField className="row" fullWidth id="filled-basic" label="Street Address" variant="filled" />
        <TextField className="row" fullWidth id="filled-basic" label="Street Address 2" variant="filled" />
        <Stack direction="row" spacing={{ xs: 1, sm: 1}} flexWrap="wrap" justifyContent="space-between">
            <TextField sx={{minWidth: "30%"}} id="filled-basic" label="City" variant="filled" />
            <TextField sx={{minWidth: "30%"}} id="filled-basic" label="State" variant="filled" />
            <TextField sx={{minWidth: "30%"}} id="filled-basic" label="Zip Code" variant="filled" />
        </Stack>
    </Stack>
}