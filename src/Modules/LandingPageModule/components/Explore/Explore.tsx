import React, { useCallback } from "react";
import { Box, Button, Divider, Grid, Card, Stack, Typography, Breadcrumbs, Link } from "@mui/material";
import { getBaseUrl } from '../../../../Utils/Utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../Context/AuthContext/AuthContext';
import { RoomsInterface } from '../../../../Interfaces/interFaces';
import { toast } from 'react-toastify';
import { Favorite, FavoriteBorderOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";


export default function Explore() {
    const [rooms, setRooms] = useState<RoomsInterface[]>([]);
    const { requestHeaders } = useAuth();
    const [favorites, setFavorites] = useState([]);

    //getRooms Api Call
    const getRooms = async () => {
        try {
          const { data } = await axios.get(
            `${getBaseUrl()}/api/v0/portal/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30`,
            {
              headers: requestHeaders,
            }
          );
    
          const reRenderRooms = data.data.rooms.map((room: RoomsInterface) => ({
            ...room,
            dataroom: {
              _id: room._id,
              roomNumber: room.roomNumber,
              price: room.price,
              capacity: room.capacity,
              discount: room.discount,
              facilities: room.facilities,
              createdAt: room.createdAt,
              updatedAt: room.updatedAt,
              createdBy: room.createdBy.userName,
              images: room?.images,
            },
          }));
          setRooms(reRenderRooms);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.message || "fail adding");
          }
        }
      };


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
    
          setFavorites(favorites.filter((fav) => fav !== RoomId));
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.message || "fail to Remove From favs");
          }
        }
      };


    useEffect(() => {
        getRooms(),
        FetchAds()
    }, []);

    return (
    <>
      <Typography
       marginTop={"100px"} 
       display={"flex"} 
       justifyContent={"center"}
       color={"#152C5B"}
       variant={"h5"}
       fontWeight={"bold"}
       >
        Explore ALL Rooms
      </Typography>
      <Stack
       flexDirection={"row"}
       justifyContent={"start"}
       marginBottom={"60px"}
      >
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="inherit"
            >
                Explore
            </Link>
        </Breadcrumbs> 
      </Stack>
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
        ${room.discount} discount per night
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
          {room.roomNumber}
        </Typography>
        <Typography>{room.roomNumber}</Typography>
      </Box>
    </Card>
    </>
    );
  }

  const CardComponent = (
        
    room: {
      discount: string;
      images: string[];
      roomNumber: string;
      _id: string;
    },
  height: string,
  AddToFavs: (roomid: string) => void,
  RemoveFromFavs: (id: string) => void,
  favorites: string[]
) => {
  // Check if the current room is favorited
  const isFavorited = favorites.some((fav) => fav._id === room._id);

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
  )
}