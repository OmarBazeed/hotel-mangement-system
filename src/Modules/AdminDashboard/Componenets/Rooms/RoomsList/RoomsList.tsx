import {
  Box,
  Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RoomInterface } from "../../../../../Interfaces/interFaces";
import { getBaseUrl } from "../../../../../Utils/Utils";

export default function RoomsList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<[RoomInterface] | []>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [roomNumber, setRoomNumber] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  
  //DataGrid consts
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Room Number', width: 70 },
    { field: 'firstName', headerName: 'Image', width: 130 },
    { field: 'lastName', headerName: 'Price', width: 130 },
    { field: 'age', headerName: 'Discount', type: 'number', width: 90},
    {
      field: 'fullName',
      headerName: 'Capacity',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {field: 'category', headerName: 'Category', width: 130 }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const getRooms = async(pageNumber: number, pageSize: number)=> {
    try{
      let response = await axios.get(`${getBaseUrl}/api/v0/admin/rooms?page=1&size=10`,
      {
        headers:{Authorization:`${localStorage.getItem("token")}`},
        params: {
          page: pageNumber,
          size: pageSize
        }
      }
      );
      console.log(response.data);
      setRooms(response.data);
    }
    catch(error){
      console.log(error);
    }
  }


  useEffect(() => {getRooms(1, 10);}, [pageNumber, getRooms]);

  return (

    <div style={{ height: "70%", width: '98%', padding: '0', }}>
      <Box mt={5} mb={4} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Box flexDirection={"column"}> 
          <Typography fontSize={20} fontWeight={"bold"}>Rooms Table Details</Typography>
          <Typography>You can check all details</Typography>
        </Box>
        <Box mr={1}>
          <Button onClick={() => {
                      navigate("/dashboard/room-data");
                    }} style={{fontWeight: "bold", 
                    color: "white", 
                    backgroundColor: 
                    "#203FC7", 
                    padding: "15px"}} variant="contained">
              Add New Room
            
            </Button>
        </Box>
      </Box>
      
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '22ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search by number" variant="outlined" style={{width: "45%"}}
        onChange={(e) => setRoomNumber(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">facilities</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="facilities"
            
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        style={{
          
        }}
      
      />

    </div>
  )
}