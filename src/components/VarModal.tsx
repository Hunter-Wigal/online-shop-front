import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export default function VarModal(props: {title: string, message: string, startState: boolean}){
    const [open, setOpen] = useState(props.startState);

    const handleClose = () => {
        setOpen(false);
      };

    return <>
    <BootstrapDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>{props.title}</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      <DialogContent sx={{marginBottom: "1rem"}}>
        {props.message}
      </DialogContent>
    </BootstrapDialog>
    </>
}