import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import logo from "../../../../../assets/images/logo-light.svg";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export default function PaymentLayout() {
  const stripe = loadStripe(
    "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
  );

  return (
    <Elements stripe={stripe}>
      <Stack>
        <Box
          sx={{
            paddingTop: "25px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <img
            src={logo}
            width="120px"
            alt="..."
            style={{ marginBottom: "15px" }}
          />
          <hr />
        </Box>
        <Outlet />
      </Stack>
    </Elements>
  );
}
