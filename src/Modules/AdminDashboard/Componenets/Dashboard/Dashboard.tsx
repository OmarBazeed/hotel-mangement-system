import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { Charts } from "../../../../Interfaces/interFaces";
import { PieChart } from "@mui/x-charts/PieChart";
import { RoomServiceOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../Utils/Utils";
import { BarChart } from "@mui/x-charts";

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
    <Stack component={"section"} width="100%" height="100vh" marginTop="30px">
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
            minWidth: { xs: "60%", lg: "20%" },
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
            minWidth: { xs: "60%", lg: "20%" },
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
            minWidth: { xs: "60%", lg: "20%" },
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
        justifyContent="space-around"
        flexWrap="wrap"
        marginTop="20px"
      >
        <Box
          sx={{
            width: {
              xs: "350px !important",
              md: "400px !important",
            },
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: chartsData.bookings?.completed,
                    label: "Completed",
                  },
                  {
                    id: 1,
                    value: chartsData.bookings?.pending,
                    label: "Pending",
                  },
                ],
              },
            ]}
            height={200}
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: "350px !important",
              md: "400px !important",
            },
          }}
        >
          <BarChart
            height={300}
            series={[
              { data: [chartsData.users?.admin], label: "Admin", id: "1" },
              { data: [chartsData.users?.user], label: "User", id: "2" },
            ]}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
