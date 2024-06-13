import { HomeMax } from "@mui/icons-material";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { getBaseUrl } from "../../../../Utils/Utils";

export default function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<{
    _id: string;
    roomNumber: string;
    images: string[];
    facilities: { name: string }[];
    discount: number;
    price: number;
  }>({
    _id: "",
    roomNumber: "",
    images: [],
    facilities: [],
    discount: 0,
    price: 0,
  });
  const navigate = useNavigate();
  const { requestHeaders } = useAuth();
  const [reservedDays, setReservedDays] = useState<number>(0);

  // calculate the number of days between two dates on changing the datePicker
  const handleDateRangeChange = (range: any) => {
    if (range[0] && range[1]) {
      const editedDate = {
        start: dayjs(range[0]).format("YYYY-MM-DD"),
        end: dayjs(range[1]).format("YYYY-MM-DD"),
      };
      const startDate = dayjs(editedDate.start);
      console.log(startDate);
      const endDate = dayjs(editedDate.end);
      const days = endDate.diff(startDate, "day");
      setReservedDays(days);
    }
  };

  const getRoomDetails = useCallback(
    async (roomId: string | undefined) => {
      try {
        const { data } = await axios.get(
          `${getBaseUrl()}/api/v0/portal/rooms/${roomId}`,
          {
            headers: requestHeaders,
          }
        );
        setRoom(data.data.room);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "fail adding");
        }
      }
    },
    [requestHeaders]
  );

  useEffect(() => {
    getRoomDetails(id);
  }, [getRoomDetails, id]);

  return (
    <Container maxWidth="xl">
      <Typography
        marginTop={{ xs: "20px", md: "50px" }}
        display="flex"
        justifyContent="center"
        color="#152C5B"
        variant="h5"
        fontWeight="bold"
      >
        {room.roomNumber}
      </Typography>
      <Typography display="flex" justifyContent="center" color="#152C5B">
        {room._id}
      </Typography>
      <Stack
        flexDirection="row"
        justifyContent="start"
        marginBottom="60px"
        sx={{
          marginTop: {
            xs: "20px",
            sm: "0",
          },
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: "20px" }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit">
            {room.roomNumber}
          </Link>
        </Breadcrumbs>
      </Stack>
      <Grid
        container
        justifyContent="center"
        marginTop="35px"
        marginBottom="35px"
        spacing={2}
      >
        {room.images &&
          room.images.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                component="img"
                src={img}
                alt={`Room image ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
                maxHeight={"400px"}
              />
            </Grid>
          ))}
      </Grid>
      <Grid container columns={12} spacing={4} justifyContent={"space-between"}>
        <Grid item xs={12} lg={5}>
          <Typography>
            Design is a plan or specification for the construction of an object
            or system or for the implementation of an activity or process, or
            the result of that plan or specification in the form of a prototype,
            product or process. The national agency for design: enabling
            Singapore to use design for economic growth and to make lives
            better.
          </Typography>
          <Box
            component={"div"}
            display={"flex"}
            alignItems={"center"}
            marginTop={"30px"}
            flexWrap={"wrap"}
          >
            {room.facilities && room.facilities.length > 0 ? (
              room.facilities.map((fac, index) => {
                return (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bgcolor={"teal"}
                    flexWrap={"wrap"}
                    sx={{
                      margin: "3px 10px",
                      padding: "10px",
                      borderRadius: "20px",
                    }}
                    key={index}
                  >
                    <HomeMax />
                    <Typography marginLeft={1}> {fac.name}</Typography>
                  </Box>
                );
              })
            ) : (
              <Typography bgcolor={"tomato"} padding={2} borderRadius={2}>
                No Facilities 😞
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          sx={{ border: "1px solid black", marginTop: { xs: "20px", sm: "0" } }}
          padding={2}
        >
          <Stack
            display={"flex"}
            justifyContent={"center"}
            alignItems={"start"}
            direction={"column"}
            spacing={3}
          >
            <Typography color={"#152C5B"} fontWeight={"bold"} component={"h3"}>
              Start Booking
            </Typography>
            <Box display={"flex"} justifyContent={"start"}>
              <Typography color={"teal"} fontSize={"2rem"} fontWeight={600}>
                ${room.price}
              </Typography>
              <Typography
                fontSize={"2rem"}
                marginLeft={1}
                color={"rgba(176, 176, 176, 1)"}
              >
                per Night
              </Typography>
            </Box>
            <Box color={"tomato"}>Discount {room.discount} % Off </Box>
            <Box>
              <Stack
                sx={{
                  position: "relative",
                  bgcolor: "rgba(245, 246, 2410, 1)",
                  marginTop: "5px",
                }}
              >
                <CalendarMonthTwoToneIcon
                  sx={{
                    bgcolor: "rgba(21, 44, 91, 1)",
                    height: "100%",
                    width: "3.8rem",
                    padding: "0 5px",
                    position: "absolute",
                    fontSize: ".8rem",
                    color: "white",
                    cursor: "pointer",
                    zIndex: "3",
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["SingleInputDateRangeField"]}
                    sx={{ paddingTop: "0" }}
                  >
                    <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                      name="allowedRange"
                      sx={{
                        "& fieldset": {
                          border: "0",
                        },
                        "& input": {
                          color: {
                            xs: "#152C5B !important",
                            sm: "#152C5B !important",
                          },
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: {
                            xs: "15px",
                          },
                          margin: "auto",
                          marginLeft: { xs: "60px" },
                          cursor: "pointer",
                        },
                      }}
                      className="dateInput"
                      onChange={handleDateRangeChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            </Box>
            <Typography>
              You will pay
              <span
                style={{
                  fontWeight: "bold",
                  color: "teal",
                  margin: "0 5px",
                }}
              >
                {reservedDays * room.price}
              </span>
              USD per{" "}
              <span
                style={{
                  color: "teal",
                  margin: "0 5px",
                }}
              >
                2 Person
              </span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                margin: "30px auto !important",
                textAlign: "center",
                filter: "drop-shadow(2px 2px 2px #466a63)",
                padding: "15px 25px",
              }}
              onClick={() => navigate("/payment")}
            >
              Continue Book
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
