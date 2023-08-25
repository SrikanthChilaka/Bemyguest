/* IMPORTING Components and styles */
import './Home.scss';
import '../../components/SearchBar/SearchBar.scss';
import SearchCard from '../../components/SearchCard/SearchCard';
import '../../components/SearchCard/SearchCard.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MapAndGrid from '../../components/MapAndGrid/MapAndGrid';
import '../../components/MapAndGrid/MapAndGrid.scss';
import { Map } from '../../components/MapAndGrid/Map/Map';
import Grid from '../../components/MapAndGrid/Grid/Grid';
import FilterBar from '../../components/FilterBar/FilterBar';
import RoomViewModal from '../../components/RoomViewModal/RoomViewModal';
import {
   Combobox,
   ComboboxInput,
   ComboboxPopover,
   ComboboxList,
   ComboboxOption,
 } from "@reach/combobox";
 import "@reach/combobox/styles.css";
 
 /* IMPORTING APIS  */ 
import LoadMapScripts from '../../utils/LoadMapScripts';
import usePlacesAutoComplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { APIManagementActions } from '../../Store/APIManagement-slice';
// Declaring libraries globally to prevent re-render of mapScripts on every render of App
const libraries = ['places'];

/* Start of Home Component */
 const Home = () => {

   // Initializing states
   const isMapScriptLoaded = LoadMapScripts(libraries);
   const firstSearchComplete = useSelector(state => state.apiManagement.firstSearchComplete);
   const selectedViewRoomId = useSelector(state => state.roomManagement.selectedViewRoomId);
   return (
     <div className = "home-container">
       <Header />
       {!firstSearchComplete && isMapScriptLoaded && (
         <SearchCard>
           <SearchBar />
         </SearchCard>
       )}
       {firstSearchComplete && <FilterBar />}

       {firstSearchComplete && (
         <MapAndGrid>
           <Map />
           <Grid />
         </MapAndGrid>
       )}
       <Footer />

       {selectedViewRoomId && (
         <RoomViewModal selectedViewRoomId={selectedViewRoomId} />
       )}

     </div>
   );
}

// must define component here since library 'places' must be loaded before loading component.
// import of component from separate file will fail to load the library 'places' before rendering component. 
export const SearchBar = () => {
   const dispatch = useDispatch();
   const {
      ready,
      value,
      setValue,
      suggestions:{status, data},
      clearSuggestions,
   } = usePlacesAutoComplete();

   const handleChange = async(address) => {
        console.log("")
        console.log("Address on select of search bar = ", address);
         setValue(address, false);
         clearSuggestions();
         const results = await getGeocode({address});
         console.log("results = ",results);
         const {lat,lng} = await getLatLng(results[0]);
         console.log("lat =", lng, "lng = ", lng);
         dispatch(APIManagementActions.setMapCenterCoords({lat,lng}));
         dispatch(APIManagementActions.setFirstSearchComplete(true));
   }

  return (
      <Combobox onSelect = {handleChange}>
         <ComboboxInput
           value = {value}
           onChange = {(e) => setValue(e.target.value)}
           disabled = {!ready}
           className = "combobox-input"
           placeholder='Enter an address, neighborhood, city or ZIP code'
        />
        <ComboboxPopover>
           <ComboboxList>
              {status ==="OK" && data.map(({place_id, description}) => <ComboboxOption key = {place_id} value ={description}/>)}
           </ComboboxList>
        </ComboboxPopover>
     </Combobox>
  );
}

export default Home ;