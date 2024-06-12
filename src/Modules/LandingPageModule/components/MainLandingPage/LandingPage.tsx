import { Box } from "@mui/material";
import Home from "../Home/Home";
import HousesAndHotels from "../HousesAndHotels/HousesAndHotels";
import PopularAds from "../PopularAds/PopularAds";

export default function LandingPage() {
  return (
    <>
      <Box>
        <Home />
      </Box>
      <Box>
        <PopularAds />
      </Box>
      <Box>
        <HousesAndHotels />
      </Box>
    </>
  );
}
