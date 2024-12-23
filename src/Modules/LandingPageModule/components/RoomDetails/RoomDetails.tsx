import {
  DeleteOutlineOutlined,
  HomeMax,
  ModeEditOutlineOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Input,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../Context/AuthContext/AuthContext";
import { getBaseUrl } from "../../../../Utils/Utils";

export default function RoomDetails() {
  // getting RoomId
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
  const [allComments, setAllComments] = useState<
    {
      _id: string;
      comment: string;
      user: { profileImage: string; userName: string; _id: string };
    }[]
  >([]);
  const [roomReviews, setRoomReviews] = useState<
    {
      _id: string;
      review: string;
      rating: number;
      user: { profileImage: string; userName: string; _id: string };
    }[]
  >([]);
  const navigate = useNavigate();
  const { requestHeaders, loginData, setBookingId, setSubtotal } = useAuth();
  const [reservedDays, setReservedDays] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [rangeObject, setRangeObject] = useState<{
    start: string;
    end: string;
  }>({ start: "", end: "" });

  const actions = [
    {
      icon: <ModeEditOutlineOutlined />,
      name: "Edit",
    },
    {
      icon: <DeleteOutlineOutlined />,
      name: "Delete",
    },
  ];

  // styling rate
  const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));
  // rate limits
  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: "Very Satisfied",
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  // calculate the number of days between two dates on changing the datePicker
  const handleDateRangeChange = (range) => {
    if (range[0] && range[1]) {
      const editedDate = {
        start: dayjs(range[0]).format("YYYY-MM-DD"),
        end: dayjs(range[1]).format("YYYY-MM-DD"),
      };
      const startDate = dayjs(editedDate.start);
      const endDate = dayjs(editedDate.end);
      const days = endDate.diff(startDate, "day");
      setReservedDays(days);
      setRangeObject(editedDate);
    }
  };

  const handleSendBooking = async () => {
    if (loginData) {
      try {
        const res = await axios.post(
          `${getBaseUrl()}/api/v0/portal/booking`,
          {
            startDate: rangeObject.start,
            endDate: rangeObject.end,
            room: id,
            totalPrice:
              reservedDays > 0 ? reservedDays * room.price : room.price,
          },
          { headers: requestHeaders }
        );
        toast.success(res.data.message);
        setBookingId(res.data.data.booking._id);
        localStorage.setItem("bookingId", res.data.data.booking._id);
        localStorage.setItem(
          "subtotal",
          reservedDays > 0 ? reservedDays * room.price : room.price
        );
        setSubtotal(reservedDays > 0 ? reservedDays * room.price : room.price);
        setTimeout(() => {
          navigate(`/payment`);
        }, 1500);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "Failed to book");
        }
      }
    } else {
      toast.info("Please login to book");
    }
  };

  const handleActionOnComment = async (
    action: string,
    commentId: string,
    com: { comment: string }
  ) => {
    if (action === "Edit") {
      setEditingCommentId(commentId);
      setComment(com.comment);
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    } else if (action === "Delete") {
      try {
        const res = await axios.delete(
          `${getBaseUrl()}/api/v0/portal/room-comments/${commentId}`,
          {
            headers: requestHeaders,
          }
        );
        toast.success(res.data.message || "Comment deleted successfully");
        getAllRoomComments(id);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(
            error.response.data.message || "Failed to delete comment"
          );
        }
      }
    }
  };

  // sending comment carries two cases one for creation and another for editing
  const handleSendComment = async () => {
    try {
      if (editingCommentId) {
        // Editing existing comment
        const res = await axios.patch(
          `${getBaseUrl()}/api/v0/portal/room-comments/${editingCommentId}`,
          {
            comment: comment,
          },
          {
            headers: requestHeaders,
          }
        );
        toast.success(res.data.message || "Comment edited successfully");
      } else {
        // Creating new comment
        const res = await axios.post(
          `${getBaseUrl()}/api/v0/portal/room-comments`,
          {
            roomId: id,
            comment: comment,
          },
          {
            headers: requestHeaders,
          }
        );
        toast.success(res.data.message || "Comment added successfully");
        setShowComments(!showComments);
      }
      setEditingCommentId(null);
      setComment("");
      getAllRoomComments(id);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (editingCommentId) {
          toast.error(error.response.data.message || "Failed to edit comment");
        } else {
          toast.error(error.response.data.message || "Failed to add comment");
        }
      }
    }
  };

  const getAllRoomComments = useCallback(
    async (roomId: string | undefined) => {
      try {
        const { data } = await axios.get(
          `${getBaseUrl()}/api/v0/portal/room-comments/${roomId}`,
          {
            headers: requestHeaders,
          }
        );
        setAllComments(data.data.roomComments);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "fail adding");
        }
      }
    },
    [requestHeaders]
  );
  const handleSendRate = async () => {
    try {
      const res = await axios.post(
        `${getBaseUrl()}/api/v0/portal/room-reviews`,
        {
          roomId: id,
          rating: rate,
          review: review,
        },
        {
          headers: requestHeaders,
        }
      );
      toast.success(res.data.message || "Review added successfully");
      setRate(0);
      setReview("");

      getAllRoomReviews(id);
      setShowReviews(!showReviews);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "fail adding");
      }
    }
  };

  const getAllRoomReviews = useCallback(
    async (roomId: string | undefined) => {
      try {
        const { data } = await axios.get(
          `${getBaseUrl()}/api/v0/portal/room-reviews/${roomId}`,
          {
            headers: requestHeaders,
          }
        );
        setRoomReviews(data.data.roomReviews);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "fail adding");
        }
      }
    },
    [requestHeaders]
  );

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
    if (loginData) {
      getAllRoomComments(id);
      getAllRoomReviews(id);
    }
  }, [getAllRoomComments, getRoomDetails, getAllRoomReviews, id, loginData]);

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
        {room.images && room.images.length > 0 ? (
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
          ))
        ) : (
          <Typography>No Available Images 😞 </Typography>
        )}
      </Grid>
      <Grid
        container
        columns={12}
        spacing={4}
        justifyContent={"space-between"}
        sx={{ marginTop: "30px", paddingLeft: { xs: "25px", md: "0" } }}
      >
        <Grid item xs={12} lg={5}>
          <Typography
            sx={{ paddingLeft: "0px !important", fontFamily: "poppins" }}
          >
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
                    gap={1}
                    bgcolor={"rgba(25, 118, 210, 0.12)"}
                    boxShadow={"2px 2px 2px gray"}
                    flexWrap={"wrap"}
                    sx={{
                      margin: "3px 10px",
                      padding: "10px",
                      borderRadius: "20px",
                    }}
                    key={index}
                  >
                    <HomeMax />
                    <Typography marginLeft={1} fontFamily={"poppins"}>
                      {fac.name}
                    </Typography>
                  </Box>
                );
              })
            ) : (
              <Typography
                bgcolor={"rgba(25, 118, 210, 0.2)"}
                padding={"12px"}
                borderRadius={2}
                fontWeight={"bold"}
                fontFamily={"poppins"}
              >
                No Facilities 😞
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          sx={{ border: "1px solid ", marginTop: { xs: "20px", sm: "0" } }}
          padding={2}
        >
          <Stack
            display={"flex"}
            justifyContent={"center"}
            alignItems={"start"}
            direction={"column"}
            spacing={3}
          >
            <Typography
              color={"#152C5B"}
              fontWeight={"bold"}
              component={"h3"}
              fontFamily={"poppins"}
            >
              Start Booking
            </Typography>
            <Box display={"flex"} justifyContent={"start"}>
              <Typography
                color={"teal"}
                fontSize={"2rem"}
                fontWeight={400}
                fontFamily={"poppins"}
              >
                ${room.price}
              </Typography>
              <Typography
                fontSize={"2rem"}
                marginLeft={1}
                color={"rgba(176, 176, 176, 1)"}
                fontFamily={"poppins"}
              >
                per Night
              </Typography>
            </Box>
            <Box color={"tomato"} fontFamily={"poppins"}>
              Discount {room.discount} % Off
            </Box>
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
                    width: "3rem",
                    padding: "0 3px",
                    position: "absolute",
                    fontSize: ".8rem",
                    color: "white",
                    zIndex: "1",
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["SingleInputDateRangeField"]}
                    sx={{ paddingTop: "0", zIndex: "2" }}
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
            <Typography fontFamily={"poppins"}>
              You will pay
              <span
                style={{
                  fontWeight: "bold",
                  color: "teal",
                  margin: "0 5px",
                  fontFamily: "poppins",
                }}
              >
                {reservedDays > 0 ? reservedDays * room.price : room.price}
              </span>
              USD per
              <span
                style={{
                  color: "teal",
                  margin: "0 5px",
                  fontFamily: "poppins",
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
                fontFamily: "poppins",
              }}
              onClick={() => handleSendBooking()}
            >
              Continue Book
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/*Start Review , Comment */}
      {loginData ? (
        <Grid
          container
          columns={12}
          spacing={4}
          justifyContent={"space-around"}
          sx={{ marginTop: "40px", paddingLeft: { xs: "25px", md: "0" } }}
        >
          <Grid xs={12} lg={5}>
            <Stack
              component={"section"}
              display={"flex"}
              direction={"column"}
              gap={3}
              height={"100%"}
            >
              <Typography
                component={"h1"}
                sx={{ fontWeight: "bold" }}
                fontFamily={"poppins"}
              >
                Rate
              </Typography>
              <Box>
                <StyledRating
                  name="highlight-selected-only"
                  value={rate}
                  IconContainerComponent={IconContainer}
                  getLabelText={(value: number) => customIcons[value].label}
                  highlightSelectedOnly
                  onChange={(e) => setRate(e.target?.value)}
                  sx={{ "& label": { margin: "0 7px" } }}
                />
              </Box>
              <Typography
                component={"h4"}
                sx={{ fontWeight: "bold" }}
                fontFamily={"poppins"}
              >
                Message
              </Typography>
              <Input
                aria-label="Demo input"
                multiline
                placeholder="Enter Your Review..."
                sx={{
                  height: "150px",
                  border: "1px solid #1976d2",
                  padding: "10px",
                  borderRadius: "30px 0px 0 0",
                }}
                onChange={(e) => setReview(e.target.value)}
                value={review}
              />

              <Button
                variant="contained"
                sx={{ width: "25%", marginRight: "auto" }}
                fontFamily={"poppins"}
                onClick={() => handleSendRate()}
              >
                Rate
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12} lg={5} sx={{ marginTop: { xs: "30px", lg: "0" } }}>
            <Stack
              component={"section"}
              display={"flex"}
              direction={"column"}
              justifyContent={"space-between"}
              gap={3}
              height={"100%"}
            >
              <Typography
                component={"h4"}
                sx={{ fontWeight: "bold" }}
                fontFamily={"poppins"}
              >
                Add Your Comment
              </Typography>
              <Input
                aria-label="Demo input"
                multiline
                placeholder="Enter Your Comment..."
                sx={{
                  height: "150px",
                  border: "1px solid #1976d2",
                  padding: "10px",
                  borderRadius: "30px 0 0 0",
                }}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                ref={commentInputRef}
              />
              <Button
                variant="contained"
                sx={{
                  width: "25%",
                  marginRight: "auto",
                  fontFamily: "poppins",
                }}
                onClick={() => handleSendComment()}
              >
                Comment
              </Button>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      {/*Showing Comments*/}
      <Grid sx={{ marginTop: "50px" }}>
        <Button
          sx={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setShowComments(!showComments)}
        >
          <Typography sx={{ fontWeight: "bold" }} fontFamily={"poppins"}>
            Room Comments
          </Typography>
          <KeyboardArrowDownOutlinedIcon />
        </Button>
        {allComments.length > 0 ? (
          allComments.map(
            (
              com: {
                _id: string;
                comment: string;
                user: { profileImage: string; userName: string; _id: string };
              },
              index: number
            ) => {
              return (
                <Stack key={index} display={showComments ? "block" : "none"}>
                  <Stack
                    display={"flex"}
                    direction={"row"}
                    flexWrap={"nowrap"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    boxShadow={"2px 2px 2px #466a63"}
                    margin={"10px 0"}
                    padding={"7px"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      gap={3}
                    >
                      <Tooltip title={com?.user?.userName} placement="top">
                        <img
                          src={com?.user?.profileImage}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "25px",
                            margin: "auto",
                          }}
                          alt="..."
                        />
                      </Tooltip>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            color: "teal",
                          }}
                        >
                          {com?.user?.userName}
                        </Typography>
                        <Typography>{com.comment}</Typography>
                      </Box>
                    </Box>
                    {loginData?._id == com.user._id ? (
                      <Box
                        sx={{
                          transform: "translateZ(0px)",
                        }}
                      >
                        <SpeedDial
                          ariaLabel="SpeedDial basic example"
                          sx={{
                            position: "absolute",
                            bottom: -27,
                            right: 0,
                            "& button": { width: "40px", height: "40px" },
                          }}
                          icon={<MoreHorizOutlined />}
                          direction="left"
                        >
                          {actions.map((action) => (
                            <SpeedDialAction
                              key={action.name}
                              icon={action.icon}
                              tooltipTitle={action.name}
                              onClick={() =>
                                handleActionOnComment(action.name, com._id, com)
                              }
                            />
                          ))}
                        </SpeedDial>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Stack>
                </Stack>
              );
            }
          )
        ) : (
          <Typography
            component={"h1"}
            fontFamily={"poppins"}
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            no comments yet 😠
          </Typography>
        )}
      </Grid>
      {/*Showing Reviews */}
      <Grid sx={{ marginTop: "50px" }}>
        <Button
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowReviews(!showReviews)}
        >
          <Typography sx={{ fontWeight: "bold" }} fontFamily={"poppins"}>
            Room Reviews
          </Typography>
          <KeyboardArrowDownOutlinedIcon />
        </Button>
        {roomReviews.length > 0 ? (
          roomReviews.map(
            (
              rev: {
                _id: string;
                review: string;
                rating: number;
                user: { profileImage: string; userName: string; _id: string };
              },
              index: number
            ) => {
              return (
                <Stack key={index} display={showReviews ? "block" : "none"}>
                  <Stack
                    display={"flex"}
                    direction={"row"}
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    boxShadow={"2px 2px 2px #466a63"}
                    margin={"10px 0"}
                    padding={"7px"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      gap={3}
                    >
                      <Tooltip title={rev?.user?.userName} placement="top">
                        <img
                          src={rev?.user?.profileImage}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "25px",
                            margin: "auto",
                          }}
                          alt="..."
                        />
                      </Tooltip>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            color: "teal",
                          }}
                        >
                          {rev?.user?.userName}
                        </Typography>
                        <Rating value={rev?.rating} readOnly />
                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              );
            }
          )
        ) : (
          <Typography
            component={"h1"}
            fontFamily={"poppins"}
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            no reviews yet 😠
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
