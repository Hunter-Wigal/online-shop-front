import { Box, Modal } from "@mui/material";
import AuthTabs from './AuthTabs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  minHeight: "60%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AuthCard(props: {openModal: boolean, handleCloseModal: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined}) {
  return (
    <>
      <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AuthTabs></AuthTabs>
        </Box>
      </Modal>
    </>
  );
}
