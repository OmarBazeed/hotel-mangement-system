import axios from "axios";
import { useEffect, useState } from "react";
import {
  adsForm,
  AdsInterface,
  roomsInterface,
  UpdateAdsForm,
} from "../../../../../Interfaces/interFaces";
import {
  Box,
  Grid,
  Typography,
  Button,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { DeleteForever, Draw, HighlightOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import delImg from "../../../../../assets/images/noData.png";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function AdsList() {
  const [ads, setAds] = useState<AdsInterface[]>([]);
  const [rooms, setRooms] = useState("")
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [adID, setAdID] = useState<string | null>(null);
  const [adName, setAdName] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [roomSelect, setRoomSelect] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<adsForm, UpdateAdsForm>();

  const handleChange = (event: SelectChangeEvent) => {
    setRoomSelect(event.target.value as string);
  };
  const handleOpen = () => setOpen(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleClose = () => {
    setOpen(false);
    setAdID(null);
    setAdName(null);
    setValue("room", "");
    setValue("discount", "");
    setValue("isActive", false);
    setIsUpdate(false);
  };
  const handleUpdate = (id: string, name: string, discount: string, isActive: boolean) => {
    setAdID(id);
    setAdName(name);
    handleOpen();
    setValue("room", name);
    setValue("discount", discount);
    setValue("isActive", isActive);
    setIsUpdate(true);
  };
  const handleDelete = (id: string, name: string) => {
    setAdID(id);
    setAdName(name);
    handleOpenDelete();
  };
  const columns = [
  {
    name: `roomNumber`,
    label: "Room Name",
    options: {
      customBodyRender: (value: string) => {
        return value ? value : "nothing";
      }
    }
  },
  {
    name: "price",
    label: "Price",
    options: {
      customBodyRender: (value: string) => {
        return value ? value : "nothing";
      }
    }
  },
  {
    name: "discount",
    label: "Discount",
    options: {
      customBodyRender: (value: string) => {
        return value ? value : "nothing";
      }
    }
  },
  {
    name: "capacity",
    label: "Capacity",
    options: {
      customBodyRender: (value: string) => {
        return value ? value : "nothing";
      }
    }
  },
  {
    name: "isActive",
    label: "Active",
    options: {
      customBodyRender: (value) => {
        return value ? "Active" : "InActive";
      }
    }
  },
  {
    name: "dataAd",
    label: "Actions",
    options: {
      filter: false,
      customBodyRender: (value: { id: string; name: string }) => {
        return (
          <>
            <DeleteForever
              onClick={() => handleDelete(value.id, value.name)}
              sx={{ mr: 2, cursor: "pointer" }}
            />
            <Draw
              onClick={() => handleUpdate(value.id, value.name)}
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
    rowsPerPageOptions: [10, 20, 30, ads.length],
    responsive: "vertical",
    download: false,
    print: false,
  };

  

  const getAds = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads?page=1&size=1000`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const reRenderAds = data.data.ads.map((ad: AdsInterface) => ({
        ...ad,
        dataAd: { id: ad._id, name: ad.room.roomNumber }, // Make sure to access correct room property
        isActive: ad.isActive,
        roomNumber: ad.room.roomNumber,
        capacity: ad.room.capacity,
        price: ad.room.price,
        discount: ad.room.discount  // Make sure to access correct isActive property
      }));
      setAds(reRenderAds);
      console.log(reRenderAds)
    } catch (error) {
      console.log(error);
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
      const reRenderRooms = data.data.rooms.map((room: roomsInterface) => ({
        ...room,
        dataAd: { id: room._id, roomNumber: room.roomNumber }, // Make sure to access correct room property
        roomNumber: room.roomNumber,
        id: room._id
      }));
      setRooms(reRenderRooms);
      console.log(reRenderRooms)
    } catch (error) {
      console.log(error);
    }
  };


  const onSubmitAdd = async (data: adsForm) => {
    setSpinner(true);

    try {
      const res = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads`,
        data,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setSpinner(false);
      getAds();
      handleClose();
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail add");
      }
      setSpinner(false);
    }
  };
  const onSubmitUpdate = async (data: adsForm) => {
    setSpinner(true);

    try {
      const res = await axios.put(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/${adID}`,
        data,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      getAds();
      handleClose();
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail add");
      }
      setSpinner(false);
    }
    setSpinner(false);
  };
  const onSubmitDelete = async () => {
    setSpinner(true);

    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/${adID}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      getAds();
      handleCloseDelete();
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail add");
      }
      setSpinner(false);
    }
    setSpinner(false);
  };

  useEffect(() => {
    getAds(), getRooms()
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
                ADS Table Details
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
                onClick={handleOpen}
                sx={{
                  py: 1,
                  px: 3,
                }}
                variant="contained"
                color="info"
              >
                Add New Ads
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CacheProvider value={muiCache}>
          <Box width={"90%"} mx={"auto"} my={8}>
            <MUIDataTable
              title={"Ads List"}
              data={ads}
              columns={columns}
              options={options}
            />
          </Box>
        </CacheProvider>
      </Box>

      {/* modal add and edit */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {isUpdate ? `Update this ${adName}` : " Add Ads"}
              </Typography>
              <HighlightOff
                sx={{ cursor: "pointer" }}
                onClick={handleClose}
                color="error"
              />
            </Box>
            <Box
              py={3}
              onSubmit={handleSubmit(!isUpdate ? onSubmitAdd : onSubmitUpdate)}
              component="form"
              noValidate
              autoComplete="off"
              width={"100%"}
            >
              {(!isUpdate ? <Controller
                name="room"
                control={control}
                defaultValue=""
                rules={{ required: "Room is requierd" }}
                render={({ field }) => (
                  <>
                      <InputLabel id="demo-simple-select-label">Room</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        {...field}
                        fullWidth
                        id="demo-simple-select"
                        value={roomSelect}
                        label="Age"
                        onChange={handleChange}
                      >
                        {rooms.map((room: roomsInterface) => (
                          <MenuItem key={room._id} value={room._id}>
                            {room.roomNumber}
                          </MenuItem>
                        ))}
                      </Select>
                  </>
                )}
              /> : "")}
              
              <Controller
                name="isActive"
                control={control}
                defaultValue=""
                rules={{ required: "Discount is requierd" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    id="filled-error"
                    label="isActive"
                    sx={{ mt: 3 }}
                    error={!!errors.discount}
                    helperText={errors.discount ? errors.discount?.message : ""}
                  />
                )}
              />


              <Controller
                name="discount"
                control={control}
                defaultValue=""
                rules={{ required: "Discount is requierd" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    id="filled-error"
                    label="Discount"
                    sx={{ mt: 3 }}
                    error={!!errors.discount}
                    helperText={errors.discount ? errors.discount?.message : ""}
                  />
                )}
              />
              

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, mb: 2, py: 1, display: "flex", ml: "auto" }}
              >
                {spinner ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Save"
                )}
              </Button>
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
          <Box sx={style}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {`Delete this ${adName}`}
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
                {` Delete This ${adName} ?`}
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

const style = {
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
