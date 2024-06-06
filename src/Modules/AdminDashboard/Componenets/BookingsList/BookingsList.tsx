import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { HighlightOff, RemoveRedEyeSharp } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { BookingsInterface } from "../../../../Interfaces/interFaces";
import { getBaseUrl } from "../../../../Utils/Utils";
import { toast } from "react-toastify";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function BookingsList() {
  const [bookings, setBookings] = useState<BookingsInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [maxSize, setMaxSize] = useState<number>(10);
  const [viewedUser, setViewedUser] = useState<BookingsInterface>({});

  const { requestHeaders } = useAuth();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (value: BookingsInterface) => {
    setViewedUser(value);
    handleOpen();
  };

  const columns = [
    {
      label: "Room Number",
      name: "roomNumber",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      label: "Price",
      name: "totalPrice",
      options: {
        customBodyRender: (value: number) => value,
      },
    },
    {
      label: "Start Date",
      name: "startDate",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      label: "End Date",
      name: "endDate",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      label: "User",
      name: "userName",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      name: "datauser",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value: BookingsInterface) => (
          <>
            <RemoveRedEyeSharp
              onClick={() => handleView(value)}
              sx={{ cursor: "pointer" }}
            />
          </>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30, bookings.length],
    responsive: "vertical",
    download: false,
    print: false,
  };

  const getBookingsList = useCallback(
    async (maxSize: number) => {
      try {
        const { data } = await axios.get(
          `${getBaseUrl()}/api/v0/admin/booking?page=1&size=${maxSize}`,
          {
            headers: requestHeaders,
          }
        );
        console.log(data.data);
        setMaxSize(data.data.totalCount);
        const reRenderBookings = data.data.bookings.map((booking: BookingsInterface) => ({
          ...booking,
          datauser: {
            roomNumber: booking.room.roomNumber,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalPrice: booking.totalPrice,
          },
        }));
        setBookings(reRenderBookings);
        console.log(reRenderBookings);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "fail in api request");
        }
      }
    },
    [requestHeaders]
  );

  useEffect(() => {
    getBookingsList(maxSize);
  }, [getBookingsList, maxSize]);

  return (
    <>
      <Box component="section" width="100%">
        <Box p={3} component="header" boxShadow={1}>
          <Grid container rowSpacing={2}>
            <Grid
              display="flex"
              justifyContent={{ sm: "start", xs: "center" }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Typography variant="h5" fontWeight="500">
                Booking Table Details
                <Typography variant="body1">
                  You can check all details
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/*Rendering The data table */}
        <CacheProvider value={muiCache}>
          <Box width="90%" mx="auto" my={8}>
            <MUIDataTable
              title={"Booking List"}
              data={bookings}
              columns={columns}
              options={options}
            />
          </Box>
        </CacheProvider>
      </Box>

      {/* modal view */}
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
            <Box display="flex" justifyContent="space-between">
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Booking Details
              </Typography>
              <HighlightOff
                sx={{ cursor: "pointer" }}
                onClick={handleClose}
                color="error"
              />
            </Box>
            <Box width="100%" sx={{ padding: "15px" }}>
              <Box
                sx={{ textAlign: "center" }}
                height="50vh !important"
              >
                <img
                  src={viewedUser.roomNumber}
                  alt="iamge"
                  width="inherit"
                  height="100%"
                  style={{ margin: "auto" }}
                />
              </Box>
              <Stack direction="column" spacing={2} sx={{ padding: "15px" }}>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography> User : </Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser.user}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography> Room Number : </Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser.roomNumber}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography> Price : </Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser.totalPrice}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography> Start Date : </Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser.startDate}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography> End Date : </Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser.endDate}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
