import React from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const InputAuth = ({
  name,
  onChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  disabled,
  rows,
  multiline,
  value,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      disabled={disabled}
      rows={rows}
      multiline={multiline}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

export default InputAuth;
