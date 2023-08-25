import {Alert} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APIManagementActions } from '../../Store/APIManagement-slice';
const Notification = ({type,message}) => {
   const notification = useSelector(state => state.apiManagement.notification);
   const dispatch = useDispatch();
   const handleClose = () => dispatch(APIManagementActions.setNotification({open:false}))
   return (<div className = "notification-alert">
      {notification.open && <Alert onClose = {handleClose} severity = {type}>{message}</Alert>}
   </div>);
}
export default Notification;