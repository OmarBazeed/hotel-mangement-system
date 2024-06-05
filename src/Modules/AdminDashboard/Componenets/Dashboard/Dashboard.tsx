import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { Charts } from "../../../../Interfaces/interFaces";

import { RoomServiceOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../Utils/Utils";

export default function DashboardHome() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chartsData, setChartsData] = useState<Charts>({});

  const { requestHeaders, loginData } = useAuth();

  const getCharts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${getBaseUrl()}/api/v0/admin/dashboard`,
        {
          headers: requestHeaders,
        }
      );
      setChartsData(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail signin");
      }
    }
    setIsLoading(false);
  }, [requestHeaders]);

  useEffect(() => {
    getCharts();
  }, [getCharts]);

  return (
    <>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="space-around"
        direction="row"
        sx={{
          minHeight: "35vh",
          flexWrap: "wrap",
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="space-around"
          direction="row"
          minWidth="25%"
          margin="auto !important"
          sx={{
            bgcolor: "rgba(26, 27, 30, 1)",
            color: "white",
            borderRadius: "30px",
            minHeight: {
              xs: "75px",
              lg: "100px",
            },
            padding: {
              xs: "10px",
              lg: "20px",
            },
            minWidth: { xs: "60%", lg: "30%" },
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {chartsData.rooms}
            </Typography>
            <Typography
              sx={{ marginTop: "1em", fontWeight: "bold", fontSize: "1.2em" }}
            >
              Rooms
            </Typography>
          </Box>
          <Box>
            <RoomServiceOutlined sx={{ fontSize: "3.5em" }} />
          </Box>
        </Stack>
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="space-around"
          direction="row"
          minWidth="25%"
          margin="auto !important"
          sx={{
            bgcolor: "rgba(26, 27, 30, 1)",
            color: "white",
            borderRadius: "30px",
            minHeight: {
              xs: "75px",
              lg: "100px",
            },
            padding: {
              xs: "10px",
              lg: "20px",
            },
            minWidth: { xs: "60%", lg: "30%" },
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {chartsData.facilities}
            </Typography>
            <Typography
              sx={{ marginTop: "1em", fontWeight: "bold", fontSize: "1.2em" }}
            >
              Facilities
            </Typography>
          </Box>
          <Box>
            <RoomServiceOutlined sx={{ fontSize: "3.5em" }} />
          </Box>
        </Stack>
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="space-around"
          direction="row"
          margin="auto !important"
          sx={{
            bgcolor: "rgba(26, 27, 30, 1)",
            color: "white",
            borderRadius: "30px",
            minHeight: {
              xs: "75px",
              lg: "100px",
            },
            padding: {
              xs: "10px",
              lg: "20px",
            },
            minWidth: { xs: "60%", lg: "30%" },
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {chartsData.ads}
            </Typography>
            <Typography
              sx={{ marginTop: "1em", fontWeight: "bold", fontSize: "1.2em" }}
            >
              Ads
            </Typography>
          </Box>
          <Box>
            <RoomServiceOutlined sx={{ fontSize: "3.5em" }} />
          </Box>
        </Stack>
      </Stack>
      {/*Charts */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      ></Stack>
    </>
  );
}
