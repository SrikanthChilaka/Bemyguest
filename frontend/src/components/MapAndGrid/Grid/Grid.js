import { useSelector } from 'react-redux';
import GridCell from './GridCell';

// const Data = [
//    {
//      "properties": {
//        "ID": 1,
//        "NAME": "9 Greenville St, Roxbury, MA 02119",
//        "DESCRIPTION": "Sits in the Nubian Square neighborhood which will become a nexus of science, academic and medical research. It is set to bring big changes to the arts, culture ",
//        "Image": "https://i.postimg.cc/8cHzdP9V/property-1.jpg",
//        "Cost": 500,
//        "MaxCapacity": 3,
//        "applications": 10
//      },
//      "geometry": {
//        "coordinates": [
//         42.3277799,
//         -71.0810733
//        ]
//      }
//    },
//    {
//      "properties": {
//        "ID": 2,
//        "NAME": "221 Auburn St #2, Newton, MA 02466",
//        "DESCRIPTION": "Extensive exterior painting project near completion! Perched above Auburn Street, this bright 1,571 sq ft duplex condominium is move-in ready!",
//        "Image": "https://i.postimg.cc/25QRL9gs/property-2.jpg",
//        "Cost": 450,
//        "MaxCapacity": 2,
//        "applications": 15
//      },
//      "geometry": {
//        "coordinates": [
//         42.345863,
//         -71.24426489999999
//        ]
//      }
//    },
//    {
//      "properties": {
//        "ID": 3,
//        "NAME": "69 Edinboro Rd, Quincy, MA 02169",
//        "DESCRIPTION": "his charming 1960s sunny and bright ranch is conveniently located near Quincy center as well as routes 128 & 93.  ",
//        "Image": "https://i.postimg.cc/15ndNYqv/property-3.jpg",
//        "Cost": 300,
//        "MaxCapacity": 1,
//        "applications": 12
//      },
//      "geometry": {
//        "coordinates": [
//         42.2466911,
//         -70.9858163
//        ]
//      }
//    },
//    {
//     "properties": {
//       "ID": 4,
//       "NAME": "5 Newcomb Ave, Lynn, MA 01905",
//       "DESCRIPTION": "Move-in conditions 3 bedrooms house, very well maintained near Saugus line, close to Rt 1.",
//       "Image": "https://i.postimg.cc/kGXBpbx5/property-4.jpg",
//       "Cost": 250,
//       "MaxCapacity": 3,
//       "applications": 20
//     },
//     "geometry": {
//       "coordinates": [
//         42.4736347,
//         -70.9940818
//       ]
//     }
//   },
//   {
//     "properties": {
//       "ID": 5,
//       "NAME": "88 Cabot Ave, Braintree, MA 02184",
//       "DESCRIPTION": "Offer deadline Tuesday Dec 6th by 11am please submit your highest & best offer. Come see this charming Craftsman styled home that is filled with character.",
//       "Image": "https://i.postimg.cc/prGpbLZJ/property-5.jpg",
//       "Cost": 330,
//       "MaxCapacity": 2,
//       "applications": 25
//     },
//     "geometry": {
//       "coordinates": [
//         42.2159716,
//         -70.9947
//       ]
//     }
//   },
//   {
//     "properties": {
//       "ID": 6,
//       "NAME": "12 Inman St APT 34, Cambridge, MA 02139",
//       "DESCRIPTION": "One-bedroom unit in the heart of Central Square, this condo is a short distance from MIT, Harvard and the MBTA.",
//       "Image": "https://i.postimg.cc/Kzmz1Mp5/property-6.jpg",
//       "Cost": 400,
//       "MaxCapacity": 1,
//       "applications": 10
//     },
//     "geometry": {
//       "coordinates": [
//         42.367,
//         -71.10
//       ]
//     }
//   },
//   {
//     "properties": {
//       "ID": 7,
//       "NAME": "22 Connecticut Ave #3, Somerville, MA 02145",
//       "DESCRIPTION": "Sunlit, top-floor, 3 bed, 1.5 bath condominium gut renovated in 2018 with exclusive roof rights!!",
//       "Image": "https://i.postimg.cc/1tMzw3L1/property-7.jpg",
//       "Cost": 350,
//       "MaxCapacity": 3,
//       "applications": 5
//     },
//     "geometry": {
//       "coordinates": [
//         42.39,
//         -71.08
//       ]
//     }
//   },
//   {
//     "properties": {
//       "ID": 8,
//       "NAME": "36 Pleasant St, Milton, MA 02186",
//       "DESCRIPTION": "The home features a newly renovated eat-in kitchen with custom cabinetry, stainless steel appliances",
//       "Image": "https://i.postimg.cc/y6QdNWmF/property-8.jpg",
//       "Cost": 410,
//       "MaxCapacity": 3,
//       "applications": 19
//     },
//     "geometry": {
//       "coordinates": [
//         42.246,
//         -71.06
//       ]
//     }
//   },
//   {
//     "properties": {
//       "ID": 9,
//       "NAME": "1056 Beacon St APT 5, Brookline, MA 02446",
//       "DESCRIPTION": "This is a beautiful front-facing two-bedroom 2nd floor unit on Beacon Street near Longwood Medical Center",
//       "Image": "https://i.postimg.cc/fbfWQbWS/property-9.jpg",
//       "Cost": 450,
//       "MaxCapacity": 4,
//       "applications": 24
//     },
//     "geometry": {
//       "coordinates": [
//         42.345,
//         -71.109
//       ]
//     }
//   },

//  ]
const Grid = () => {
   const filteredRooms = useSelector(state => state.roomManagement.filteredRooms);
   console.log("filteredRooms = ", filteredRooms)
   let Data = filteredRooms; // Referring to filteredRooms as Data
   return (
      <>
        {Data.map((data) => (
          <GridCell key = {data.id} data = {data}/>
        ))}
      </>
   );
}
export default Grid; 