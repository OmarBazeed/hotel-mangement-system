import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Home from "../components/Home/Home";
import Navbar from "../../SharedModule/components/Navbar/Navbar";
import Footer from "../../SharedModule/components/Footer/Footer";
import { DashlayoutProps } from "../../../Interfaces/interFaces";

export default function LandingPage({ setTheme }: DashlayoutProps) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar setTheme={setTheme} />
        <Box component="main" sx={{ p: 3, mt: "64px"}}>
          <Home />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </>
  );
}
