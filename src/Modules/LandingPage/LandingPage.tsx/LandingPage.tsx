import { Outlet } from "react-router-dom";
import Footer from "../../SharedModule/components/Footer/Footer";
import Navbar from "../../SharedModule/components/Navbar/Navbar";
import Home from "../components/Home/Home";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <Home />

      <Footer />

      <Outlet />
    </>
  );
}
