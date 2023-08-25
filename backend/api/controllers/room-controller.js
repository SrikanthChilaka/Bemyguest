import * as roomService from '../services/Room-service.js';

// common success callback function from controller method
const setSuccessResponse = (roomJSON,response)=>{
   response.status(200);
   response.json(roomJSON);
}
//common error callback function from controller method
const setErrorResponse = (error, response)=>{
   response.status(500);
   response.json(error);
}

// controller POST method to add new room resource
export const post = async (request,response)=>{
   try{
      const payload = request.body;
      const savedRoom = await roomService.save(payload);
      setSuccessResponse(savedRoom, response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller GET method to fetch all room resources based on filters specified in query parameter
export const index = async (request,response)=>{
   try{
      const NAME = request.query.NAME;
      const DESCRIPTION = request.query.DESCRIPTION;
      const Image = request.query.Image;
      const Cost = request.query.Cost;
      const MaxCapacity = request.query.MaxCapacity;
      const applications = request.query.applications;
      const coordinates = request.query.coordinates;
      const ownerId = request.query.ownerId;
      const bookedLeaseeIds = request.query.bookedLeaseeIds;

      let query = {};

      if(NAME){
         query = {"features.properties.NAME" : NAME}
      }
      if(DESCRIPTION){
         query = {"features.properties.DESCRIPTION" : DESCRIPTION}
      }
      if(Image){
         query = {"features.properties.Image" : Image}
      }
      if(Cost){
         query = {"features.properties.Cost" : Cost};
      }
      if(MaxCapacity){
         query = {"features.properties.MaxCapacity" : MaxCapacity};
      }
      if(applications){
         query = {"features.properties.applications" : applications};
      }
      if(coordinates){
         query = {"features.geometry.coordinates" : coordinates};
      }
      if(ownerId){
         query = {"ownerId" : ownerId}
      }
      if(bookedLeaseeIds){
         query = {"bookedLeaseeIds" : bookedLeaseeIds}
      }
      console.log("query = ", query)
      const indexedRooms = await roomService.search(query);
      setSuccessResponse(indexedRooms,response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller GET method to fetch a single room resource based on id specified as request parameter
export const get = async (request,response)=>{
   try{
      const id = request.params.id;
      const retrievedRoom = await roomService.get(id);
      setSuccessResponse(retrievedRoom, response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller UPDATE method to update a single room-resource based on given 'id' request parameter
export const update = async (request,response)=>{
   try{
      const id = request.params.id;
      const newRoom = {...request.body};
      newRoom.id = id;
      const updatedRoom = await roomService.update(newRoom);
      setSuccessResponse(updatedRoom,response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller DELETE method to delete a single room-resource based on given 'id' request parameter
export const remove = async (request,response)=>{
   try{
      const id = request.params.id;
      const deletedRoom = await roomService.remove(id);
      setSuccessResponse({message: `successfully deleted room with id ${deletedRoom.id}`},response);
   }catch(error){
      setErrorResponse(error,response);
   }
}