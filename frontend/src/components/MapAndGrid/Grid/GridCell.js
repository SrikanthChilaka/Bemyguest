import { useDispatch } from "react-redux";
import { RoomManagementActions } from "../../../Store/RoomManagement-slice";
import "./GridCell.scss";

const GridCell = ({data}) => {
   const dispatch = useDispatch();
   return (
      <button className = "grid-cell-btn"  onClick = {() => dispatch(RoomManagementActions.setSelectedViewRoomId(data.id))}>
         <div className="room-preview">
         <div className="thumbnail-row">
            <a href="#">
               <img src={data.features.properties.Image} alt="img" className="thumbnail" />
            </a>
         </div>
         <div className="room-info-container">
            <div className = "name-and-price-container">
               <p className ="room-name">{data.features.properties.NAME}</p>
               <p className = "price">{`$ ${data.features.properties.Cost}`}</p>
            </div>
            <p className ="room-desc">{data.features.properties.DESCRIPTION} </p>
            
            <div className ="capacity-container">
               <p className = "applications-filled">{`Applications filled : ${data.features.properties.applications}`}</p>
               <p className = "maximum-capacity">{`Max Capacity : ${data.features.properties.MaxCapacity}`}</p>
            </div>
         
            </div>
      </div>
      </button>
     );
}
 
export default GridCell;