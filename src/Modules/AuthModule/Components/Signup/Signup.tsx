import Grid from "@mui/material/Grid";

import {
  Box,
  Button,
  CircularProgress,
  // FormControl,
  IconButton,
  // InputAdornment,
  // InputLabel,
  // OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Styles from './Signup.module.css';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Context/Components/AuthContext";
import img from '../../../../assets/images/registerImg.png';
import logo from '../../../../assets/images/Staycation.png';
import { SignupFormData } from "../../../../Interfaces/Auth";
export default function Signup() {

  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("confirmPassword");
  const [spinner, setSpinner] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  // Todo: to be moved to AuthContext
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl } = authContext;

  const onSubmit = async (data: SignupFormData) => {
    const signupFormData = appendToFormData(data);
    setSpinner(true);

    await axios
      .post(`${baseUrl}/v0/admin/users`, signupFormData)
      .then((response) => {
        console.log(response);
        navigate("verify-account")
        setSpinner(false);
        toast.success("User Created Successfully");
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
        console.log(error);
        setSpinner(false);
      });
  };

  const appendToFormData = (data: SignupFormData) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("country", data.country);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    return formData;
  };
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
          className={Styles.signupContainer}
          sx={{ bgcolor: "#ffffff" }}
          container
          rowSpacing={1}
        >
          <Grid item md={6} m={1}>
            <img src={logo} className={Styles.logoimage} alt="favRooms" />
            <Grid item xs={10} sx={{ bgcolor: "" }} m={5}>
              <Typography variant="h4">Sign up</Typography>

              <Typography sx={{ my: 2 }}>
                If you already have an account 
                <br />
                You can
                <Link className={Styles.signup} to="/auth">
                  {" "}
                  Login here !
                </Link>
              </Typography>
              <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField
                  {...register("userName", {
                    required: "UserName is required ",
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userName"
                  error={!!errors?.userName}
                  helperText={
                    errors?.userName &&
                    errors?.userName.type === "required" &&
                    "UserName is required"
                  }
                />
                <TextField
                  {...register("phoneNumber", {
                    required: "PhoneNumber is required ",
                    pattern: /^01[0-2,5]{1}[0-9]{8}$/,
                  })}
                  margin="normal"
                  sx={{
                    '& > :not(style)': { m: 1 },
                    // textAlign: "left"
                  }}
                  type="tel"
                  required
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  error={!!errors?.phoneNumber}
                  helperText={
                    errors?.phoneNumber &&
                    errors?.phoneNumber.type === "required" &&
                    "PhoneNumber is required"
                  }
                />
                <TextField
                  {...register("country", {
                    required: "Country is required ",
                    minLength: 2,
                  })}
                  margin="normal"
                  sx={{
                    '& > :not(style)': { m: 1 },
                    // textAlign: "right"
                  }}
                  required
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  error={!!errors?.country}
                  helperText={
                    errors?.country &&
                    errors?.country.type === "required" &&
                    "Country is required"
                  }
                />
                <TextField
                  {...register("email", {
                    required: "Email is required ",
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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

                 <TextField
                  {...register("password", {
                    required: "Password is required ",
                    pattern:
                      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  type={showPassword}
                  endAdornment={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword(
                            showPassword === "password" ? "text" : "password"
                          );
                        }}
                        edge="end"
                      >
                      // Todo: toggle icon didn't work here
                        {showPassword === "password" ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                  }
                  error={!!errors?.password}
                  helperText={
                    errors?.password &&
                    errors?.password.type === "required" &&
                    " Password is required"
                  }
                />

                <TextField
                  {...register("confirmPassword", {
                    required: "ConfirmPassword is required ",
                    pattern:
                      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="ConfirmPassword"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  type={showConfirmPassword}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowConfirmPassword(
                          showConfirmPassword === "confirmPassword" ? "text" : "confirmPassword"
                        );
                      }}
                      edge="end"
                    >
                      // Todo: toggle icon didn't work here
                      {showPassword === "password" ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  }
                  error={!!errors?.password}
                  helperText={
                    errors?.password &&
                    errors?.password.type === "required" &&
                    "Confirm Password is required"
                  }

                />

                {/* <FormControl fullWidth sx={{ mb: 1, mt: 4 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                    // Todo: validation didn't work here
                    error={!!errors?.password}
                    helperText={
                      errors?.password &&
                      errors?.password.type === "required" &&
                      " Password is required"
                    }
                    className=""
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
                </FormControl> */}
                <Grid container>
                  <Grid
                    justifyContent="end"
                    item
                    xs
                    sx={{ mb: 5, pb: 5, pt: 2, display: "flex" }}
                  >
                    <Link className={Styles.register} to="/auth/forget-password">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 2, py: 1 }}
                >
                  {spinner ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Signin"
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
            <Typography variant="h4" textAlign={"center"} className={Styles.imageText1}>
              Sign up to Roamhome
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
