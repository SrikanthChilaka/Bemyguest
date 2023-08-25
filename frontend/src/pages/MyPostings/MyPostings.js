
import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Button from '@mui/material/Button';
import { UserManagementSliceActions } from "../../Store/UserManagement-slice";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { ChakraProvider} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import * as FetchAPI from '../../utils/fetch';
import { useNavigate } from "react-router-dom";
import PostingCard from "./PostingCard";
import "./MyPostings.scss"
import Notification from "../../components/Notification/Notification";
function MyPostings() {
  
  // Hook to toggle dark mode
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inHomePage = useSelector(state => state.userManagement.inHomePage);
  const [postedRooms, setPostedRooms] = useState(null);
  const currentUser = useSelector(state => state.userManagement.currentUser); 
  const [isFetchPending, setIsFetchPending] = useState(true);
  const notification = useSelector(state => state.apiManagement.notification);

  useEffect(() => {
    const fetchPostedRooms = async () => { // declaring async function to load data from DB
      console.log("Current user = ,", currentUser);

      const dbRoomsPostedByLessor = await FetchAPI.getData(`http://localhost:9000/rooms?ownerId=${currentUser.id}`);
      console.log("dbRoomsPostedByLessor = ", dbRoomsPostedByLessor)
      setPostedRooms(dbRoomsPostedByLessor);
      setIsFetchPending(false);
    }
    // calling the function
    fetchPostedRooms()
      // catch any error
      .catch(console.error);
  },[])

  const handlePost = () => {
    navigate("/postform");
  }
  
  let cardListToBeMapped = [];
  if(!isFetchPending){
    let count = 0;
    postedRooms.forEach((postedRoom) => {
      postedRoom.bookedLeaseeIds.forEach((bookedLeasee) => {
        
        let objectOfInterest = {postedRoom, bookedLeasee};
        cardListToBeMapped.push(objectOfInterest)
      })
    })
  }

return (
  <>
    <Header>
      {!inHomePage && (
        <Button
          onClick={() => {
            dispatch(UserManagementSliceActions.setInHomePage(true));
            navigate("/");
          }}
          variant="outlined"
          color="secondary"
          size="small"
        >
          Home
        </Button>
      )}
    </Header>
    <div className = "postings-post-container">
    <Button
          onClick={handlePost}
          variant="outlined"
          color="primary"
          size="large"
        >
          Make a new Posting
        </Button>
    </div>
    
        { notification && <Notification type = {notification.type} message = {notification.message} /> }

    {!isFetchPending && (
          <>
          

            <div className="postings-grid">
              {
                cardListToBeMapped.map(({postedRoom, bookedLeasee})=> 
                <ChakraProvider>
                  <PostingCard
                    bookedLeasee={bookedLeasee}
                    postedRoom={postedRoom}
                  />
              </ChakraProvider>)
              }
              </div>
              </>
    )}
  </>
);
}
export default MyPostings;