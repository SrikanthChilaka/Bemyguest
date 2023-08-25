import { useSelector,useDispatch } from "react-redux";
import './RoomViewModal.scss';
import Logo from "../Header/Logo";
import ActionButton from "../../controls/ActionButton";
import Button from '@mui/material/Button';
import CloseIcon from '@material-ui/icons/Close';
import { RoomManagementActions } from "../../Store/RoomManagement-slice";
import { APIManagementActions } from "../../Store/APIManagement-slice";
import Youtube from "react-youtube";
import * as FetchAPI from '../../utils/fetch';
import Notification from "../Notification/Notification";
import { EmailForm } from "../../pages/PostForm/PostForm";
import { useNavigate } from "react-router-dom";

const RoomViewModal = ({selectedViewRoomId}) => {
   const allRooms = useSelector(state => state.roomManagement.rooms);
   /* Logic to be implemented once authentication is integrated */
   const notification = useSelector(state => state.apiManagement.notification);
   const currentUser = useSelector(state => state.userManagement.currentUser);
   const isLoggedIn = useSelector(state => state.userManagement.isLoggedIn);
   const isLeasee = useSelector(state => state.userManagement.isLeasee);
   const isAuthorizedBookRequest = isLoggedIn && isLeasee; // in case not logged in, or you are lessor; should throw notif error on clicking book
   const navigate = useNavigate();

   let selectedRoom = allRooms.find((room) => room.id === selectedViewRoomId);
   console.log("selected room = ", selectedRoom);
   console.log("selectedRoom.bookedLeaseeIds[0] = ,", selectedRoom.bookedLeaseeIds[0]);
   const isAlreadyBooked =  currentUser == null ? false : ((selectedRoom.bookedLeaseeIds.find((user) => user.id === currentUser.id) === undefined) ? false: true);
   console.log("isAlreadyBooked = ", isAlreadyBooked);
   const dispatch = useDispatch();
   console.log("reached here");
   function _onReady(event) { event.target.pauseVideo();}
   const moviePlayOptions = {
      height: '250',
      width: '100%',
      top : "50",
      playerVars: {
          autoplay: 1
      }
      }

      

      const handleMakeBooking = () => {
         console.log("Inside handle make booking");
         if(!isAuthorizedBookRequest){
            if(currentUser){
               console.log("reached here inside current User exists and book req made")
               dispatch(
                  APIManagementActions.setNotification({
                    message: "You are not authorized to perform this action.",
                    type: "error",
                    open: true,
                  })
                );
            }else{
               console.log("Reached here where current user does not exist and book req made")
               dispatch(
                  APIManagementActions.setNotification({
                    message: "You must login to perform this action.",
                    type: "error",
                    open: true,
                  })
                );
            }
            
         }else{
            console.log("selectedRoom.bookedLeaseeIds =", selectedRoom.bookedLeaseeIds)
            console.log("current user ,", currentUser);
            let newBookedLeaseesIds = selectedRoom.bookedLeaseeIds.map((leasee) => leasee.id);
            console.log("newBookedLeaseesIds = ", newBookedLeaseesIds);
            newBookedLeaseesIds.push(currentUser.id);
            // selectedRoom.bookedLeaseeIds.push(currentUser);
            FetchAPI.updateData(
              `http://localhost:9000/rooms/${selectedViewRoomId}`,
              {bookedLeaseeIds: newBookedLeaseesIds,
               "features.properties.applications" : selectedRoom.features.properties.applications + 1}
            )
              .then((jsonResponse) => {
               console.log("jsonResponse of new updated room = ", jsonResponse)
               FetchAPI.getData("http://localhost:9000/rooms")
                 .then((allRoomsJSON) =>{
                   dispatch(RoomManagementActions.setRooms(allRoomsJSON));
                   dispatch(RoomManagementActions.setSelectedViewRoomId(null))
                 }
                 )
                 .catch((e) => console.log(e.message));
              }
              );
         }
      }

      const handleCancelBooking = async() => {
         let newBookedLeaseesIds = selectedRoom.bookedLeaseeIds.map((leasee) => leasee.id);
         console.log("current user id = , ", currentUser.id)
         console.log("newBookedLeaseesIds before filter =",newBookedLeaseesIds)
         newBookedLeaseesIds = newBookedLeaseesIds.filter((leaseeId) => leaseeId !== currentUser.id);
         console.log("newBookedLeaseesIds after filter =",newBookedLeaseesIds)
         let jsonResponse = await FetchAPI.updateData(`http://localhost:9000/rooms/${selectedViewRoomId}`, {bookedLeaseeIds: newBookedLeaseesIds, "features.properties.applications": selectedRoom.features.properties.applications - 1});
         console.log("jsonResponse of new updated room = ", jsonResponse)
         const roomsFetchedFromDB = await FetchAPI.getData(`http://localhost:9000/rooms`);
         dispatch(RoomManagementActions.setRooms(roomsFetchedFromDB));
         dispatch(RoomManagementActions.setSelectedViewRoomId(null));
      }
      
   return (
     <div className="room-view-modal-overlay">
       <div className="room-view-modal">
         {notification && <Notification type = {notification.type} message = {notification.message} />}
         <div className="room-view-modal-header">
            <div className="modal-header-left">
               <Logo />
            </div>
            <div className="modal-header-middle">
            Room Details
            </div>
         
           <ActionButton
             color="close"
             position = "headerTopRight"
             size = "small"
             onClick={() =>
               dispatch(RoomManagementActions.setSelectedViewRoomId(null))
             }
           >
             <CloseIcon />
           </ActionButton>
         </div>
         <div className="trailer-container">
            <Youtube
               videoId={selectedRoom.features.properties.trailerURL.split("?v=")[1]}
               opts={moviePlayOptions}
               onReady={_onReady}
               />
         </div>
         <div className="stats-container">
            <h2>{`$ ${selectedRoom.features.properties.Cost}`}</h2>
            <h2>{`Applications : ${selectedRoom.features.properties.applications}`}</h2>
            <h2>{`Capacity : ${selectedRoom.features.properties.MaxCapacity}`}</h2>
         </div>
         <div className="address-container">
            <h2>{selectedRoom.features.properties.NAME}</h2>
         </div>
         <div className = "room-desc-container">
            <img src={selectedRoom.features.properties.Image} className = "room-img" />
             <p className = "modal-view-room-desc">{selectedRoom.features.properties.DESCRIPTION}</p>
         </div>
         <div className = "room-view-modal-owner-container">
            <h2 className = "modal-owner-name">{`Lessor name : ${selectedRoom.ownerId.name}`}</h2>
         </div>
        <div className="room-view-button-container">
             {isAlreadyBooked ? (<Button onClick = {handleCancelBooking} variant="contained" color="secondary" size="small" sx ={{m:5}}>
               Cancel Booking
             </Button>)
              : (<Button onClick = {handleMakeBooking} variant="contained" color="primary" size="small" sx ={{m:5}}>
              Make Booking
            </Button>)}

            <Button onClick = {()=>navigate('/contact')}variant="contained" color="primary" size="small" sx ={{m:5}}>
               Contact Owner
            </Button>
        </div>
       </div>
     </div>
   );
}
 
export default RoomViewModal;