import axios from "axios";
import { useEffect, useState } from "react";
import { FacilitiesInterface } from "../../../../../Interfaces/interFaces";
import { Box, Grid, Typography, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { DeleteForever, Draw } from "@mui/icons-material";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function FacilitiesList() {
  const [facilities, setFacilities] = useState<FacilitiesInterface[]>([]);

  const columns = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        customBodyRender: (value: string) => moment(value).format("ll"),
      },
    },
    {
      label: "Updated At",
      name: "updatedAt",
      options: {
        customBodyRender: (value: string) => moment(value).fromNow(),
      },
    },
    {
      label: "Created By",
      name: "createdBy",
      options: {
        customBodyRender: (value: { userName: string }) => value.userName,
      },
    },
    {
      name: "Action",
      options: {
        filter: false,
        customBodyRender: () => {
          return (
            <>
              <DeleteForever
                onClick={() => {
                  alert("deleteeeeeeee");
                }}
                sx={{ mr: 2, cursor: "pointer" }}
              />
              <Draw
                onClick={() => {
                  alert("updateeeeee");
                }}
                sx={{ cursor: "pointer" }}
              />
            </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30, facilities.length],
    responsive: "vertical",
    download: false,
    print: false,
  };

  const getFacilities = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities?page=1&size=1000`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      setFacilities(data.data.facilities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <>
      <Box component={`section`}>
        <Box p={3} component={"header"} boxShadow={1}>
          <Grid container rowSpacing={2}>
            <Grid
              display={"flex"}
              justifyContent={{ sm: "start", xs: "center" }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Typography variant="h5" fontWeight={"500"}>
                Facilities Table Details
                <Typography variant="body1">
                  You can check all details
                </Typography>
              </Typography>
            </Grid>
            <Grid
              display={"flex"}
              justifyContent={{ sm: "end", xs: "center" }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Button
                sx={{
                  py: 1,
                  px: 3,
                }}
                variant="contained"
                color="info"
              >
                Add New Facility
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CacheProvider value={muiCache}>
          <Box width={"90%"} mx={"auto"} my={8}>
            <MUIDataTable
              title={"Facilities List"}
              data={facilities}
              columns={columns}
              options={options}
            />
          </Box>
        </CacheProvider>
      </Box>
    </>
  );
}
