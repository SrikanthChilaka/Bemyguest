/* IMPORTING COMPONENTS AND STYLES */
import './Header.scss';
import Button from '@mui/material/Button';
import Logo from "./Logo";
import MyBookings from '../../pages/MyBookings/MyBookings';

/* IMPORTING APIS */
import {useDispatch, useSelector} from 'react-redux';
import { UserManagementSliceActions } from '../../Store/UserManagement-slice';
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import * as FetchAPI from "../../utils/fetch";
import { isHostComponent } from '@mui/base';
/* Start of Header Component */
const Header = ({children}) => {
   /* Initialize states to render appropriate content based on loggedIn status and type of user */
   const isLoggedIn = useSelector(state => state.userManagement.isLoggedIn);
   const currentUser = useSelector(state => state.userManagement.currentUser);
   const isLeasee = useSelector(state => state.userManagement.isLeasee);
   const inHomePage = useSelector(state => state.userManagement.inHomePage);
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const { loginWithRedirect,logout,isAuthenticated,user} = useAuth0();

  const handleLeaseeLogin = async() => {
    console.log("before dispatch")
    dispatch(UserManagementSliceActions.setIsLoggedIn(isAuthenticated));
    dispatch(UserManagementSliceActions.setIsLeasee(true));
    console.log("after dispatch")
    const userObjectToBePosted = {};
    userObjectToBePosted.name = user.name;
    userObjectToBePosted.email = user.email;

    console.log("userObectToBePosted = ", userObjectToBePosted)
    const isUserExists = await FetchAPI.getData(`http://localhost:9000/leasees?email=${user.email}`);
    if(isUserExists.length === 0){
      const postedUserResponse = await FetchAPI.postData("http://localhost:9000/leasees",userObjectToBePosted);
      dispatch(UserManagementSliceActions.setCurrentUser(postedUserResponse));
    }
    else
      dispatch(UserManagementSliceActions.setCurrentUser(isUserExists[0]));
  }

  const handleLessorLogin = async() => {
    dispatch(UserManagementSliceActions.setIsLoggedIn(isAuthenticated));
    dispatch(UserManagementSliceActions.setIsLeasee(false));
    const userObjectToBePosted = {};
    userObjectToBePosted.name = user.name;
    userObjectToBePosted.email = user.email;
    const isUserExists = await FetchAPI.getData(`http://localhost:9000/lessors?email=${user.email}`);
    if(isUserExists.length === 0){
      const postedUserResponse = await FetchAPI.postData("http://localhost:9000/lessors",userObjectToBePosted);
      dispatch(UserManagementSliceActions.setCurrentUser(postedUserResponse));
    }
    else
      dispatch(UserManagementSliceActions.setCurrentUser(isUserExists[0]));
  }
  
   const handleLogout = () => {
      logout();
      dispatch(UserManagementSliceActions.setIsLoggedIn(isAuthenticated));
      dispatch(UserManagementSliceActions.setCurrentUser(null));
   }

   return (
     <div className="header">
       <div className="header-left">
         <Logo />
         <h2 className="header-title">BeMyGuest</h2>
       </div>
       <div className="header-middle">
         {currentUser && (
           <h1 className="salutation-text">{`Welcome ${currentUser.name}`}</h1>
         )}
         

       </div>
       <div className="header-right">
         <nav className="nav-link-container">
          {children}
           {isLoggedIn &&
             (isLeasee ? (
               inHomePage && <Button onClick = {()=>{
                dispatch(UserManagementSliceActions.setInHomePage(false));
                navigate('/mybookings')
                }}variant="outlined" color="secondary" size="small">
                 My Bookings
               </Button>
             ) : (
               inHomePage && <Button onClick = {()=>{
                dispatch(UserManagementSliceActions.setInHomePage(false));
                navigate('/mypostings')
                }}variant="outlined" color="secondary" size="small">
                 My Postings
               </Button>
             ))}
         </nav>
         <div className="button-container">
           {isAuthenticated ? (
            <>
            {!isLoggedIn && (<><Button onClick = {handleLeaseeLogin} variant="contained" color="secondary" size="small" sx ={{m:1}}>
                 Leasee
              </Button>
              <Button onClick = {handleLessorLogin} variant="contained" color="secondary" size="small" sx ={{m:1}}>
                 Lessor
              </Button></>)}
            
              <Button onClick = {handleLogout} variant="contained" color="error" size="small" sx ={{m:1}}>
                  Logout
              </Button>
            </>
           ) : (
               <Button onClick = {()=>loginWithRedirect()} variant="contained" color="secondary" size="small" sx ={{m:1}}>
                 Login
               </Button>
           )}
         </div>
       </div>
     </div>
   );
}
 
export default Header;