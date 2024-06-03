import { Box, Container, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
export default function Home() {
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
        <Container
          sx={{
            bgcolor: "teal",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
          }}
        >
          <Stack direction="column" useFlexGap spacing={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "background: rgba(21, 44, 91, 1)",
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
            <Box>
              <Typography>Start Booking</Typography>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <CalendarMonthTwoToneIcon
                  sx={{ position: "absolute", top: "15px", left: "10px" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["SingleInputDateRangeField"]}>
                    <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                      name="allowedRange"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
          </Stack>
          <Stack>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "background: rgba(21, 44, 91, 1)",
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
          </Stack>
        </Container>
      </Box>
    </>
  );
}
