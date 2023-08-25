import {createSlice} from '@reduxjs/toolkit';
import LoadMapScripts from '../utils/LoadMapScripts';

const APIManagementSlice = createSlice({
   name: 'apiManagement',
   initialState: {
      googleMapsAPIKey: 'AIzaSyAQZE1GS00qiOOdx4y8HZOuQNziEYE9acc', // storing maps key here so that cloned project works; if kept in .env, won't be commited
      firstSearchComplete: false,
      mapCenterCoords: null, // used to center map based on address on lat & lng selected from autocomplete searchbar
      mousedOverMarkerRoomData: null, // data of room whose marker is moused over in map
      notification: null,
      selectedRoomForPayment: null, 
   },
   reducers: {

      setMapCenterCoords(state, action){ // function to set google map center; to be used on selection of address from search bar
         state.mapCenterCoords= action.payload;
      },

      setMousedOverMarkerRoomData(state,action){ // function to set Room data hovered on map to conditionally render infoWindow or change marker colors
         state.mapIcon = action.payload;
      },

      setFirstSearchComplete(state,action){
         state.firstSearchComplete = action.payload;
      },

      setNotification(state,action){
         state.notification = {
            message : action.payload.message,
            type : action.payload.type,
            open : action.payload.open 
         }
      },

      setSelectedRoomForPayment(state, action){
         state.selectedRoomForPayment = action.payload;
      }
   }
})

export const APIManagementActions = APIManagementSlice.actions;
export default APIManagementSlice;