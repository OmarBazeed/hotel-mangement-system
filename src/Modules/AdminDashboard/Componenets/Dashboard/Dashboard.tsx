import { Alert, Card, CircularProgress, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext/AuthContext";
import { getBaseUrl } from "../../../../Utils/Utils";
import { ICharts } from "../../../../Interfaces/interFaces";

export default function DashboardHome() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [chartsData, setChartsData] = useState<ICharts | null>(null);

  const { token } = useContext(AuthContext);

  const getCharts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${getBaseUrl}api/v0/admin/dashboard`, {
        headers: {
          Authorization: token,
        },
      });
      setChartsData(response?.data?.data);
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharts();
  }, []);

  return (
    <>
      <Stack gap={6}>
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

        {!isLoading && error && <Alert severity="error">{error}</Alert>}

        {userRole?.role === "admin" && !isLoading && (
          <Grid container spacing={4}>
            {/* donught chart */}
          </Grid>
        )}
      </Stack>
    </>
  );
}