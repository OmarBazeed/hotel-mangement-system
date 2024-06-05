import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { HighlightOff, RemoveRedEyeSharp } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../Context/AuthContext/AuthContext";
import { UsersInterface } from "../../../../../Interfaces/interFaces";
import { getBaseUrl } from "../../../../../Utils/Utils";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function UsersList() {
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [viewedUser, setViewedUser] = useState<UsersInterface>({});

  const { requestHeaders } = useAuth();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (value) => {
    setViewedUser(value);
    handleOpen();
  };

  const columns = [
    {
      label: "User Name",
      name: "userName",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      label: "Country",
      name: "country",
      options: {
        customBodyRender: (value: string) => value,
      },
    },
    {
      label: "Profile Image",
      name: "profileImage",
      options: {
        customBodyRender: (value: string) => (
          <img src={value} alt="Profile" width="50" height="50" />
        ),
      },
    },
    {
      name: "datauser",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value: { id: string; name: string }) => (
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
    rowsPerPageOptions: [10, 20, 30, users.length],
    responsive: "vertical",
    download: false,
    print: false,
  };

  const getUsersList = async () => {
    try {
      const { data } = await axios.get(
        `${getBaseUrl()}/api/v0/admin/users?page=1&size=10`,
        {
          headers: requestHeaders,
        }
      );
      console.log(data.data.users);
      const reRenderUsers = data.data.users.map((user: UsersInterface) => ({
        ...user,
        datauser: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          country: user.country,
          profileImage: user.profileImage,
        },
      }));
      setUsers(reRenderUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

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
                Users Table Details
                <Typography variant="body1">
                  You can check all details
                </Typography>
              </Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ sm: "end", xs: "center" }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Button
                onClick={() => console.log("object")}
                sx={{
                  py: 1,
                  px: 3,
                }}
                variant="contained"
                color="info"
              >
                Add New User
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CacheProvider value={muiCache}>
          <Box width="90%" mx="auto" my={8}>
            <MUIDataTable
              title={"Users List"}
              data={users}
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
                User Details
              </Typography>
              <HighlightOff
                sx={{ cursor: "pointer" }}
                onClick={handleClose}
                color="error"
              />
            </Box>
            <Box width="100%" sx={{ padding: "15px" }}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={viewedUser.profileImage}
                  alt="iamge"
                  width="200px"
                  height="200px"
                  style={{ margin: "auto" }}
                />
              </Box>
              <Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography fontWeight="bold"> User Name : </Typography>
                  <Typography>{viewedUser.userName} </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography fontWeight="bold"> Email : </Typography>
                  <Typography>{viewedUser.email} </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography fontWeight="bold"> Country : </Typography>
                  <Typography>{viewedUser.country} </Typography>
                </Box>
                <Box display="flex" justifyContent="start" alignItems="center">
                  <Typography fontWeight="bold"> Phone Number : </Typography>
                  <Typography>{viewedUser.phoneNumber} </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
