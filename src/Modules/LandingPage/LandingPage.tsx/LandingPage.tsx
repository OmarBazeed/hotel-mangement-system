import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Home from "../components/Home/Home";
import Navbar from "../../SharedModule/components/Navbar/Navbar";
import Footer from "../../SharedModule/components/Footer/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Box
        component="p"
        sx={{
          p: 2,
          border: "1px dashed grey",
          backgroundColor: { xs: "red", sm: "green" },
        }}
      >
        I Am Master Page Here
      </Box>

      <Home />

      <Footer />

      <Outlet />
    </>
  );
}
