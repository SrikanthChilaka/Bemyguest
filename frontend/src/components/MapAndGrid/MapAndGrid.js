import * as React from 'react';
import "./MapAndGrid.scss";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RoomManagementActions } from '../../Store/RoomManagement-slice';
import * as fetchAPI from '../../utils/fetch';
import SortRooms from './utils/SortRooms';
const MapAndGrid = ({children}) => {
   // Get states required to fetch and update rooms for Map and Grid
   const isFetchPending = useSelector(state => state.roomManagement.isFetchPending); // get fetch Pending status
   const dispatch = useDispatch();
  //--------Load rooms from DB with fetch call and update global rooms state --------//
  useEffect(() => {
    const fetchDBRooms = async () => { // declaring async function to load data from DB
      const dbRooms = await fetchAPI.getData('http://localhost:9000/rooms/');
      dispatch(RoomManagementActions.setRooms(dbRooms)); // set rooms to the array of rooms fetched from db in Rooms' central data store
      dispatch(RoomManagementActions.setFilteredRooms(dbRooms));
      dispatch(RoomManagementActions.setIsFetchPending(false)); // set fetch pending status to false in Rooms' central data store
    }
    // calling the function
    fetchDBRooms()
      // catch any error
      .catch(console.error);
  }, [])

  let filteredRooms = SortRooms();
  dispatch(RoomManagementActions.setFilteredRooms(filteredRooms));

  let childrenArray = React.Children.toArray(children); // get Map and Grid children
   return (
     !isFetchPending && (
       <div className="map-and-grid-container">
         <div className="map">{childrenArray[0]}</div>
         <div className="grid">{childrenArray[1]}</div>
       </div>
     )
   );
}
 
export default MapAndGrid;