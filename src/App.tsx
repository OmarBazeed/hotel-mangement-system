import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdsList from "./Modules/AdminDashboard/Componenets/Ads/AdsList/AdsList";
import BookingsList from "./Modules/AdminDashboard/Componenets/BookingsList/BookingsList";
import Dashboard from "./Modules/AdminDashboard/Componenets/Dashboard/Dashboard";
import FacilitiesList from "./Modules/AdminDashboard/Componenets/Facilities/FacilitiesList/FacilitiesList";
import RoomsList from "./Modules/AdminDashboard/Componenets/Rooms/RoomsList/RoomsList";
import UsersList from "./Modules/AdminDashboard/Componenets/Users/UsersList/UsersList";
import ForgetPassword from "./Modules/AuthModule/Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Modules/AuthModule/Components/ResetPassword/ResetPassword";
import Signin from "./Modules/AuthModule/Components/Signin/Signin";
import Signup from "./Modules/AuthModule/Components/Signup/Signup";
import Favorites from "./Modules/LandingPageModule/components/Favorites/Favorites";
import LandingPage from "./Modules/LandingPageModule/components/MainLandingPage/LandingPage";
import RoomDetails from "./Modules/LandingPageModule/components/RoomDetails/RoomDetails";
import Rooms from "./Modules/LandingPageModule/components/Rooms/Rooms";
import ConfirmPayment from "./Modules/PaymentModule/Components/ConfirmPayment/ConfirmPayment";
import DetailsPayment from "./Modules/PaymentModule/Components/DetailsPayment/DetailsPayment";
import FirstPaymentPage from "./Modules/PaymentModule/Components/FirstPaymentPage/FirstPaymentPage";
import AdDashboardLayout from "./Modules/SharedModule/components/LayOuts/AdDashboardLayout/AdDashboardLayout";
import AuthLayout from "./Modules/SharedModule/components/LayOuts/AuthLayout/AuthLayout";
import PaymentLayout from "./Modules/SharedModule/components/LayOuts/PaymentLayout/PaymentLayout";
import NotFound from "./Modules/SharedModule/components/NotFound/NotFound";
import LandingLayout from "./Modules/SharedModule/components/LayOuts/LandingPageLayout/LandingLayout";
import "./App.css";

export default function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "rooms-data",
          element: <Rooms />,
        },
        {
          path: "single-room-details",
          element: <RoomDetails />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
      ],
    },
    {
      path: "/payment",
      element: <PaymentLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <FirstPaymentPage />,
        },
        {
          path: "details",
          element: <DetailsPayment />,
        },
        {
          path: "confirm",
          element: <ConfirmPayment />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Signin />,
        },
        {
          path: "signin",
          element: <Signin />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <AdDashboardLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "rooms",
          element: <RoomsList />,
        },
        {
          path: "ads",
          element: <AdsList />,
        },
        {
          path: "bookings",
          element: <BookingsList />,
        },
        {
          path: "facilities",
          element: <FacilitiesList />,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}
