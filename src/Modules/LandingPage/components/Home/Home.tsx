import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Zimage from "../../../../assets/images/hero.png";

export default function Home() {
  const [personCount, setPersonCount] = useState<number>(1);
  const incraese = () => {
    setPersonCount((prev) => prev + 1);
  };
  const decraese = () => {
    personCount <= 1 ? 1 : setPersonCount((prev) => prev - 1);
  };
  return (
    <>
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
                  color: "rgba(21, 44, 91, 1)",
                  fontSize: "2rem",
                }}
              >
                Forget Busy Work,
                <br />
                Start Next Vacation
              </Typography>
              <Typography>
                We provide what you need to enjoy your holiday with family. Time
                to make another memorable moments.
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                Start Booking
              </Typography>
              <Typography sx={{ marginBottom: "-15px !important" }}>
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
                    }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["SingleInputDateRangeField"]}>
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
                              xs: "10px",
                              sm: "15px",
                            },
                          },
                        }}
                        className="dateInput"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Stack>
              </Box>
              <Typography sx={{ marginBottom: "-15px !important" }}>
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
                    sx={{ width: "100%", height: "100%" }}
                    variant="contained"
                    color="error"
                    onClick={() => decraese()}
                    disabled={personCount == 1}
                  >
                    -
                  </Button>
                </Grid>
                <Grid xs={8} sx={{ textAlign: "center", margin: "auto" }}>
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
                    sx={{ width: "100%", height: "100%" }}
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
                sx={{
                  width: "50%",
                  color: "white",
                  bgcolor: "#3252DF",
                }}
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
    </>
  );
}
