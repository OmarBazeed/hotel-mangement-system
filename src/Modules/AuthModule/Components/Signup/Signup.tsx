import {
  CloudUpload,
  Visibility,
  VisibilityOff,
  DeleteForever,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../../../../Context/Components/AuthContext";
import { RegisterFormData } from "../../../../Interfaces/interFaces";
import { getBaseUrl } from "../../../../Utils/Utils";
import logoDark from "../../../../assets/images/logo-dark.svg";
import logoLight from "../../../../assets/images/logo-light.svg";
import Style from "../Auth.module.css";

export default function Signup() {
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");

  const signUpWaitToast = {
    onClose: () => setIsClicked(false),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();
 
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setSpinner(true);
    setIsClicked(true);
    const registerFormData = appendToFormData(data);
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/v0/admin/users`,
        registerFormData
      );
      setSpinner(false);
      toast.success(response.data.message, signUpWaitToast);
      console.log(response.data.message);

      navigate("/auth");
      // savLoginData();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);

        toast.error(
          error.response.data.message || "Cannot Reset Password",
          signUpWaitToast
        );
      }
      setSpinner(false);
    }
    console.log(data);
  };
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl } = authContext;

  const appendToFormData = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("role", "user");
    formData.append("profileImage", data.profileImage[0]);

    return formData;
  };

  return (
    <>
      <Box
        component={"section"}
        minHeight={"100vh"}
        sx={{ pt: { xs: "0px", md: "24px" } }}
        className={`${Style.signInBody}`}
      >
        <Box
          sx={{ display: { xs: "none", md: "block" } }}
          left={50}
          top={30}
          position={"absolute"}
        >
          <img width={"150px"} src={isDark ? logoDark : logoLight} alt="logo" />
        </Box>
        <Box
          sx={{ display: { xs: "block", md: "none" } }}
          left={50}
          top={30}
          position={"absolute"}
        >
          <img width={"150px"} src={logoDark} alt="logo" />
        </Box>
        <Grid
          container
          minHeight={"96vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            pt={8}
            width={"100%"}
            height={"100%"}
            item
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            xs={12}
            md={6}
            className={`${Style.signUp} ${Style.ptXs}`}
          >
            <Box width={{ md: "65%", xs: "90%" }}>
              <Box>
                <Typography mb={3} fontWeight={"500"} variant="h5">
                  Sign up
                </Typography>
                <Typography fontWeight={"500"} variant="body2">
                  If you already have an account register
                </Typography>
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  fontWeight={"500"}
                  variant="body2"
                >
                  You can
                  <Button variant="text" color={"error"}>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/auth"}
                    >
                      Login here !
                    </Link>
                  </Button>
                </Typography>
                {/* login form */}
                <Box
                  onSubmit={handleSubmit(onSubmit)}
                  component="form"
                  noValidate
                  autoComplete="off"
                  width={"100%"}
                >
                  <Controller
                    name="userName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "User Name Is Required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="text"
                        label="User Name"
                        sx={{ mt: 3 }}
                        error={!!errors.userName}
                        helperText={
                          errors.userName ? errors.userName?.message : ""
                        }
                      />
                    )}
                  />
                  <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Phone Number Is Required",
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            type="text"
                            label="Phone Number"
                            sx={{ mt: 3 }}
                            error={!!errors.phoneNumber}
                            helperText={
                              errors.phoneNumber
                                ? errors.phoneNumber?.message
                                : ""
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="country"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Country Is Required",
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            type="text"
                            label="Country"
                            sx={{ mt: 3 }}
                            error={!!errors.country}
                            helperText={
                              errors.country ? errors.country?.message : ""
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "E-mail Is Required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Email is invalid",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="text"
                        label="E-mail Address"
                        sx={{ mt: 3 }}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email?.message : ""}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      pattern: {
                        value:
                          /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
                        message:
                          "Password must contain at least one digit, lowercase letter, uppercase letter, special character",
                      },
                      minLength: {
                        value: 6,
                        message: "Minimum length should be 6 characters",
                      },
                      maxLength: {
                        value: 16,
                        message: "Maximum length exceeded 16",
                      },
                    }}
                    render={({ field }) => (
                      <FormControl
                        sx={{ mt: 3 }}
                        error={!!errors.password}
                        fullWidth
                        {...field}
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          type={showPassword}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  setShowPassword(
                                    showPassword === "password"
                                      ? "text"
                                      : "password"
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
                    )}
                  />
                  {errors.password && (
                    <Typography sx={{ ml: 2 }} variant="caption" color="error">
                      {errors.password.message}
                    </Typography>
                  )}
                  {/* confirm password */}
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") ||
                        "Confirm Password do not match",
                    }}
                    render={({ field }) => (
                      <FormControl
                        sx={{ mt: 3 }}
                        error={!!errors.confirmPassword}
                        fullWidth
                        {...field}
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Confirm Password
                        </InputLabel>
                        <OutlinedInput
                          type={showConfirmPassword}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  setShowConfirmPassword(
                                    showConfirmPassword === "password"
                                      ? "text"
                                      : "password"
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
                          label="Confirm Password"
                        />
                      </FormControl>
                    )}
                  />
                  {errors.confirmPassword && (
                    <Typography sx={{ ml: 2 }} variant="caption" color="error">
                      {errors.confirmPassword.message}
                    </Typography>
                  )}
                  {/* image  */}
                  <Box className={`${Style.formImage}`}>
                    <Box className={`mb-2 `}>
                      <input
                        {...register("profileImage", {
                          required: "Image is Required",
                        })}
                        type="file"
                        accept="image/*"
                        onChange={({ target: { files } }: string) => {
                          files[0] && setFileName(files[0].name);
                          if (files) {
                            setImage(URL.createObjectURL(files[0]));
                            console.log(URL.createObjectURL(files[0]));
                          }
                        }}
                      />
                      {image ? (
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <img
                            src={image}
                            width={60}
                            height={60}
                            alt={fileName}
                          />
                        </Box>
                      ) : (
                        <Box
                          py={1}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <CloudUpload />
                          <span> Choose a Item Image to Upload</span>
                        </Box>
                      )}
                    </Box>
                    <span>
                      {fileName}
                      {image ? (
                        <DeleteForever
                          color="error"
                          sx={{ ml: ".6rem", cursor: "pointer" }}
                          onClick={() => {
                            setFileName("No Selected File");
                            setImage(null);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </span>
                    {errors.profileImage && (
                      <Typography
                        sx={{ ml: 2 }}
                        variant="caption"
                        color="error"
                      >
                        {errors.profileImage.message}
                      </Typography>
                    )}
                  </Box>

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
                      "Sign up"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            position={"relative"}
            sx={{
              display: { xs: "none", md: "block" },
            }}
            item
            xs={12}
            md={6}
            className={`${Style.signUPCol}`}
          >
            <Box position={"absolute"} top={"80%"} left={"10%"}>
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#FDFFFC",
                  fontSize: { lg: "2.5rem", md: "2.2rem" },
                }}
              >
                Sign up to Roamhome
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  color: "#FDFFFC",
                  fontSize: "1.3rem",
                }}
              >
                Homes as unique as you.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
