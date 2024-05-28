import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SideBar from "../../SideBar/SideBar";

export default function AdDashboardLayout() {
  return (
    <div>
      <Navbar />
      Admin Is Here
      <Outlet />
      <SideBar />
    </div>
  );
}
