import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import successPayImg from "../../../../assets/images/successPay.png";
import { useNavigate } from "react-router-dom";

export default function ConfirmPayment() {
  const steps = ["1", "2"];
  const navigate = useNavigate();
  return (
    <Container>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={3}
        width={"100%"}
        gap={4}
      >
        <Box sx={{ width: "30%" }}>
          <Stepper activeStep={2}>
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
        <Box>
          <Typography
            component={"h1"}
            sx={{
              fontWeight: "bolder",
              fontSize: "2em",
              color: "rgba(21, 44, 91, 1)",
            }}
          >
            Yay! Completed
          </Typography>
        </Box>
        <Box>
          <img
            src={successPayImg}
            style={{ maxWidth: "100%", maxHeight: "60vh" }}
            alt="..."
          />
        </Box>
        <Box width={"80%"} sx={{ textAlign: "center" }}>
          <Typography>
            We will inform you via email later once the transaction has been
            accepted
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "1em",
              fontWeight: "800",
              boxShadow: "2px 2px 2px  gray",
            }}
            onClick={() => navigate("/")}
          >
            back home
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
