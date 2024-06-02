import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignInImg from "../../../../assets/images/login0.png";
import logo from "../../../../assets/images/Staycation.png";
import { FormData } from "../../../../Interfaces/interFaces";
import { getBaseUrl } from "../../../../Utils/Utils";
import Styles from "./Signin.module.css";
import {
  emailValidation,
  passwordValidation,
} from "../../../../Utils/InputValidations";
// import { FullscreenExit } from "../../../../../node_modules/@mui/icons-material/index";

export default function Signin() {
  const [showPassword, setShowPassword] = useState("password");
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [addAclass, setAddAclass] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateTolayout = (userInfo: string) => {
    userInfo == "admin" ? navigate("/dashboard") : navigate("/");
  };
  const signUpWaitToast = {
    onClose: () => setIsClicked(false),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSpinner(true);
    setIsClicked(true);
    try {
      const res = await axios.post(
        `${getBaseUrl()}/api/v0/admin/users/login`,
        data
      );
      localStorage.setItem("token", res.data.data.token);
      setSpinner(false);
      toast.success(res.data.message, signUpWaitToast);
      navigateTolayout(res.data.data.user.role);
      // savLoginData();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "fail signin",
          signUpWaitToast
        );
      }
      setSpinner(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 960 ? setAddAclass(true) : setAddAclass(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "beween",
          overflow: "hidden",
        }}
        className={`${addAclass ? Styles.bckChange : ""}`}
      >
        <Grid
          className={`${Styles.loginContainer}`}
          sx={{ bgcolor: addAclass ? "" : "#ffffff" }}
          container
          rowSpacing={1}
          px={3}
        >
          <Grid
            item
            md={5}
            sx={{ height: "100vh", paddingTop: "10px", paddingBottom: "10px" }}
            position="relative"
          >
            <img src={logo} className={Styles.logoimage} alt="favRooms" />
            <Grid
              item
              xs={10}
              sx={{ bgcolor: "" }}
              m={5}
              className={`${addAclass ? Styles.addBorder : ""} ${
                Styles.formContent
              }`}
            >
              <Typography variant="h4">Sign in</Typography>

              <Typography sx={{ my: 2 }}>
                If you don’t have an account register
                <br />
                You can
                <Link className={Styles.register} to="/auth/signup">
                  Register here !
                </Link>
              </Typography>
              {/*Form Sumbition */}
              <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
              >
                <Typography
                  variant="h6"
                  sx={{
                    my: 0,
                    display: "flex",
                    alignItems: "left",
                    color: {
                      xs: "black",
                      sm: "#152C5B",
                    },
                  }}
                >
                  Email Address
                </Typography>
                <TextField
                  sx={{ bgcolor: "#F5F6F8" }}
                  {...register("email", emailValidation)}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  error={!!errors?.email}
                />
                {errors?.email && (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                )}
                <Typography
                  variant="h6"
                  sx={{
                    my: 1,
                    mt: 8,
                    color: {
                      xs: "black",
                      sm: "#152C5B",
                    },
                    display: "flex",
                    alignItems: "left",
                  }}
                >
                  Password
                </Typography>
                <FormControl fullWidth sx={{ mb: 1, mt: 1 }} variant="outlined">
                  <InputLabel htmlFor="user-password">password</InputLabel>
                  <OutlinedInput
                    required
                    sx={{ bgcolor: "#F5F6F8" }}
                    {...register("password", passwordValidation)}
                    error={!!errors?.password}
                    id="user-password"
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
                  {errors?.password && (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
                <Grid container>
                  <Grid
                    justifyContent="end"
                    item
                    xs
                    sx={{ mb: 5, pb: 5, pt: 2, display: "flex" }}
                  >
                    <Link
                      className={Styles.register}
                      to="/auth/forget-password"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1,
                    filter: "drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.15))",
                  }}
                  disabled={isClicked}
                >
                  {spinner ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Box>
              {/*End Form */}
            </Grid>
          </Grid>

          <Grid
            className={Styles.imageContainer}
            sx={{ height: "100vh" }}
            item
            xs={5}
            md={7}
          >
            <img src={SignInImg} alt="Login Image" className={Styles.image} />
            <Typography variant="h4" className={Styles.imageText1}>
              Sign In To RoomHome
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
