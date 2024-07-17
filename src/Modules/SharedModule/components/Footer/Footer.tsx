import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import logoDark from "../../../../assets/images/logo-dark.svg";
import logoLight from "../../../../assets/images/logo-light.svg";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isXsOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        padding: "50px 0",
        backgroundColor: isDark ? "#121212" : "#f9f9f9",
        color: isDark ? "#fff" : "#000",
        marginTop: "20px",
      }}
    >
      {/* <hr color="#E5E5E5" /> */}
      <Grid container spacing={4} sx={{ padding: "10px 20px" }}>
        <Grid item xs={12} md={3}>
          <img width={"140px"} src={isDark ? logoDark : logoLight} alt="logo" />
          <Typography width={isXsOrSmaller ? "100%" : "60%"}>
            We kaboom your beauty holiday instantly and memorable.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            For Beginners
          </Typography>
          <Typography>New Account</Typography>
          <Typography>Start Booking a Room</Typography>
          <Typography>Use Payments</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Explore Us
          </Typography>
          <Typography>Our Careers</Typography>
          <Typography>Privacy</Typography>
          <Typography>Terms & Conditions</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography>support@staycation.id</Typography>
          <Typography>021-2208-1996</Typography>
          <Typography>Staycation, Kemang, Jakarta</Typography>
        </Grid>
      </Grid>
      <Typography marginTop={"50px"} display={"flex"} justifyContent={"center"}>
        Copyright 2019 • All rights reserved • Staycation
      </Typography>
    </Box>
  );
}
