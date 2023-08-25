
import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Button from '@mui/material/Button';
import { UserManagementSliceActions } from "../../Store/UserManagement-slice";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import "./MyBookings.scss"
import BookingCard from "./BookingCard";
import { ChakraProvider} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import * as FetchAPI from '../../utils/fetch';
import { useNavigate } from "react-router-dom";

function MyBookings() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inHomePage = useSelector(state => state.userManagement.inHomePage);
  const [bookedRooms, setBookedRooms] = useState(null);
  const currentUser = useSelector(state => state.userManagement.currentUser); 
  const [isFetchPending, setIsFetchPending] = useState(true);
  useEffect(() => {
    const fetchBookedRooms = async () => { // declaring async function to load data from DB
      const dbRoomsBookedByLeasee = await FetchAPI.getData(`http://localhost:9000/rooms?bookedLeaseeIds=${currentUser.id}`);
      setBookedRooms(dbRoomsBookedByLeasee);
      setIsFetchPending(false);
    }
    // calling the function
    fetchBookedRooms()
      // catch any error
      .catch(console.error);
  },[])

return (
  <>
    <Header>{!inHomePage && <Button onClick = {()=>{
                dispatch(UserManagementSliceActions.setInHomePage(true));
                navigate('/');
                }}variant="outlined" color="secondary" size="small">
                 Home
               </Button>}</Header>
    {!isFetchPending && <div className="grid">{bookedRooms.map((bookedRoom) => <ChakraProvider><BookingCard bookedRoom ={bookedRoom}/></ChakraProvider>)}</div>}
  </>
);
}
export default MyBookings;