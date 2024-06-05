import { Card, CircularProgress, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { Charts } from "../../../../Interfaces/interFaces";

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
      <Stack spacing={6}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            {chartsData && <Card title="Rooms" count={chartsData?.rooms} />}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {chartsData && (
              <Card title="Facilities" count={chartsData?.facilities} />
            )}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {chartsData && <Card title="Ads" count={chartsData?.ads} />}
          </Grid>
        </Grid>

        {isLoading && <CircularProgress sx={{ mx: "auto" }} />}

        {/* {!isLoading && error && <Alert severity="error">{error}</Alert>} */}

        {loginData?.role === "admin" && !isLoading && (
          <Grid container spacing={4}>
            {/* donught chart */}
          </Grid>
        )}
      </Stack>
    </>
  );
}
