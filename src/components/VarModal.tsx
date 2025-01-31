import { Dialog, DialogContent, DialogTitle, IconButton, styled } from "@mui/material";
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
    <h1>{props.title}</h1>
    <p>{props.message}</p>
    <BootstrapDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{props.title}</DialogTitle>
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
      <DialogContent>
        {props.message}
      </DialogContent>
    </BootstrapDialog>
    </>
}