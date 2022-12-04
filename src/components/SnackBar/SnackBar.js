import { Snackbar, Alert, Container } from "@mui/material";
import React from "react";
import { useStateContext } from "../../context/ContextProvider";

const CustomizedSnackbar = ({ message }) => {
  const { setSnackBarOpen, snackBarOpen } = useStateContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  return (
    <Container>
      <Snackbar
        sx={{
          width: "100%",
          zIndex: "15000000",
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          sx={{
            width: { xs: "70%", md: "40%", sm: "60%" },
            height: "5rem",
            backgroundColor: "white",
            color: "black",
            fontSize: {
              md: "1.1rem",
              lg: "1.3rem",
              sm: "1.05rem",
              xs: "0.9rem",
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomizedSnackbar;
