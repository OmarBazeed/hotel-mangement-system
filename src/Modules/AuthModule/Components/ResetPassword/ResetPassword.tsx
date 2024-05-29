import Grid from "@mui/material/Grid";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import img from "../../../../assets/images/resetPass.png";
import logo from "../../../../assets/images/Staycation.png";
import { AuthContext } from "../../../../Context/Components/AuthContext";
import { FormData } from "../../../../Interfaces/interFaces";
import Styles from "./ResetPass.module.css";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../Utils/Utils";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const signUpWaitToast = {
    onClose: () => setIsClicked(false),
  };

  const validateConfirmPassword = (value: string) => {
    const newPassword = getValues("password");
    return value === newPassword || "Passwords do not match";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSpinner(true);
    setIsClicked(true);
    try {
      const res = await axios.post(
        `${getBaseUrl()}/api/v0/admin/users/reset-password`,
        data
      );
      setSpinner(false);
      toast.success(res.data.message, signUpWaitToast);
      navigate("/auth")
      // savLoginData();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "Cannot Reset Password",
          signUpWaitToast
        );
      }
      setSpinner(false);
    }
  };
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl } = authContext;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
          // border: '1px solid',
          // borderColor: "divider",
          // borderRadius: 2,
          // bgcolor: "#cfe8fc",
          // color: "text.secondary",
          // "& svg": {
          //   m: 1,
          // },
        }}
      >
        <Grid
          className={Styles.loginContainer}
          sx={{ bgcolor: "#ffffff" }}
          container
          rowSpacing={1}
        >
          <Grid item md={6} m={1}>
            <img src={logo} className={Styles.logoimage} alt="favRooms" />
            <Grid item xs={10} sx={{ bgcolor: "", mt: -4 }} m={5}>
              <Typography variant="h4">Reset Password</Typography>

              <Typography sx={{ my: 2 }}>
                If you already have an account registered 
                <br />
                You can
                <Link className={Styles.register} to="/auth">
                  {" "}
                  login here !
                </Link>
              </Typography>
              <Typography variant="h6" sx={{
                 my: 0,
                 color: "#152C5B",
                 display: "flex",
                 alignItems: "left"
                 }}>Email Address
              </Typography>
              <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField sx={{bgcolor: '#F5F6F8'}}
                  {...register("email", {
                    required: "Email is required ",
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Please type here"
                  name="email"
                  autoComplete="email"
                  error={!!errors?.email}
                  helperText={
                    errors?.email &&
                    errors?.email.type === "required" &&
                    " Email is required"
                  }
                  // {String(errors?.email? errors.email.message:"")}
                  // autoFocus
                />

                <Typography variant="h6" sx={{
                  my: 1,
                  mt: 2,
                  color: "#152C5B",
                  display: "flex",
                  alignItems: "left"
                  }}>Password
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 1, mt: 1 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Please type here
                  </InputLabel>
                  <OutlinedInput sx={{bgcolor: '#F5F6F8'}}
                    {...register("password", {
                      required: "Password is required",
                      pattern:
                        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                    error={!!errors?.password}
                    margin="normal"
                    required
                    fullWidth
                    className=""
                    helperText={
                      errors?.password &&
                      errors?.password === "required" &&
                      " Password is required"
                    }
                    id="outlined-adornment-password"
                    type={showPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword(
                              showPassword === "password" ? "text" : "password"
                            );
                          }}
                          edge="end"
                        >
                          {showPassword === "password" ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <Typography variant="h6" sx={{
                  my: 1,
                  mt: 2,
                  color: "#152C5B",
                  display: "flex",
                  alignItems: "left"
                  }}>Confirm Password
                </Typography>
                <FormControl fullWidth sx={{ mb: 1, mt: 1 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Please type here
                  </InputLabel>
                  <OutlinedInput sx={{bgcolor: '#F5F6F8'}}
                    {...register("confirmPassword", {
                      required: true,
                      validate: validateConfirmPassword,
                    })}
                    error={!!errors?.confirmPassword}
                    margin="normal"
                    required
                    fullWidth
                    className=""
                    id="outlined-adornment-password"
                    type={showConfirmPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowConfirmPassword(
                              showConfirmPassword === "password" ? "text" : "password"
                            );
                          }}
                          edge="end"
                        >
                          {showConfirmPassword === "password" ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="confirmPassword"
                  />
                </FormControl>


                <Typography variant="h6" sx={{
                  my: 1,
                  mt: 2,
                  color: "#152C5B",
                  display: "flex",
                  alignItems: "left"
                  }}>OTP
                </Typography>
                <FormControl fullWidth sx={{ mb: 1, mt: 1 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Please type here
                  </InputLabel>
                  <OutlinedInput sx={{bgcolor: '#F5F6F8'}}
                    {...register("seed", {
                      required: true,
                    })}
                    error={!!errors?.seed}
                    className=""
                    id="outlined-adornment-password"
                    label="seed"
                  />
                </FormControl>
                
                

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 2, py: 1 }}
                  disabled={isClicked}
                >
                  {spinner ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Reset"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid
            className={Styles.imageContainer}
            sx={{ height: "100%" }}
            item
            xs={5}
          >
            <img src={img} alt="Login Image" className={Styles.image} />
            <Typography variant="h4" className={Styles.imageText1}>
              Reset Password
            </Typography>

            <Typography variant="h6" className={Styles.imageText}>
              Homes as unique as you.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
