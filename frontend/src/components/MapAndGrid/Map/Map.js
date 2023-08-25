import {GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState} from 'react';
import InfoWindowContent from './InfoWindowContent';
import { useSelector,useDispatch} from 'react-redux';
import { RoomManagementActions } from '../../../Store/RoomManagement-slice';

export const Map = () => {

  const dispatch = useDispatch();
  const filteredRooms = useSelector(state => state.roomManagement.filteredRooms); // get the filtered rooms to be displayed on map
  const mapCenter = useSelector(state => state.apiManagement.mapCenterCoords);

  // states local to map, no need to store in CDS; useState is sufficient
  const [icon, setIcon] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  
  // function to change icon for hovered room on map
  const iconChange = (data) => {
    if (icon && data.id === icon.id) {
      return "https://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0"
    } else {
      return "https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0"
    }
  }

  const Data = filteredRooms; // referring to array of filtered rooms as Data

   return (
     <GoogleMap zoom={10} center={mapCenter} mapContainerClassName="map">
       {Data.map((data) => (
         <Marker
           key={data.id}
           icon={{
             url: iconChange(data),
             scaledSize: new window.google.maps.Size(15, 15),
           }}
           onMouseOver={(e) => {
             setIcon(data);
             setInfoWindow(data);
           }}
           onMouseOut={() => {
             setIcon(null);
             setInfoWindow(null);
           }}
           onClick = {() => dispatch(RoomManagementActions.setSelectedViewRoomId(data.id))} // on click of map icon, setSelectedViewRoomId
           position={{
             lat: data.features.properties.coordinates[0],
             lng: data.features.properties.coordinates[1],
           }}
         />
       ))}

       {icon ? (
         <InfoWindow
           key={icon.id}
           position={{
             lat: icon.features.properties.coordinates[0] + 0.05,
             lng: icon.features.properties.coordinates[1] + 0.05,
           }}
           onCloseClick={() => setIcon(null)}
         >
           <InfoWindowContent
             name={infoWindow.features.properties.NAME}
             img={infoWindow.features.properties.Image}
             price={infoWindow.features.properties.Cost}
             maxCapacity={infoWindow.features.properties.MaxCapacity}
             applications={infoWindow.features.properties.applications}
           />
         </InfoWindow>
       ) : null}
     </GoogleMap>
   );
}
