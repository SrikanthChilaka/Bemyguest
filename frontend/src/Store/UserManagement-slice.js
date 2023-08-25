import {createSlice} from '@reduxjs/toolkit';

const UserManagementSlice = createSlice({
   name: 'userManagement',
   initialState: {
      isLoggedIn: false, // flag used to render logout button, myBookings, myPostings conditionally
      isLeasee: false, // flag used to allow(for leasee only) book button action(for leasee only), render myBookings and not myPostings (leasee only) 
      currentUser: null, // used to get current user object to use details when booking, contacting etc
      notification: null,
      rejectedLeaseeIds: [],
      inHomePage: true
   },
   reducers: {
      setIsLoggedIn(state,action){
         state.isLoggedIn = action.payload; // function to set logged in state
      },

      setIsLeasee(state, action){ // function to set isLeasee state
         state.isLeasee = action.payload;
      },

      setCurrentUser(state,action){ // function to set current User
         state.currentUser = action.payload;
      },
      setInHomePage(state,action){
         state.inHomePage = action.payload;
      },
      setRejectedLeaseeIds(state,action){
         state.rejectedLeaseeIds = action.payload;
      }
   }
})

export const UserManagementSliceActions = UserManagementSlice.actions;
export default UserManagementSlice;