import React from 'react';
import { useForm } from 'react-hook-form';
import "./PostForm.scss";
import "./index.scss";
import { useState } from 'react';
import { useFileUpload } from "use-file-upload";
import * as FetchAPI from "../../utils/fetch";
import  {getGeocode, getLatLng} from 'use-places-autocomplete';
import LoadMapScripts from '../../utils/LoadMapScripts';
import { useDispatch, useSelector } from 'react-redux';
import { UserManagementSliceActions } from '../../Store/UserManagement-slice';
import { useNavigate } from 'react-router-dom';
const libraries = ['places'];

export function PostForm() {

  const navigate = useNavigate();
  const inHomePage = useSelector(state => state.userManagement.inHomePage);
  const dispatch = useDispatch();
  const isMapScriptLoaded = LoadMapScripts(libraries);
  const currentUser = useSelector(state => state.userManagement.currentUser);
  console.log("currentUser =", currentUser);
  // const handleSubmit = (trailerURL) =>{
  //   let properties = {NAME : data} "properties": {
  //     "NAME": "9 Greenville St, Roxbury, MA 02119",
  //     "DESCRIPTION": "Sits in the Nubian Square neighborhood which will become a nexus of science, academic and medical research. It is set to bring big changes to the arts, culture",
  //     "Image": "https://i.postimg.cc/8cHzdP9V/property-1.jpg",
  //     "Cost": "500",
  //     "MaxCapacity": 3,
  //     "applications": 10,
  //     "trailerURL": "https://www.youtube.com/watch?v=q_FuyWPdL3s&t=53s"
  // },
    // FetchAPI.postData(`http://localhost:9000/rooms/`, newItemToPost);
  

  
  const { register, handleSubmit, formState: { errors },getValues } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  const [data,setData]=useState("") ;
  const [files, selectFiles] = useFileUpload();
  const [Image, setImage] = useState("");
  
  const defaultSrc =
    "";
  
    const handlePost = async(data) => {

      let {Address, Price, Description, Vacancy, trailerURL} = data;
//       fetch(`https://maps.googleapis.com/maps/api/geocode/json?address={}}&key=[AIzaSyAQZE1GS00qiOOdx4y8HZOuQNziEYE9acc]`)
// .then((response) => {
//     return response.json();
// }).then(jsonData => {
//     console.log(jsonData.results[0].geometry.location); // {lat: 45.425152, lng: -75.6998028}
// })
// .catch(error => {
//     console.log(error);
// })
      const results = await getGeocode({address : Address});
      console.log("results = ",results);
      const {lat,lng} = await getLatLng(results[0]);
      let coordinates = [lat,lng];

      let properties = {};
      properties.NAME = Address;
      properties.DESCRIPTION = Description;
      properties.MaxCapacity = Vacancy;
      properties.Cost = Price;
      properties.trailerURL = trailerURL
      properties.Image = Image;
      properties.applications = 0;
      properties.coordinates = [lat,lng];
      let objectToBePosted = {};
      objectToBePosted.features = {properties: properties};

      objectToBePosted.ownerId = currentUser.id;

      console.log("objectToBePosted = ", objectToBePosted);
      const postedItemResponse = await FetchAPI.postData(`http://localhost:9000/rooms/`, objectToBePosted); // post data
      // const postedItemResponseUpdate = await FetchAPI.updateData(`http://localhost:9000/rooms/${postedItemResponse.id}`, {coordinates : [lat,lng]});
      console.log("postedItemResponse = ", postedItemResponse);
    }
    
  return (isMapScriptLoaded && <div className='formLayout'>
     <div id="app">
      <button className = "postFormBtn"
        onClick={() =>
          selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
            setImage(`https://i.imgur.com/${name}`);
          })
        }
      >
        Upload Property Image
      </button>
    </div>
  <div className='div-form'>
    <form onSubmit={handleSubmit((data) => handlePost(data))}>
      <input type="undefined" placeholder="Address" {...register("Address", {required: true, min: 10})} />
      <input type="text" placeholder="Description" {...register("Description", {required: true, min: 10})} />
      <input type="undefined" placeholder="Price" {...register("Price", {required: true})} />
      <input type="undefined" placeholder="Vacancy" {...register("Vacancy", {required: true})} />
      <input type="undefined" placeholder="Youtube Trailer Link" {...register("trailerURL", {required: true})} />
      <input type="submit"/>
      </form>
      <button className = "postFormBtn" onClick = {() => navigate("/mypostings")}>Go Back</button>

    </div>

    
    </div>
    

    
  );
  }
 