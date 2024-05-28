import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box
        component="p"
        sx={{
          p: 2,
          border: "1px dashed grey",
          height: "100vh",
        }}
      >
        Home Section
      </Box>
    </>
  );
}
