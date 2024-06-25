import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import bankImg from "../../../../assets/images/bcs bank.png";
import mandiriImg from "../../../../assets/images/mandiri.png";
import { useNavigate } from "react-router-dom";

export default function FirstPaymentPage() {
  const navigate = useNavigate();
  const { control } = useForm();

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
    console.log(token);
  };

  return (
    <Container>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={4}
        width={"100%"}
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
            margin: "50px auto",
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
            p={6}
            onSubmit={handlePay}
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
                <Typography> $480 USD </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
                marginBottom={2}
              >
                <img src={bankImg} width={120} height={50} alt="..." />
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
                  sx={{ width: "100%" }}
                  bgcolor={"rgba(0, 0, 0, 0.04)"}
                  padding={3}
                >
                  <CardElement />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
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
                    onClick={() =>
                      // setActiveStep((prevActiveStep) => prevActiveStep - 1)
                      navigate("/")
                    }
                  >
                    <Typography sx={{ textAlign: "left", width: "100%" }}>
                      cancel
                    </Typography>
                  </Button>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    <Typography sx={{ textAlign: "left", width: "100%" }}>
                      pay
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/*Buttons */}
        </Stack>
      </Stack>
    </Container>
  );
}
