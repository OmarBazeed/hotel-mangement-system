import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { getBaseUrl } from '../../../../Utils/Utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../Context/AuthContext/AuthContext';
import { RoomsInterface } from '../../../../Interfaces/interFaces';
import { toast } from 'react-toastify';


export default function Explore() {
    const [rooms, setRooms] = useState<RoomsInterface[]>([]);

    const { requestHeaders } = useAuth();

    const getRooms = async () => {
        try {
          const { data } = await axios.get(
            `${getBaseUrl()}/api/v0/portal/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30`,
            {
              headers: requestHeaders,
            }
          );
    
          const reRenderRooms = data.data.rooms.map((room: RoomsInterface) => ({
            ...room,
            dataroom: {
              _id: room._id,
              roomNumber: room.roomNumber,
              price: room.price,
              capacity: room.capacity,
              discount: room.discount,
              facilities: room.facilities,
              createdAt: room.createdAt,
              updatedAt: room.updatedAt,
              createdBy: room.createdBy.userName,
              images: room?.images,
            },
          }));
          setRooms(reRenderRooms);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.message || "fail adding");
          }
        }
      };

    useEffect(() => {
        getRooms();
    }, []);

    return (
    <>
        <Typography>Hello</Typography>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                MUI
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>    
    </>
    );
  }  