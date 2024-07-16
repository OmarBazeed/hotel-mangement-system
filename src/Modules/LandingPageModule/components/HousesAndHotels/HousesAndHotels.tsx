import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { getBaseUrl } from "../../../../Utils/Utils";
import { RoomsInterface } from "../../../../Interfaces/interFaces";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import defaultImg from "../../../../assets/images/hotal2.jpg";

export default function HousesAndHotels() {
  const [houses, setHouses] = useState<RoomsInterface[]>([]);
  const [hotels, setHotels] = useState<RoomsInterface[]>([]);

  const navigate = useNavigate();
  const { requestHeaders } = useAuth();
  const getRooms = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${getBaseUrl()}/api/v0/portal/rooms/available?page=1&size=10000`,
        {
          headers: requestHeaders,
        }
      );

      setHouses(data.data.rooms.slice(0, 4));
      setHotels(data.data.rooms.slice(5, 9));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail adding");
      }
    }
  }, [requestHeaders]);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <Box>
      <Grid container spacing={2} padding={3}>
        <Typography
          component={"h2"}
          fontWeight={"bold"}
          fontSize={"1.6rem"}
          fontFamily={"poppins"}
        >
          {t("houses.header1")}
        </Typography>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            {houses.map((house, index) => (
              <Grid item xs={12} md={6} lg={3} key={house._id}>
                <Button
                  sx={{ width: "100%", padding: 0 }}
                  onClick={() => navigate(`/explore/${house._id}`)}
                >
                  <Card
                    sx={{
                      position: "relative",
                      height: "300px",
                      background: `url(${
                        house?.images && house.images.length > 0
                          ? house.images[0]
                          : defaultImg
                      })`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      "&:hover .overlay": {
                        opacity: 1,
                      },
                      boxShadow: "2px 2px 2px gray",
                      width: "100%",
                    }}
                  >
                    {index == 3 ? (
                      <Typography
                        sx={{
                          textAlign: "right",
                          backgroundColor: "tomato",
                          padding: "5px 7px",
                          width: "fit-content",
                          marginLeft: "auto",
                          borderRadius: "0px 10px 0 10px",
                          fontSize: "1.1rem",
                          fontFamily: "monospace",
                          fontWeight: "bold",
                        }}
                      >
                        most popular
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Card>
                </Button>
                <Box sx={{ marginTop: "5px" }}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"1.1rem"}
                    fontFamily={"poppins"}
                  >
                    {house.roomNumber}
                  </Typography>
                  <Typography fontFamily={"poppins"}>
                    {house.roomNumber}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Typography
          component={"h2"}
          fontWeight={"bold"}
          fontSize={"1.6rem"}
          fontFamily={"poppins"}
        >
          {t("houses.header2")}
        </Typography>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            {hotels.map((hotel, index) => (
              <Grid item xs={12} md={6} lg={3} key={hotel._id}>
                <Button
                  sx={{ width: "100%", padding: 0 }}
                  onClick={() => navigate(`/explore/${hotel._id}`)}
                >
                  <Card
                    sx={{
                      position: "relative",
                      height: "300px",
                      background:
                        hotel.images && hotel.images.length > 0
                          ? `url(${hotel.images[0]})`
                          : "grey",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      "&:hover .overlay": {
                        opacity: 1,
                      },
                      boxShadow: "2px 2px 2px gray",
                      width: "100%",
                    }}
                  >
                    {index == 2 ? (
                      <Typography
                        sx={{
                          textAlign: "right",
                          backgroundColor: "tomato",
                          padding: "5px 7px",
                          width: "fit-content",
                          marginLeft: "auto",
                          borderRadius: "0px 10px 0 10px",
                          fontSize: "1.1rem",
                          fontFamily: "monospace",
                          fontWeight: "bold",
                        }}
                      >
                        popular choice
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Card>
                </Button>
                <Box sx={{ marginTop: "5px" }}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"1.1rem"}
                    fontFamily={"poppins"}
                  >
                    {hotel.roomNumber}
                  </Typography>
                  <Typography fontFamily={"poppins"}>
                    {hotel.roomNumber}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
