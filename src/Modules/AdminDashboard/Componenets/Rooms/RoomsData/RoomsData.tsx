import {
  Box,
  Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import Style from "../../../../AuthModule/Components/Auth.module.css";
import { AddRoomFormData, RoomInterface } from "../../../../../Interfaces/interFaces";
import { baseUrl, getBaseUrl } from "../../../../../Utils/Utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { CloudUpload, DeleteForever } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function RoomsData() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");
  const [fileInputKey, setFileInputKey] = useState<number>(0); // Key to force re-render file input
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<AddRoomFormData>();


  const onSubmit: SubmitHandler<AddRoomFormData> = async (data) => {
    setSpinner(true);
    setIsClicked(true);
    const registerFormData = appendToFormData(data);
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/v0/admin/rooms`,
        registerFormData
      );
      console.log(response.data.data);
      
      setSpinner(false);
      toast.success(response.data.message);

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "Cannot Add Room"
        );
      }
      setSpinner(false);
    }
  };

  const appendToFormData = (data: AddRoomFormData) => {
    const formData = new FormData();
    formData.append("roomNumber", data.userName);
    formData.append("imgs", data.email);
    formData.append("price", data.password);
    formData.append("capacity", data.confirmPassword);
    formData.append("discount", data.phoneNumber);
    formData.append("facilities", data.country);
    return formData;
  };



  return (
    <Box onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{width: "100%", display: "flex"}}
        autoComplete="off" style={{
      flexDirection: "column",
      margin: "5",
    }}>
      <Typography mb={2}>View All Rooms</Typography>
      <Typography variant="h4" fontWeight="bold">Add New Room</Typography>
      <Stack padding={12} direction="column" spacing={2} sx={{alignItems: "center"}}>
        <Stack>
          <TextField sx={{width: "100%"}} label="Room Number"
          type="text"
          
          >Item 1</TextField>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Price">Item 1</TextField>
          <TextField fullWidth label="Capacity">Item 1</TextField>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Discount">Item 1</TextField>
          {errors?.email && (
                    <Typography sx={{ ml: 2 }} variant="caption" color="error">
                      {errors?.email?.message}
                    </Typography>
                  )}


          <TextField fullWidth label="Facilities">Item 1</TextField>
        </Stack>
        {/* image  */}
        <Stack className={Style.formImage}>
                    <Box className="mb-2">
                      <input
                        key={fileInputKey}
                        {...register("imgs", {
                          required: "Image is Required",
                        })}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFileName(file.name);
                            setImage(URL.createObjectURL(file));
                            setFileInputKey((prev) => prev + 1);
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
                          <img
                            src={image}
                            width={60}
                            height={60}
                            alt={fileName}
                          />
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
                          <span>Choose an Item Image to Upload</span>
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
                            setFileInputKey((prev) => prev + 1);
                          }}
                        />
                      ) : null}
                    </span>
                    {errors.imgs && (
                      <Typography
                        sx={{ ml: 2 }}
                        variant="caption"
                        color="error"
                      >
                        {errors.imgs.message}
                      </Typography>
                    )}
        </Stack>
      </Stack>

      <Stack direction="row" spacing={5} sx={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", mr: "100px" }}>
        
        <Button
            variant="outlined"
            onClick={() => {
              navigate("/dashboard/rooms")}}
            color="primary"
            sx={{ mt: 2, mb: 2, py: 1, width: "15%"}}
            disabled={isClicked}
            >
            {spinner ? (
              <CircularProgress size={24} color="inherit" />
              ) : (
                "cancel"
              )}
        </Button>
        
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2, py: 1, width: "10%", backgroundColor: "#203FC7", color: "white", fontWeight: "bold" }}
            disabled={isClicked}
            >
            {spinner ? (
              <CircularProgress size={24} color="inherit" />
              ) : (
                "save"
              )}
        </Button>
      </Stack>
    </Box>
  )
}
