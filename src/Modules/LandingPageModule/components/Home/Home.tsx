import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import Zimage from "../../../../assets/images/hero.png";

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
      alert("Please select a date range");
    }
  };

  return (
    <Box
      component="div"
      sx={{
        p: 2,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-around"
        height="90vh"
      >
        <Grid xs={10} lg={4}>
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
              <Grid
                xs={8}
                sx={{
                  textAlign: "center",
                  margin: "auto",
                  height: { xs: "33px", md: "auto" },
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", color: "#152C5B" }}>
                  {personCount} person
                </Typography>
              </Grid>
              <Grid
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

        <Grid xs={10} lg={6} sx={{ display: { xs: "none", lg: "block" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Zimage}
              alt="hero"
              style={{
                borderRadius: "20% 5% 5% 0",
                boxShadow: "2px 2px 2px gray, 4px 4px 4px gray",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
