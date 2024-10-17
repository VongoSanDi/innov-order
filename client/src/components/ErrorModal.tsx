import { useError } from "@/context/ErrorContext";
import { Modal, Box, Typography } from "@mui/material";

const style = {
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ErrorModal = () => {
  const { error, setError } = useError()
  const handleClose = () => {
    setError(null)
  };

  if (!error) return null

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={!!error}
        onClose={handleClose}
      >
        <Box sx={style}>
          {/* <Typography id="transition-modal-title" variant="h6" component="h2"> */}
          {/*   Text in a modal */}
          {/* </Typography> */}
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ErrorModal
