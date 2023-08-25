import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { RoomManagementActions } from '../../Store/RoomManagement-slice';
const SelectFilter = ({category, value1, value2, action}) => {
   const filterCriteria = useSelector(state => state.roomManagement.filterCriteria);
   const filterOrder = useSelector(state => state.roomManagement.filterOrder);
   const dispatch = useDispatch();

   return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{category}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category === "Order" ? filterOrder : filterCriteria}
          onChange={(e)=>{dispatch(action(e.target.value))}}
          label="category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={value1}>{value1}</MenuItem>
          <MenuItem value={value2}>{value2}</MenuItem>
        </Select>
      </FormControl>
   );
}
 
export default SelectFilter;