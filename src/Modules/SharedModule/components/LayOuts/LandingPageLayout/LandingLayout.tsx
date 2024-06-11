import { Outlet } from "react-router-dom";
import { DashlayoutProps } from "../../../../../Interfaces/interFaces";
import Navbar from "../../Navbar/Navbar";
import { Stack } from "@mui/material";
import Footer from "../../Footer/Footer";

export default function LandingLayout({ setTheme }: DashlayoutProps) {
  return (
    <>
      <Stack height={"100%"}>
        <Navbar setTheme={setTheme} />
        <Outlet />
      </Stack>
      
    </>
  );
}
