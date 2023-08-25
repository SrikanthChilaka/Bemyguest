import Lessor from '../models/Lessor.js';

// service to save, search, get, update and remove Lessors to be exported from here  

export const save = (newLessor) => {
   const lessor = new Lessor(newLessor);
   return lessor.save();
}

export const search = (query) =>{
   const params = {...query};
   return Lessor.find(params)
}

export const get = (id) =>{
   const retrievedLessor = Lessor.findById(id).exec();
   return retrievedLessor;
}

export const update = (lessor) =>{
   lessor.lastModifiedDate = new Date();
   const updatedLessor = Lessor.findByIdAndUpdate(lessor.id, lessor, {new: true}).exec();
   return updatedLessor;
}

export const remove = (id) => {
   const deletedLessor = Lessor.findByIdAndDelete(id).exec();
   return deletedLessor;
}
