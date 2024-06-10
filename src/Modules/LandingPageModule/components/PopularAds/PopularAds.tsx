import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { getBaseUrl } from "../../../../Utils/Utils";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HeartBrokenSharp, RemoveRedEye } from "@mui/icons-material";

export default function PopularAds() {
  const [Z5Ads, setZ5Ads] = useState([]);
  const { requestHeaders } = useAuth();

  const FetchAds = async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/v0/admin/ads`, {
        headers: requestHeaders,
      });
      const reurnedArr = res.data.data.ads;
      const finalArr = reurnedArr.splice(5);
      setZ5Ads(finalArr);
      console.log(finalArr);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail signin");
      }
    }
  };

  useEffect(() => {
    FetchAds();
  }, []);
  return (
    <>
      <Typography component={"h2"} fontWeight={"bold"}>
        Most Popular Ads
      </Typography>
      <Box
        component="div"
        sx={{
          p: 2,
        }}
      >
        <Grid height="80vh" container columns={12} spacing={2}>
          <Grid item xs={12} md={6} height={"100%"}>
            <Card
              sx={{ height: "100%" }}
              style={{
                background: `url(${Z5Ads[0]?.room.images[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HeartBrokenSharp sx={{ fontSize: "1.5rem" }} />
                <RemoveRedEye sx={{ fontSize: "1.5rem" }} />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={6} md={3} height={"100%"}>
            <Card
              sx={{ height: "50%" }}
              style={{
                background: `url(${Z5Ads[1]?.room.images[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Typography>room 1</Typography>
            </Card>
            <Card
              sx={{ height: "50%" }}
              style={{
                background: `url(${Z5Ads[2]?.room.images[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Typography>room 1</Typography>
            </Card>
          </Grid>
          <Grid item xs={6} md={3} height={"100%"}>
            <Card
              sx={{ height: "50%" }}
              style={{
                background: `url(${Z5Ads[3]?.room.images[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Typography>room 1</Typography>
            </Card>
            <Card
              sx={{ height: "50%" }}
              style={{
                background: `url(${Z5Ads[4]?.room.images[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Typography>room 1</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const CardComponent = (backGround: string) => {
  return (
    <Card
      sx={{ height: "100%" }}
      style={{
        background: `url(${Z5Ads[0]?.room.images[0]})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeartBrokenSharp sx={{ fontSize: "1.5rem" }} />
        <RemoveRedEye sx={{ fontSize: "1.5rem" }} />
      </Box>
    </Card>
  );
};
