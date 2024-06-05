import { Outlet } from "react-router-dom";
import { DashlayoutProps } from "../../../../../Interfaces/interFaces";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

export default function LandingLayout({ setTheme }: DashlayoutProps) {
  return (
    <>
      <Navbar setTheme={setTheme} />
      <Outlet />
      <Footer />
    </>
  );
}
