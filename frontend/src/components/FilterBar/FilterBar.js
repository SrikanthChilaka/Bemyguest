import "./FilterBar.scss";
import {SearchBar} from "../../pages/Home/Home";
import SelectFilter from "./SelectFilter";
import { RoomManagementActions } from '../../Store/RoomManagement-slice';

const FilterBar = () => {
   
   return (
      <div className = "filter-bar">
         <SearchBar />
         <div className = "filter-selects">
            <SelectFilter category = {"Criteria"} value1 = {"Price"} value2 = {"Capacity"} action = {RoomManagementActions.setFilterCriteria} />
            <SelectFilter category = {"Order"} value1 = {"High to Low"} value2 = {"Low to High"} action = {RoomManagementActions.setFilterOrder} />
         </div>
      </div>
   );
}
 
export default FilterBar;