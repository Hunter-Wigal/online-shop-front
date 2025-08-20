import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthTabs from "./AuthTabs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minHeight: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthCard(props: {
  openModal: boolean;
  handleCloseModal:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="login-modal"
        aria-describedby="login-modal"
      >
        <Box sx={style} className="auth-card">
          <AuthTabs setOpenModal={props.setOpenModal}></AuthTabs>
        </Box>
      </Modal>
    </>
  );
}
