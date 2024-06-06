import { useEffect, useState } from "react";
import { RoomsInterface } from "../../../../../Interfaces/interFaces";
import axios from "axios";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
  DeleteForever,
  Draw,
  HighlightOff,
  RemoveRedEyeSharp,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import delImg from "../../../../../assets/images/noData.png";
import { useNavigate } from "react-router-dom";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function RoomsList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [facilities, setFacilities] = useState<[{ name: string }]>([
    { name: "" },
  ]);
  const [images, setImages] = useState<string[]>([]);
  const [viewRoom, setViewRoom] = useState<RoomsInterface>({});
  const [openFacModal, setOpenFacModal] = useState<boolean>(false);
  const [openImgModal, setOpenimgModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);

  const [roomID, setRoomID] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenFacModal = () => setOpenFacModal(true);
  const handleCloseFacModal = () => {
    setOpenFacModal(false);
    setFacilities([{ name: "" }]);
  };
  const handleDelete = (id: string, name: string) => {
    setRoomID(id);
    setRoomName(name);
    handleOpenDelete();
  };
  const handleOpenViewModal = () => setOpenViewModal(true);

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setViewRoom({});
    setImages([]);
    setFacilities([{ name: "" }]);
  };

  const handleOpenImgModal = () => setOpenimgModal(true);
  const handleCloseImgModal = () => {
    setOpenimgModal(false);
    viewRoom ? "" : setImages([]);
  };
  const onSubmitDelete = async () => {
    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${roomID}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      getRooms();
      handleCloseDelete();
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail add");
      }
    }
  };
  const getRooms = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/rooms?page=1&size=1000`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
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
      console.log(reRenderRooms);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "roomNumber",
      label: "Room Name",
    },
    {
      name: "images",
      label: "Images",
      options: {
        filter: false,
        customBodyRender: (value: string[]) => (
          <Avatar
            onClick={() => {
              setImages(value);
              handleOpenImgModal();
            }}
            alt="Remy Sharp"
            src={value[0]}
            sx={{ width: 56, height: 56, cursor: "pointer" }}
          />
        ),
      },
    },
    {
      name: "facilities",
      label: "Facilities",
      options: {
        filter: false,
        customBodyRender: (value: [{ name: string }]) => (
          <>
            <Button
              onClick={() => {
                setFacilities(value);
                handleOpenFacModal();
              }}
              variant="text"
              color="primary"
            >
              Facilities
            </Button>
          </>
        ),
      },
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "capacity",
      label: "Capacity",
    },
    {
      name: "discount",
      label: "Discount",
    },

    {
      name: "dataroom",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value: RoomsInterface) => {
          return (
            <>
              <RemoveRedEyeSharp
                onClick={() => {
                  setViewRoom(value);
                  setImages(value.images);
                  setFacilities(value.facilities);
                  handleOpenViewModal();
                }}
                sx={{ cursor: "pointer" }}
              />
              <DeleteForever
                onClick={() => {
                  handleDelete(value._id, value.roomNumber);
                }}
                sx={{ mx: 2, cursor: "pointer" }}
              />
              <Draw
                // onClick={() => handleUpdate(value.id, value.name)}
                sx={{ cursor: "pointer" }}
              />
            </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30, rooms.length],
    responsive: "vertical",
    download: false,
    print: false,
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <Box component={`section`} width="100%">
        <Box p={3} component={"header"} boxShadow={1}>
          <Grid container rowSpacing={2}>
            <Grid
              display={"flex"}
              justifyContent={{ sm: "start", xs: "center" }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Typography variant="h5" fontWeight={"500"}>
                Rooms Table Details
                <Typography variant="body1">
                  You can check all details
                </Typography>
              </Typography>
            </Grid>
            <Grid
              display={"flex"}
              justifyContent={{ sm: "end", xs: "center" }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Button
                onClick={() => {
                  navigate("/dashboard/room-data");
                }}
                sx={{
                  py: 1,
                  px: 3,
                }}
                variant="contained"
                color="info"
              >
                Add New Room
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CacheProvider value={muiCache}>
          <Box width={"90%"} mx={"auto"} my={8}>
            <MUIDataTable
              title={"Room List"}
              data={rooms}
              columns={columns}
              options={options}
            />
          </Box>
        </CacheProvider>
      </Box>
      {/* modal facilities */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFacModal}
        onClose={handleCloseFacModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openFacModal}>
          <Box sx={styleModaleFac}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Room Facility
              </Typography>
              <HighlightOff
                sx={{ cursor: "pointer" }}
                onClick={handleCloseFacModal}
                color="error"
              />
            </Box>
            <Box mt={3}>
              {facilities.length > 0 ? (
                facilities.map((fac) => (
                  <Typography variant="h5" key={fac.name}>
                    {fac.name}
                  </Typography>
                ))
              ) : (
                <Typography variant="h5">Not Found Facilities</Typography>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* modal image */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openImgModal}
        onClose={handleCloseImgModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openImgModal}>
          <Box sx={styleModalImages}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Room Images
              </Typography>
              <HighlightOff
                sx={{ cursor: "pointer" }}
                onClick={handleCloseImgModal}
                color="error"
              />
            </Box>
            <Box mt={3}>
              <ImageList cols={1} sx={{ width: "100%", height: 650 }}>
                {images.length > 0
                  ? images.map((item) => (
                      <ImageListItem key={item}>
                        <img
                          srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          src={`${item}?w=248&fit=crop&auto=format`}
                          alt="room-images"
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))
                  : "Not Found Images"}
              </ImageList>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {/* modal view */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openViewModal}
        onClose={handleCloseViewModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openViewModal}>
          <Box sx={styleModalView}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                View Room
              </Typography>
              <HighlightOff
                sx={{ cursor: "pointer" }}
                onClick={handleCloseViewModal}
                color="error"
              />
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Grid xs={12} md={6} item>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenImgModal()}
                    width={"100%"}
                    src={images[0]}
                    alt="room-image"
                  />
                </Grid>
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  xs={12}
                  md={6}
                  item
                >
                  <Box>
                    <Typography variant="h6">ID : {viewRoom._id}</Typography>
                    <Typography variant="h6">
                      Name : {viewRoom.roomNumber}
                    </Typography>

                    <Typography variant="h6">
                      Price : {viewRoom.price}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={{ xs: 0, md: 2 }}>
                <Typography variant="h6">
                  Capacity : {viewRoom.capacity}
                </Typography>
                <Typography variant="h6">
                  Discount : {viewRoom.discount}
                </Typography>
                <Typography variant="h6">
                  Facilities :
                  {facilities.length > 0 ? (
                    facilities.map((fac) => (
                      <span style={{ marginLeft: "3px" }} key={fac.name}>
                        {" "}
                        {fac.name},{" "}
                      </span>
                    ))
                  ) : (
                    <span> Not Found Facilities</span>
                  )}
                </Typography>

                <Typography variant="h6">
                  Created By : {viewRoom?.createdBy}
                </Typography>
                <Typography variant="h6">
                  Created At : {moment(viewRoom?.createdAt).format("llll")}
                </Typography>
                <Typography variant="h6">
                  Updated At : {moment(viewRoom?.updatedAt).fromNow()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* modal delete */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDelete}>
          <Box sx={styleModaleFac}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {`Delete this ${roomName}`}
              </Typography>
              <HighlightOff
                sx={{ cursor: "pointer" }}
                onClick={handleCloseDelete}
                color="error"
              />
            </Box>
            <Box py={4} textAlign={"center"}>
              <img src={delImg} alt="" />
              <Typography py={2} variant="body1">
                {` Delete This ${roomName} ?`}
              </Typography>
              <Typography variant="caption">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </Typography>
            </Box>
            <Button
              onClick={onSubmitDelete}
              sx={{ display: "flex", ml: "auto" }}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const styleModaleFac = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const styleModalView = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "50%" },
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const styleModalImages = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "65%" },
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
