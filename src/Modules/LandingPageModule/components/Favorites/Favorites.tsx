import { Favorite, FavoriteBorderOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Breadcrumbs, Card, Box, Button, Grid, Link, Pagination, Stack, Typography } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from '../../../../Context/AuthContext/AuthContext';
import { RoomsInterface } from '../../../../Interfaces/interFaces';
import { getBaseUrl } from '../../../../Utils/Utils';


export default function Favorites() {
    const [rooms, setRooms] = useState<RoomsInterface[]>([]);
    const { requestHeaders } = useAuth();
    const [clickedAdd, setClickedAdd] = useState<boolean>(false);
    const [clickedRemove, setClickedRemove] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const pageSize = 10;
    const FavsWaitToast = {
      onClose: () => {
        setClickedAdd(false);
        setClickedAdd(false);
      },
    };


    //getFavorites Api Call
    const getFavorites = async (page: number, pageSize: number) => {
        try {
          const { data } = await axios.get(
            `${getBaseUrl()}/api/v0/portal/favorite-rooms?page=${page}&size=${pageSize}&startDate=2023-01-20&endDate=2023-01-30`,
            {
              headers: requestHeaders,
            }
          );
    
          const reRenderRooms = data.data.favoriteRooms[0].rooms.map((room: RoomsInterface) => ({
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
          console.log(reRenderRooms);
          setTotalPages(Math.ceil(data.data.totalCount / pageSize));
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.message || "fail adding");
          }
        }
      };

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
          getFavorites(page, pageSize);
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
          getFavorites(page, pageSize);
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
        getFavorites(page, pageSize)
    }, [page, pageSize]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
  };



  const CardComponent = (
    AD: RoomsInterface,
    height: string,
    AddToFavs: (roomId: string) => void,
    RemoveFromFavs: (id: string) => void,
    favorites: RoomsInterface[],
    clickedAdd: boolean,
    clickedRemove: boolean
) => {
    // Check if the current room is favorited or not
    const isFavorited = favorites.some((fav) => fav._id === AD._id);

    return (
        <Card
            sx={{
                position: "relative",
                height: height,
                background: AD.images && AD.images.length > 0 ? `url(${AD.images[0]})` : "grey",
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
                ${AD.discount} discount per night
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
                {!isFavorited ? (
                    <Button
                        color="warning"
                        onClick={() => AddToFavs(AD._id)}
                        disabled={clickedAdd}
                    >
                        <FavoriteBorderOutlined sx={{ fontSize: "1.8rem" }} />
                    </Button>
                ) : (
                    <Button
                        color="warning"
                        onClick={() => RemoveFromFavs(AD._id)}
                        disabled={clickedRemove}
                    >
                        <Favorite sx={{ fontSize: "1.8rem" }} />
                    </Button>
                )}

                <Button color="info">
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
                    {AD.roomNumber}
                </Typography>
                <Typography>{AD.roomNumber}</Typography>
            </Box>
        </Card>
    );
};


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
        Your Favorites
      </Typography>
      <Stack
       flexDirection={"row"}
       justifyContent={"start"}
       marginBottom={"60px"}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft: "20px"}}>
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="inherit"
            >
                Favorites
            </Link>
        </Breadcrumbs> 
      </Stack>
      <Grid marginLeft={"25px"}>
        <Typography color={"#152C5B"} fontWeight={"Bold"} variant="h5">Your Rooms</Typography>
      </Grid>
      <Grid container spacing={2} padding={"25px"}>
                {rooms.map((room) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        padding={2}
                        key={room._id}
                    >
                        {CardComponent(
                            room,
                            "300px",
                            AddToFavs,
                            RemoveFromFavs,
                            rooms,
                            clickedAdd,
                            clickedRemove
                        )}
                    </Grid>
                ))}
            </Grid>
            <Grid display={"flex"} justifyContent={"center"} marginTop={"35px"} marginBottom={"35px"}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Grid>
    </>
    );
  }