import { Outlet } from "react-router-dom";
import { DashlayoutProps } from "../../../../../Interfaces/interFaces";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import { Box } from "@mui/material";

export default function LandingLayout({ setTheme }: DashlayoutProps) {
  return (
    <>
      <Navbar setTheme={setTheme} />
      <Box sx={{ marginTop: "65px" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
