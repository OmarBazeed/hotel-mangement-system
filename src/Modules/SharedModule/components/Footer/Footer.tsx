import React from "react";
import { useState } from "react";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import logoDark from "../../../../assets/images/logo-dark.svg";
import logoLight from "../../../../assets/images/logo-light.svg";

export default function Footer() {

  const [isDark, setIsDark] = useState(() => {
    const value = localStorage.getItem("theme");
    if (value === "dark" || value === null) return true;
    return false;
  });

  return (
    <>
      <hr color="#E5E5E5"/>
        <Grid sx={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
          position: "absolute",
          width: "100%"
        }}>
          <Stack direction={"row"}>
            <Stack spacing={2}>
              <img width={"140px"} src={isDark ? logoDark : logoLight} alt="logo" />
              <Typography width={"60%"} color={"#B0B0B0"}>We kaboom your beauty holiday instantly and memorable.</Typography>
            </Stack>
            <Stack direction={"row"} spacing={20}>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="h6" color={"#152C5B"}>For Beginners</Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography color={"#B0B0B0"}>New Account</Typography>
                  <Typography color={"#B0B0B0"}>Start Booking a Room</Typography>
                  <Typography color={"#B0B0B0"}>Use Payments</Typography>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="h6" color={"#152C5B"}>Explore Us</Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography color={"#B0B0B0"}>Our Careers</Typography>
                  <Typography color={"#B0B0B0"}>privacy</Typography>
                  <Typography color={"#B0B0B0"}>Terms & conditions</Typography>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="h6" color={"#152C5B"}>Contact Us</Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography color={"#B0B0B0"}>support@staycation.id</Typography>
                  <Typography color={"#B0B0B0"}>021-2208-1996</Typography>
                  <Typography color={"#B0B0B0"}>Staycation, Kemang, Jakarta</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Typography
          marginTop={"50px"}
          marginBottom={"-20px"}
          color={"#B0B0B0"}
          display={"flex"}
          justifyContent={"center"}
          >
            Copyright 2019 • All rights reserved • Staycation</Typography>
        </Grid>
    </>
  );
}
