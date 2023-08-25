import * as lessorService from '../services/Lessor-service.js';

// common success callback function from controller method
const setSuccessResponse = (lessorJSON,response)=>{
   response.status(200);
   response.json(lessorJSON);
}
//common error callback function from controller method
const setErrorResponse = (error, response)=>{
   console.log("Entered here inside error response");
   response.status(500);
   response.json(error);
}

// controller POST method to add new lessor resource
export const post = async (request,response)=>{
   try{
      const payload = request.body;
      console.log("Payload : ", payload);
      const savedLessor = await lessorService.save(payload);
      console.log("savedLessor : ",savedLessor)
      setSuccessResponse(savedLessor, response);
   }catch(error){
      console.log("Entered here");
      setErrorResponse(error,response);
   }
}

// controller GET method to fetch all lessor resources based on filters specified in query parameter
export const index = async (request,response)=>{
   try{
      const name = request.query.name;
      const email = request.query.email;
      const query = {};
      if(name){
         query.name = name;
      }
      if(email){
         query.email = email
      }
      const indexedLessors = await lessorService.search(query);
      setSuccessResponse(indexedLessors,response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller GET method to fetch a single lessor-resource based on id specified as request parameter
export const get = async (request,response)=>{
   try{
      const id = request.params.id;
      const retrievedLessor = await lessorService.get(id);
      setSuccessResponse(retrievedLessor, response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller UPDATE method to update a single lessor-resource based on given 'id' request parameter
export const update = async (request,response)=>{
   try{
      const id = request.params.id;
      const newLessor = {...request.body};
      newLessor.id = id;
      const updatedLessor = await lessorService.update(newLessor);
      setSuccessResponse(updatedLessor,response);
   }catch(error){
      setErrorResponse(error,response);
   }
}

// controller DELETE method to delete a single lessor-resource based on given 'id' request parameter
export const remove = async (request,response)=>{
   try{
      const id = request.params.id;
      const deletedLessor = await lessorService.remove(id);
      setSuccessResponse({message: `successfully deleted lessor with id ${deletedLessor.id}`},response);
   }catch(error){
      setErrorResponse(error,response);
   }
}