import {
  Favorite,
  FavoriteBorderOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { getBaseUrl } from "../../../../Utils/Utils";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

export default function PopularAds() {
  const [Z5Ads, setZ5Ads] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { requestHeaders, setFavsNumber, loginData } = useAuth();
  const [clickedAdd, setClickedAdd] = useState<boolean>(false);
  const [clickedRemove, setClickedRemove] = useState<boolean>(false);
  const navigate = useNavigate();

  const FavsWaitToast = {
    onClose: () => {
      setClickedAdd(false);
      setClickedAdd(false);
    },
  };
  const fetchFavoritedRooms = useCallback(async () => {
    try {
      const res = await axios.get(
        `${getBaseUrl()}/api/v0/portal/favorite-rooms`,
        {
          headers: requestHeaders,
        }
      );

      setFavorites(res.data.data.favoriteRooms[0].rooms);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail to add to favs");
      }
    }
  }, [requestHeaders]);

  const FetchAds = useCallback(async () => {
    try {
      const res = await axios.get(
        `${getBaseUrl()}/api/v0/portal/ads?page=1&size=10000`
      );
      const SplicedArray = res.data.data.ads.slice(0, 5);
      setZ5Ads(SplicedArray);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail to add to favs");
      }
    }
  }, []);

  const AddToFavs = async (RoomId: string) => {
    setClickedAdd(true);
    try {
      const res = await axios.post(
        `${getBaseUrl()}/api/v0/portal/favorite-rooms`,
        {
          roomId: RoomId,
        },
        {
          headers: requestHeaders,
        }
      );
      toast.success(res?.data.message || "added to favs", FavsWaitToast);
      fetchFavoritedRooms();
      setFavsNumber((prev) => prev + 1);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "fail to add to favs",
          FavsWaitToast
        );
      }
    }
    setClickedAdd(false);
  };

  const RemoveFromFavs = async (RoomId: string) => {
    setClickedRemove(true);
    try {
      const res = await axios.delete(
        `${getBaseUrl()}/api/v0/portal/favorite-rooms/${RoomId}`,
        {
          headers: requestHeaders,
          data: { roomId: RoomId },
        }
      );
      toast.warning(res?.data.message || "Removed From favs", FavsWaitToast);
      fetchFavoritedRooms();
      setFavsNumber((prev) => prev - 1);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "fail to Remove From favs",
          FavsWaitToast
        );
      }
    }
    setClickedRemove(false);
  };

  useEffect(() => {
    FetchAds();
    loginData ? fetchFavoritedRooms() : "";
  }, [FetchAds, fetchFavoritedRooms]);

  return (
    <Box>
      <Typography
        component={"h2"}
        fontWeight={"bold"}
        fontSize={"1.8rem"}
        fontFamily={"poppins"}
      >
        {t("popAds.header")}
      </Typography>
      <Box component="div" mt={2} minHeight={"100vh"}>
        <Grid minHeight={"80vh"} container>
          <Grid item xs={12} lg={5}>
            <Box width={"100%"} height={"100%"}>
              {CardComponent(
                Z5Ads[0],
                AddToFavs,
                RemoveFromFavs,
                favorites,
                clickedAdd,
                clickedRemove,
                navigate
              )}
            </Box>
          </Grid>
          <Grid item xs={12} lg={7}>
            <Box width={"100%"} height={"100%"}>
              <Grid height={{ xs: "100%", lg: "50%" }} container>
                <Grid height={"100%"} item xs={12} md={6}>
                  {CardComponent(
                    Z5Ads[1],
                    AddToFavs,
                    RemoveFromFavs,
                    favorites,
                    clickedAdd,
                    clickedRemove,
                    navigate
                  )}
                </Grid>
                <Grid height={"100%"} item xs={12} md={6}>
                  {CardComponent(
                    Z5Ads[2],
                    AddToFavs,
                    RemoveFromFavs,
                    favorites,
                    clickedAdd,
                    clickedRemove,
                    navigate
                  )}
                </Grid>
              </Grid>
              <Grid height={{ xs: "100%", lg: "50%" }} container>
                <Grid height={"100%"} item xs={12} md={6}>
                  {CardComponent(
                    Z5Ads[3],
                    AddToFavs,
                    RemoveFromFavs,
                    favorites,
                    clickedAdd,
                    clickedRemove,
                    navigate
                  )}
                </Grid>
                <Grid height={"100%"} item xs={12} md={6}>
                  {CardComponent(
                    Z5Ads[4],
                    AddToFavs,
                    RemoveFromFavs,
                    favorites,
                    clickedAdd,
                    clickedRemove,
                    navigate
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const CardComponent = (
  AD: {
    room: {
      discount: string;
      images: string[];
      roomNumber: string;
      _id: string;
    };
  },
  AddToFavs: (roomid: string) => void,
  RemoveFromFavs: (id: string) => void,
  favorites: string[],
  clickedAdd: boolean,
  clickedRemove: boolean,
  navigate
) => {
  // Check if the current room is favorited or not
  const isFavorited = favorites.some(
    (fav: { _id: string }) => fav._id === AD?.room._id
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
      <Box position={"absolute"} top={0} left={0} right={0} bottom={0}>
        <Box
          height={"100%"}
          position={"relative"}
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <img width={"99%"} height={"99%"} src={AD?.room.images[0]} alt="" />
          <Typography
            position={"absolute"}
            top={7}
            right={9}
            sx={{
              textAlign: "right",
              backgroundColor: "rgba(25, 118, 210, 0.2)",
              boxShadow: "3px 3px 3px black",
              padding: "5px 7px",
              width: "fit-content",
              marginLeft: "auto",
              borderRadius: "0px 10px 0 10px",
              fontSize: {
                sx: ".5rem !important",
                md: "1.1rem !important",
              },
              fontFamily: "poppins",
              fontWeight: "semibold",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                margin: "0 5px",
              }}
            >
              ${AD?.room.discount}
            </span>
            {t("popAds.dis")}
          </Typography>
        </Box>
      </Box>

      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: "99%",
          width: "99%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Render "Add to Fvas" , "Remove From Favs" button if the room is not favorited , Favorite */}
        {!isFavorited ? (
          <Button
            color="warning"
            onClick={() => AddToFavs(AD.room._id)}
            disabled={clickedAdd}
          >
            <FavoriteBorderOutlined sx={{ fontSize: "1.8rem" }} />
          </Button>
        ) : (
          <Button
            color="warning"
            onClick={() => RemoveFromFavs(AD.room._id)}
            disabled={clickedRemove}
          >
            <Favorite sx={{ fontSize: "1.8rem" }} />
          </Button>
        )}

        <Button color="info">
          <RemoveRedEyeOutlined
            onClick={() => navigate(`/explore/${AD.room._id}`)}
          />
        </Button>
      </Box>
      <Box
        marginLeft={"10px"}
        position="absolute"
        bottom="10px"
        left="10px"
        color={"white"}
      >
        <Typography component={"h3"} fontWeight={"900"} fontSize={"1.2rem"}>
          {AD?.room.roomNumber}
        </Typography>
        <Typography>{AD?.room.roomNumber}</Typography>
      </Box>
    </Box>
  );
};
