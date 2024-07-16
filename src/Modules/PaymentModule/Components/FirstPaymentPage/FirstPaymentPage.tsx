import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getBaseUrl } from "../../../../Utils/Utils";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import bankImg from "../../../../assets/images/bcs bank.png";
import mandiriImg from "../../../../assets/images/mandiri.png";

export default function FirstPaymentPage() {
  const navigate = useNavigate();
  const { control } = useForm();
  const { requestHeaders, bookingId, subtotal } = useAuth();
  const theme = useTheme();

  const steps = ["1", "2"];

  const [activeStep, setActiveStep] = useState(0);

  // STRIPE
  const elements = useElements();
  const stripe = useStripe();

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.log({ error: error });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (token) {
      try {
        const res = await axios.post(
          `${getBaseUrl()}/api/v0/portal/booking/${bookingId}/pay`,
          {
            token: token.id,
          },
          {
            headers: requestHeaders,
          }
        );
        toast.success(res.data.message || "Successfully paid");
        setTimeout(() => {
          navigate("/payment/confirm");
        }, 1000);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "Failed to book");
        }
      }
    }
  };

  return (
    <Container>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        sx={{
          marginTop: {
            xs: "15px",
            sm: "35px",
          },
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{
                      "& svg": {
                        width: "35px",
                        height: "35px",
                      },
                    }}
                  />
                </Step>
              );
            })}
          </Stepper>
        </Box>

        <Stack
          sx={{
            width: "100%",
            height: "70vh",
            textAlign: "center",
            margin: "30px auto",
          }}
        >
          <Box sx={{ marginBottom: "30px" }}>
            <Typography
              component={"h1"}
              sx={{ fontSize: "1.5em", fontWeight: "bold" }}
            >
              Payment
            </Typography>
            <Typography color={"gray"}>
              Kindly follow the instructions below
            </Typography>
          </Box>

          <Grid
            component={"form"}
            columns={12}
            container
            onSubmit={handlePay}
            p={4}
            sx={{
              paddingTop: {
                xs: "0",
                sm: "50px",
              },
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "15px",
              }}
            >
              <Typography>Transfer Pembayaran:</Typography>
              <Typography>Tax: 10%</Typography>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <Typography> Sub total:</Typography>
                <Typography color={"teal"} fontWeight={"bold"}>
                  ${subtotal} USD
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
                marginBottom={2}
              >
                <img src={bankImg} width={120} height={35} alt="..." />
                <Box textAlign={"left"}>
                  <Typography>Bank Central Asia</Typography>
                  <Typography>2208 1996</Typography>
                  <Typography>BuildWith Angga</Typography>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <img src={mandiriImg} width={120} height={70} alt="..." />
                <Box textAlign={"left"}>
                  <Typography>Bank Mandiri</Typography>
                  <Typography>2208 1996</Typography>
                  <Typography>BuildWith Angga</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "15px",
                marginTop: { xs: "2em", md: "0" },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                flexDirection={"column"}
                marginBottom={2}
                width={"100%"}
                gap={4}
              >
                <Box sx={{ width: "100%" }}>
                  <Controller
                    name="Name"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="text"
                        label="Name"
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Controller
                    name="phoneNumber"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="text"
                        label="Phone Number"
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                  }}
                  bgcolor={"rgba(0, 0, 0, 0.04)"}
                  padding={3}
                >
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color:
                            theme.palette.mode === "dark"
                              ? "#fff"
                              : theme.palette.text.primary,
                          "::placeholder": {
                            color:
                              theme.palette.mode === "dark"
                                ? "#BDBDBD"
                                : theme.palette.text.disabled,
                          },
                        },
                        invalid: {
                          color: theme.palette.error.main,
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 0,
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5em",
                  }}
                >
                  <Button
                    sx={{ width: "100%", textAlign: "left" }}
                    variant="contained"
                    color="error"
                    onClick={() => navigate("/")}
                  >
                    cancel
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    pay
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
