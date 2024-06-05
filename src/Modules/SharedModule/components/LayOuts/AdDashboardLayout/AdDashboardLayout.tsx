import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SideBar from "../../SideBar/SideBar";
import { Box } from "@mui/material";
import { useState } from "react";
import {
  AppBarProps,
  DashlayoutProps,
} from "../../../../../Interfaces/interFaces";

export default function AdDashboardLayout({ setTheme }: DashlayoutProps) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar setOpen={setOpen} open={open} setTheme={setTheme} />
        <Box
          component="main"
          sx={{
            mt: "64px",
          }}
          display="flex"
        >
          <SideBar open={open} />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
