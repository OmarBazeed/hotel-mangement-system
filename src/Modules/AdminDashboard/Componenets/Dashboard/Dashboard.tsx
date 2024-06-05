import { RoomServiceOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="space-around"
        direction="row"
        sx={{
          minHeight: "40vh",
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="space-around"
          direction="row"
          bgcolor="gray"
          xs={4}
        >
          <Box>
            <Typography>100</Typography>
            <Typography>Rooms</Typography>
          </Box>
          <Box>
            <RoomServiceOutlined />
          </Box>
        </Stack>
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="space-around"
          direction="row"
          bgcolor="gray"
        >
          <Box>
            <Typography>100</Typography>
            <Typography>Rooms</Typography>
          </Box>
          <Box>
            <RoomServiceOutlined />
          </Box>
        </Stack>
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="space-around"
          direction="row"
          bgcolor="gray"
        >
          <Box>
            <Typography>100</Typography>
            <Typography>Rooms</Typography>
          </Box>
          <Box>
            <RoomServiceOutlined />
          </Box>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      ></Stack>
    </>
  );
}
