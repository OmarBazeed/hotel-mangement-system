import { Box, Button, Card, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { getBaseUrl } from "../../../../Utils/Utils";
import {
  Favorite,
  FavoriteBorderOutlined,
  HearingDisabledOutlined,
  HeartBrokenOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";

export default function PopularAds() {
  const [Z5Ads, setZ5Ads] = useState([]);
  const [showAddedToBtn, setShowAddedToBtn] = useState<boolean>(true);
  const [showRemoveBtn, setShowRemoveBtn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState([]);
  const { requestHeaders } = useAuth();

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
      const res = await axios.get(`${getBaseUrl()}/api/v0/admin/ads`, {
        headers: requestHeaders,
      });
      const SplicedArray = res.data.data.ads.splice(0, 5);
      setZ5Ads(SplicedArray);
      console.log(SplicedArray);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail to add to favs");
      }
    }
  }, [requestHeaders]);

  const AddToFavs = async (RoomId: string) => {
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
      toast.success(res?.data.message || "added to favs");

      // Update favorites state with the new favorite room
      setFavorites([...favorites, RoomId]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail to add to favs");
      }
    }
  };

  const RemoveFromFavs = async (RoomId: string) => {
    try {
      const res = await axios.delete(
        `${getBaseUrl()}/api/v0/portal/favorite-rooms/${RoomId}`,
        {
          headers: requestHeaders,
          data: { roomId: RoomId },
        }
      );
      toast.success(res?.data.message || "Removed From favs");

      // Update favorites state by removing the removed favorite room
      setFavorites(favorites.filter((fav) => fav !== RoomId));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail to Remove From favs");
      }
    }
  };

  useEffect(() => {
    FetchAds();
    fetchFavoritedRooms();
  }, [FetchAds]);
  return (
    <>
      <Typography component={"h2"} fontWeight={"bold"} fontSize={"1.8rem"}>
        Most Popular Ads
      </Typography>
      <Box
        component="div"
        sx={{
          p: 2,
        }}
      >
        <Grid height="80vh" container columns={12} spacing={5}>
          <Grid item xs={12} md={6} height={"100%"}>
            {CardComponent(
              Z5Ads[0],
              "100%",
              AddToFavs,
              RemoveFromFavs,
              favorites
            )}
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            height={"100%"}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {CardComponent(
              Z5Ads[1],
              "50%",
              AddToFavs,
              RemoveFromFavs,
              favorites
            )}
            {CardComponent(
              Z5Ads[2],
              "50%",
              AddToFavs,
              RemoveFromFavs,
              favorites
            )}
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            height={"100%"}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {CardComponent(
              Z5Ads[3],
              "50%",
              AddToFavs,
              RemoveFromFavs,
              favorites
            )}
            {CardComponent(
              Z5Ads[4],
              "50%",
              AddToFavs,
              RemoveFromFavs,
              favorites
            )}
          </Grid>
        </Grid>
      </Box>
    </>
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
  height: string,
  AddToFavs: (roomid: string) => void,
  RemoveFromFavs: (id: string) => void,
  favorites: string[]
) => {
  // Check if the current room is favorited
  const isFavorited = favorites.some((fav) => fav._id === AD.room._id);

  return (
    <Card
      sx={{
        position: "relative",
        height: height,
        background: `url(${AD?.room.images[0]})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
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
        ${AD?.room.discount} discount per night
      </Typography>
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Render "Add to Favorites" button if the room is not favorited */}
        {!isFavorited && (
          <Button color="warning" onClick={() => AddToFavs(AD.room._id)}>
            <FavoriteBorderOutlined />
          </Button>
        )}
        {/* Render "Remove from Favorites" button if the room is favorited */}
        {isFavorited && (
          <Button color="warning" onClick={() => RemoveFromFavs(AD.room._id)}>
            <Favorite />
          </Button>
        )}

        <Button color="error">
          <RemoveRedEyeOutlined />
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
    </Card>
  );
};
