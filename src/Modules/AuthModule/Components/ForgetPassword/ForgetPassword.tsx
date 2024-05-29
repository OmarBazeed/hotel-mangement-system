import Grid from "@mui/material/Grid";

import {
  Box,
  Button,
  CircularProgress,
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
import Styles from "./forgetPass.module.css";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../Utils/Utils";

export default function ForgetPassword() {
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();

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
        `${getBaseUrl()}/api/v0/admin/users/forgot-password`,
        data
      );
      setSpinner(false);
      toast.success(res.data.message, signUpWaitToast);
      navigate("/auth/reset-password")
      // savLoginData();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "user not registered",
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
          className={Styles.forgetPassContainer}
          sx={{ bgcolor: "#ffffff" }}
          container
          rowSpacing={1}
        >
          <Grid item md={6} m={1}>
            <img src={logo} className={Styles.logoimage} alt="favRooms" />
            <Grid item xs={10} sx={{ bgcolor: "", mt: -4, }} m={5}>
              <Typography variant="h4">Forgot Password</Typography>

              <Typography sx={{ my: 2, mb: 10 }}>
                If you already have an account registered
                <br />
                You can
                <Link className={Styles.loginHere} to="/auth">
                  {" "}
                  Login here !
                </Link>
              </Typography>
              <Typography variant="h6" sx={{
                 my: 0,
                 color: "#152C5B",
                 display: "flex",
                 alignItems: "left"
                 }}>Email
              </Typography>
              <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField sx={{bgcolor: '#F5F6F8'}}
                  {...register("email", {
                    required: "Email is required "
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
                
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 7, mb: 2, py: 1 }}
                  disabled={isClicked}
                >
                  {spinner ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "send mail"
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
              Sign in
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
