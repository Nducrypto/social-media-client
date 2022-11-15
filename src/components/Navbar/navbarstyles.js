import { makeStyles } from "@mui/styles";
import { orange, red } from "@mui/material/colors";

export default makeStyles((theme) => ({
  profile: {},

  purple: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: orange[500],
    marginRight: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: "auto",
    },
  },

  inputParent: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
  },

  input: {
    border: "none",
    borderRadius: "3rem",
    width: "13rem",
    [theme.breakpoints.down("sm")]: {
      width: "6rem",
    },
  },

  search: {
    marginRight: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: "auto",
    },
  },

  searchicon: {
    color: "white",
    "&:hover": {
      transitionDelay: "1",
      transform: "scale(1.3)",
    },
  },
}));
