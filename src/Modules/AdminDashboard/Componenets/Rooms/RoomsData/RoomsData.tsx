import { CloudUpload, DeleteForever } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CreateRoom,
  FacilitiesInterface,
} from "../../../../../Interfaces/interFaces";
import { getBaseUrl } from "../../../../../Utils/Utils";
import style from "../Rooms.module.css";

export default function RoomsData() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<FacilitiesInterface[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateRoom>();

  const getFacilities = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities?page=1&size=1000`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const reRenderFacilities = data.data.facilities.map(
        (fac: FacilitiesInterface) => ({
          ...fac,
          datafac: { id: fac._id, name: fac.name },
        })
      );
      setFacilities(reRenderFacilities);
      console.log(reRenderFacilities);
      // console.log(local);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data: CreateRoom) => {
    setSpinner(true);
    setIsClicked(true);
    const registerFormData = appendToFormData(data);
    try {
      const res = await axios.post(
        `${getBaseUrl()}/api/v0/admin/rooms`,
        registerFormData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setSpinner(false);
      toast.success(res.data.message);
      navigate("/dashboard/rooms");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail adding");
      }
      setSpinner(false);
    }
    setIsClicked(false);
  };
  const appendToFormData = (data: CreateRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("discount", data.discount);
    for (let i = 0; i < data.facilities.length; i++) {
      formData.append("facilities", data.facilities[i]);
    }
    for (let i = 0; i < data.imgs.length; i++) {
      formData.append("imgs", data.imgs[i]);
    }
    return formData;
  };
  useEffect(() => {
    getFacilities();
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
                Add Room
                <Typography variant="body1">You can add new room</Typography>
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
                  navigate("/dashboard/rooms");
                }}
                sx={{
                  py: 1,
                  px: 3,
                }}
                variant="contained"
                color="info"
              >
                Back to Rooms
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box width={"90%"} mx={"auto"} mt={8}>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            autoComplete="off"
            width={"100%"}
          >
            <Controller
              name="roomNumber"
              control={control}
              defaultValue=""
              rules={{
                required: "Room Number is rrquiers",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="text"
                  label="Room Numbe"
                  sx={{ mt: 3 }}
                  error={!!errors.roomNumber}
                />
              )}
            />
            {errors?.roomNumber && (
              <Typography sx={{ ml: 2 }} variant="caption" color="error">
                {errors?.roomNumber?.message}
              </Typography>
            )}
            <Grid container columnSpacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Price is rrquiers",
                    pattern: {
                      value: /^[\d]{1,9}$/gm,
                      message: "Price only numbers",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="text"
                      label="Price"
                      sx={{ mt: 3 }}
                      error={!!errors.price}
                    />
                  )}
                />
                {errors?.price && (
                  <Typography sx={{ ml: 2 }} variant="caption" color="error">
                    {errors?.price?.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="capacity"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Capacity Is Required",
                    pattern: {
                      value: /^[\d]{1,9}$/gm,
                      message: "Capacity only numbers",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="text"
                      label="Capacity"
                      sx={{ mt: 3 }}
                      error={!!errors.capacity}
                      helperText={
                        errors.capacity ? errors.capacity?.message : ""
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="discount"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Discount is rrquiers",
                    pattern: {
                      value: /^[\d]{1,9}$/gm,
                      message: "Discount only numbers",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="text"
                      label="Discount"
                      sx={{ mt: 3 }}
                      error={!!errors.discount}
                    />
                  )}
                />
                {errors?.discount && (
                  <Typography sx={{ ml: 2 }} variant="caption" color="error">
                    {errors?.discount?.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="facilities"
                  control={control}
                  defaultValue={[]}
                  type="text"
                  rules={{
                    required: "Facilities Is Required",
                  }}
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.discount}
                      sx={{ mt: 3 }}
                      fullWidth
                    >
                      <InputLabel id="facilities">Facilities</InputLabel>
                      <Select
                        {...field}
                        fullWidth
                        labelId="facilities"
                        label="facilities"
                        multiple
                      >
                        {facilities.map((fac) => (
                          <MenuItem selected value={fac._id} key={fac._id}>
                            {fac.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                {errors?.facilities && (
                  <Typography sx={{ ml: 2 }} variant="caption" color="error">
                    {errors?.facilities?.message}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* image  */}
            <Box className={style.formImage}>
              <Box className="mb-2">
                <input
                  {...register("imgs", {
                    required: "Images is Required",
                  })}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFileName(file.name);
                      setImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {image ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src={image} width={60} height={60} alt={fileName} />
                  </Box>
                ) : (
                  <Box
                    py={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CloudUpload />
                    <span>Choose an Item Images to Upload</span>
                  </Box>
                )}
              </Box>
              <span>
                {fileName}
                {image ? (
                  <DeleteForever
                    color="error"
                    sx={{ ml: ".6rem", cursor: "pointer" }}
                    onClick={() => {
                      setFileName("No Selected File");
                      setImage(null);
                    }}
                  />
                ) : null}
              </span>
              {errors.imgs && (
                <Typography sx={{ ml: 2 }} variant="caption" color="error">
                  {errors.imgs.message}
                </Typography>
              )}
            </Box>
            <Box
              mt={3}
              mx={"auto"}
              width={"70%"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Button
                onClick={() => {
                  navigate("/dashboard/rooms");
                }}
                type="button"
                sx={{ py: 1, px: 5, fontSize: "1rem", fontWeight: "600" }}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  py: 1,
                  px: 5,
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
                disabled={isClicked}
              >
                {spinner ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
