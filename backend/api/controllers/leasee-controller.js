import * as leaseeService from '../services/Leasee-service.js';

// common success callback function from controller method
const setSuccessResponse = (leaseeJSON,response)=>{
   response.status(200);
   response.json(leaseeJSON);
}
//common error callback function from controller method
const setErrorResponse = (error, response)=>{
   response.status(500);
   response.json(error);
}

// controller POST method to add new leasee resource
export const post = async (request,response)=>{
   try{
      const payload = request.body;
      const savedLeasee = await leaseeService.save(payload);
      setSuccessResponse(savedLeasee, response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller GET method to fetch all leasee resources based on filters specified in query parameter
export const index = async (request,response)=>{
   console.log("In Here");
   
   let query = {};
   try{
      const name = request.query.name;
      const email = request.query.email;
      const rejectedRoomIds = request.query.rejectedRoomIds;
      console.log("rejectedRoomIds = ", rejectedRoomIds)
      
      if(name){
         query.name = name;
      }
      if(email){
         query.email = email
      }
      if(rejectedRoomIds){
         console.log("populating querry ...");
         query = {rejectedRoomIds : rejectedRoomIds}
         console.log(" querry = ", query);
      }
      console.log("query = ", query)
      const indexedLeasees = await leaseeService.search(query);
      setSuccessResponse(indexedLeasees,response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller GET method to fetch a single leasee resource based on id specified as request parameter
export const get = async (request,response)=>{
   try{
      const id = request.params.id;
      const retrievedLeasee = await leaseeService.get(id);
      setSuccessResponse(retrievedLeasee, response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller UPDATE method to update a single leasee resource based on given 'id' request parameter
export const update = async (request,response)=>{
   try{
      const id = request.params.id;
      const newLeasee = {...request.body};
      newLeasee.id = id;
      const updatedLeasee = await leaseeService.update(newLeasee);
      setSuccessResponse(updatedLeasee,response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller DELETE method to delete a single leasee resource based on given 'id' request parameter
export const remove = async (request,response)=>{
   try{
      const id = request.params.id;
      const deletedLeasee = await leaseeService.remove(id);
      setSuccessResponse({message: `successfully deleted leasee with id ${deletedLeasee.id}`},response);
   }catch(error){
      setErrorResponse(error,response);
   }
}