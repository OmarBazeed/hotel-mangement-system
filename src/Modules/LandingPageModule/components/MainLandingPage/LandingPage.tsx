import { Box } from "@mui/material";
import Home from "../Home/Home";
import HousesAndHotels from "../HousesAndHotels/HousesAndHotels";
import PopularAds from "../PopularAds/PopularAds";
import Reviews from "../Reviews/Reviews";

export default function LandingPage() {
  return (
    <Box
      mt={{ xs: "50px", lg: "0" }}
      width={"90%"}
      mx={"auto"}
      rowGap={4}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="section" sx={{ marginBottom: { xs: 2, md: 4 } }}>
        <Home />
      </Box>
      <Box component="section" sx={{ marginBottom: { xs: 2, md: 4 } }}>
        <PopularAds />
      </Box>
      <Box
        mt={{ lg: 0, md: 20, sm: 70, xs: 70 }}
        component="section"
        sx={{ marginBottom: { xs: 2, md: 4 } }}
      >
        <HousesAndHotels />
      </Box>
      <Box component="section" sx={{ marginBottom: { xs: 2, md: 4 } }}>
        <Reviews />
      </Box>
    </Box>
  );
}
