import { useSelector } from "react-redux";
import { RoomManagementActions } from "../../../Store/RoomManagement-slice";
const SortRooms = () => {
   const rooms = useSelector(state => state.roomManagement.rooms); // get rooms state from store
   const filterCriteria = useSelector(state => state.roomManagement.filterCriteria); // get filter criteria selected from store
   const filterOrder = useSelector(state => state.roomManagement.filterOrder); // get filter order selected from store

  let filteredRooms = [...rooms] // shallow copy to be able to sort and not change rooms in state

  if (filterCriteria && filterOrder) { // if both filters selected, proceed to sort
    if (filterCriteria === "Price") { // If criteria is Price
      if (filterOrder === "Low to High") { // If order is low to high
        filteredRooms.sort((room1, room2) => { // sort price in ascending order
          const diff =
            room1.features.properties.Cost - room2.features.properties.Cost;
          return diff === 0 ? 0 : diff > 0 ? 1 : -1; 
        });
      } else { // else sort price in descending order
        filteredRooms.sort((room1, room2) => {
          const diff =
            room2.features.properties.Cost - room1.features.properties.Cost;
          return diff === 0 ? 0 : diff > 0 ? 1 : -1;
        });
      }
    } else { // if criteria is capacity
      if (filterOrder === "Low to High") { // if order is low to high
        filteredRooms.sort((room1, room2) => { // sort rooms in ascending order of capacity
          const diff =
            room1.features.properties.MaxCapacity -
            room2.features.properties.MaxCapacity;
          return diff === 0 ? 0 : diff > 0 ? 1 : -1;
        });
      } else { // sort rooms in descending order of capacity
        filteredRooms.sort((room1, room2) => {
          const diff =
            room2.features.properties.MaxCapacity -
            room1.features.properties.MaxCapacity;
          return diff === 0 ? 0 : diff > 0 ? 1 : -1;
        });
      }
    }
  }else{ // if no filters selected, restore filtered List to orginial rooms list
    filteredRooms = rooms;
  }
   return filteredRooms;
}
 
export default SortRooms;