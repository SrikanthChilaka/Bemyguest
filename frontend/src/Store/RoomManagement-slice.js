import {createSlice} from '@reduxjs/toolkit';

const RoomManagementSlice = createSlice({
   name: 'roomManagement',
   initialState: {
      rooms: [], // initial state of rooms before fetch from DB 
      filteredRooms: [], // initial state of rooms used to display on grid and map
      isFetchPending: true, // flag to signal completion of initial rooms data render
      selectedViewRoomId: null, // room booking modal should pop up with details of selected Room on click from grid
      filterCriteria: '', // price filter state
      filterOrder: '', // capacity filter state
   },
   reducers: {

      setRooms(state, action){ // function to set rooms in list
         state.rooms = action.payload;
      },

      setFilteredRooms(state, action){ // function to set filtered rooms in list to display in map and grid
         state.filteredRooms = action.payload;
      },

      setSelectedViewRoomId(state,action){
         state.selectedViewRoomId = action.payload; // function to set id on click of room from grid
      },

      setIsFetchPending(state,action){ // function to set fetch status
         state.isFetchPending = action.payload;
      },

      setFilterOrder(state,action){ // function to filter order: high to low, or low to high
         state.filterOrder = action.payload;
      },

      setFilterCriteria(state,action){ // function to set criteria of filter of rooms : price or capacity
         state.filterCriteria = action.payload;
      },
   }
})

export const RoomManagementActions = RoomManagementSlice.actions;
export default RoomManagementSlice;