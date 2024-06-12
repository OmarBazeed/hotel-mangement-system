import { Outlet } from "react-router-dom";
import { DashlayoutProps } from "../../../../../Interfaces/interFaces";
import Navbar from "../../Navbar/Navbar";
import { Box, Stack } from "@mui/material";
import Footer from "../../Footer/Footer";

export default function LandingLayout({ setTheme }: DashlayoutProps) {
  return (
    <Stack height={"100%"}>
      <Navbar setTheme={setTheme} />
      <Box marginTop={"65px !important"}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}
