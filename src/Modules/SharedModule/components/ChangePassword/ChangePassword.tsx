import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import {
  chabgePassForm,
  changePassProps,
} from "../../../../Interfaces/interFaces";
import { passwordValidation } from "../../../../Utils/InputValidations";
import { getBaseUrl } from "../../../../Utils/Utils";
import logoDark from "../../../../assets/images/logo-dark.svg";
import Style from "./ChangePass.module.css";
export default function ChangePassword({
  openChangePass,
  setOpenChangePass,
}: changePassProps) {
  const { requestHeaders, logOut } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<chabgePassForm>();
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState("password");
  const [showNewPassword, setShowNewPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const changePassWaitToast = {
    onClose: () => {
      setIsClicked(false);
      setOpenChangePass(false);
      logOut();
      navigate("/");
    },
  };

  const onSubmit = async (data: chabgePassForm) => {
    setSpinner(true);
    setIsClicked(true);
    try {
      const res = await axios.post(
        `${getBaseUrl()}/api/v0/admin/users/change-password`,
        data,
        {
          headers: requestHeaders,
        }
      );

      setSpinner(false);
      toast.success(res.data.message, changePassWaitToast);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "fail signin",
          changePassWaitToast
        );
      }
      setSpinner(false);
    }
  };

  return (
    <>
      <div>
        <Modal
          open={openChangePass}
          onClose={() => setOpenChangePass(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className={`${Style.bgChange}`}
            sx={style}
            width={{ xl: "35%", lg: "45%", md: "55%", sm: "65%", xs: "90%" }}
          >
            <img width={"200px"} src={logoDark} alt="logo" />
            <Typography variant="h5">Change Your Password</Typography>
            <Box
              className="changePass"
              onSubmit={handleSubmit(onSubmit)}
              component="form"
              noValidate
              autoComplete="off"
              width={"100%"}
            >
              {/* oldPassword */}
              <Controller
                name="oldPassword"
                control={control}
                defaultValue=""
                rules={passwordValidation}
                render={({ field }) => (
                  <FormControl
                    sx={{ mt: 3, borderColor: "#fff" }}
                    error={!!errors.oldPassword}
                    fullWidth
                    {...field}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Old Password
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
              {errors?.oldPassword && (
                <Typography sx={{ ml: 2 }} variant="caption" color="error">
                  {errors?.oldPassword.message}
                </Typography>
              )}

              {/* new Password */}
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={passwordValidation}
                render={({ field }) => (
                  <FormControl
                    sx={{ mt: 3, borderColor: "#fff" }}
                    error={!!errors.newPassword}
                    fullWidth
                    {...field}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      type={showNewPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              setShowNewPassword(
                                showNewPassword === "password"
                                  ? "text"
                                  : "password"
                              );
                            }}
                            edge="end"
                          >
                            {showNewPassword === "password" ? (
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
              {errors?.newPassword && (
                <Typography sx={{ ml: 2 }} variant="caption" color="error">
                  {errors?.newPassword.message}
                </Typography>
              )}

              {/* confirm password */}
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "ConfirmPassword Is Required",
                  validate: (value) =>
                    value === watch("newPassword") ||
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
              {errors?.confirmPassword && (
                <Typography sx={{ ml: 2 }} variant="caption" color="error">
                  {errors?.confirmPassword?.message}
                </Typography>
              )}

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
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "60%",
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  px: 4,
};
