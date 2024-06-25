import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Home() {
  const [personCount, setPersonCount] = useState<number>(0);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    start: string;
    end: string;
  } | null>(null); // State to store selected date range with correct format
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const incraese = () => {
    setPersonCount((prev) => prev + 1);
  };
  const decraese = () => {
    personCount === 0 ? 0 : setPersonCount((prev) => prev - 1);
  };

  const handleDateRangeChange = (range: any) => {
    if (range[0] && range[1]) {
      const editedDate = {
        start: dayjs(range[0]).format("YYYY-MM-DD"),
        end: dayjs(range[1]).format("YYYY-MM-DD"),
      };
      setSelectedDateRange(editedDate);
    }
  };

  const handleExploreClick = () => {
    if (selectedDateRange) {
      const searchParams = new URLSearchParams({
        start: selectedDateRange.start,
        end: selectedDateRange.end,
        capacity: personCount.toString(),
      }).toString();
      navigate(`/explore?${searchParams}`);
    } else {
      navigate(`/explore`);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        flexDirection={{ xs: "column-reverse", lg: "row" }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: isDark ? "white" : "rgba(21, 44, 91, 1)",
                fontSize: "2rem",
              }}
            >
              Forget Busy Work,
              <br />
              Start Next Vacation
            </Typography>
            <Typography sx={{ color: "rgba(176, 176, 176, 1)" }}>
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                color: isDark ? "white" : "rgba(21, 44, 91, 1)",
              }}
            >
              Start Booking
            </Typography>
            <Typography
              sx={{
                marginBottom: "-15px !important",
                color: isDark ? "white" : "rgba(21, 44, 91, 1)",
              }}
            >
              pick a date
            </Typography>
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
                    zIndex: "1",
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["SingleInputDateRangeField"]}
                    sx={{
                      paddingTop: "0",
                      overflow: "hidden",
                      zIndex: "2",
                    }}
                  >
                    <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                      name="allowedRange"
                      sx={{
                        "& fieldset": {
                          border: "0",
                        },
                        "& input": {
                          width: "100%",
                          color: {
                            xs: "#152C5B !important",
                            sm: "#152C5B !important",
                          },
                          textAlign: "center",
                          fontSize: {
                            xs: "13px",
                            sm: "18px",
                          },
                          margin: "auto",
                          marginLeft: { xs: "37px", md: "0" },
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
            <Typography
              sx={{
                marginBottom: "-15px !important",
                color: isDark ? "white" : "rgba(21, 44, 91, 1)",
              }}
            >
              Capacity
            </Typography>
            <Stack
              sx={{
                position: "relative",
                alignItems: "center",
                justifyContent: "between",
                flexDirection: "row",
                width: "100%",
                bgcolor: "#F5F6FF",
                padding: "10px 0",
              }}
            >
              <Grid
                item
                xs={2}
                sx={{
                  textAlign: "center",
                  position: "absolute",
                  left: "0",
                  height: "100%",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    height: "100%",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    borderRadius: "0",
                  }}
                  variant="contained"
                  color="error"
                  onClick={() => decraese()}
                >
                  -
                </Button>
              </Grid>
              <Grid item xs={8} sx={{ textAlign: "center", margin: "auto" }}>
                <Typography sx={{ fontSize: "1.5rem", color: "#152C5B" }}>
                  {personCount} person
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  textAlign: "center",
                  position: "absolute",
                  right: "0",
                  height: "100%",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    height: "100%",
                    fontSize: "1.1em",
                    borderRadius: "0",
                    fontWeight: "bold",
                    color: "white",
                  }}
                  variant="contained"
                  color="success"
                  onClick={() => incraese()}
                >
                  +
                </Button>
              </Grid>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "50%",
                padding: "12px 8px",
                marginTop: "60px !important",
              }}
              onClick={handleExploreClick}
            >
              Explore
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{ overflow: { xs: "hidden", sm: "visible" } }}
        >
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
            }}
          >
            {imageList.map((item) => (
              <SwiperSlide
                key={item.alt}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: "22px",
                  fontWeight: "bold",
                  color: " #fff",
                  borderRadius: "20% 5% 5% 0",
                  width: { xs: "350px", md: "100%" },
                }}
              >
                <img
                  width={"100%"}
                  height={"500px"}
                  src={item.src}
                  alt={item.alt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
}

const imageList = [
  { src: "../../../../src/assets/images/hero.png", alt: "hotel(0)" },
  { src: "../../../../src/assets/images/hotel(1).jpg", alt: "hotel(1)" },
  { src: "../../../../src/assets/images/hotel(2).jpg", alt: "hotel(2)" },
  { src: "../../../../src/assets/images/hotel(3).jpg", alt: "hotel(3)" },
  { src: "../../../../src/assets/images/hotel(4).jpg", alt: "hotel(4)" },
  { src: "../../../../src/assets/images/hotel(5).jpg", alt: "hotel(5)" },
  { src: "../../../../src/assets/images/hotel(6).jpg", alt: "hotel(6)" },
  { src: "../../../../src/assets/images/hotel(7).jpg", alt: "hotel(7)" },
];
