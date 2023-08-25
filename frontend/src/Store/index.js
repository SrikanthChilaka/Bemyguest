import {configureStore} from '@reduxjs/toolkit'
import RoomManagementSlice from './RoomManagement-slice';
import APIManagementSlice from './APIManagement-slice';
import UserManagementSlice from './UserManagement-slice';

// configure the reducer functions of RoomManagementSlice,APIManagementSlice,UserManagementSlice in store
const store = configureStore({
   reducer: {
      roomManagement: RoomManagementSlice.reducer,
      apiManagement: APIManagementSlice.reducer,
      userManagement: UserManagementSlice.reducer
   }
});

// export store for setting context to 'App' component
export default store;