import { useCallback, useEffect, useState } from "react";
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
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { BookingsInterface } from "../../../../Interfaces/interFaces";
import { getBaseUrl } from "../../../../Utils/Utils";
import { toast } from "react-toastify";
import moment from "moment";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function BookingsList() {
  const [bookings, setBookings] = useState<BookingsInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [maxSize, setMaxSize] = useState<number>(10);
  const [viewedUser, setViewedUser] = useState<Partial<BookingsInterface>>({});

  const { requestHeaders } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        customBodyRender: (value: string) => moment(value).format("llll"),
      },
    },
    {
      label: "End Date",
      name: "endDate",
      options: {
        customBodyRender: (value: string) => moment(value).format("llll"),
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
              titleAccess={"View"}
              onClick={() => handleView(value)}
              sx={{ cursor: "pointer" }}
            />
          </>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none" as const,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30, bookings.length],
    responsive: "vertical" as const,
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
        console.log(data);
        setMaxSize(data.data.totalCount);
        const reRenderBookings =
          data.data.booking.length > 0 &&
          data.data.booking.map((booking: BookingsInterface) => ({
            ...booking,
            datauser: {
            userName: booking.user?.userName,
            roomNumber: booking.room?.roomNumber,
            Price: booking.totalPrice,
            startDate: booking.startDate,
            endDate: booking.endDate,
            }
          }));

        setBookings(reRenderBookings);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(
            error.response.data.message || "Failed to fetch bookings"
          );
        } else {
          console.error("Error during API call:", error);
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
        {/* Rendering the data table */}
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

      {/* Modal view */}
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
              <Stack direction="column" spacing={2} sx={{ padding: "15px" }}>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography>User:</Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser?.userName || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography>Room Number:</Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser?.roomNumber || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography>Price:</Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {viewedUser?.totalPrice || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography>Start Date:</Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    
                    {moment(viewedUser?.startDate || "N/A").format("llll")}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography>End Date:</Typography>
                  <Typography fontWeight="bold" color="teal" paddingLeft={1}>
                    {moment(viewedUser?.endDate || "N/A").format("llll")}
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
