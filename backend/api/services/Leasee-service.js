import Leasee from '../models/Leasee.js';

// service to save, search, get, update and remove Leasees to be exported from here  

export const save = (newLeasee) => {
   const leasee = new Leasee(newLeasee);
   return leasee.save();
}

export const search = (query) =>{
   const params = {...query};
   return Leasee.find(params).populate({path: "rejectedRoomIds", model: "Room"});
}

export const get = (id) =>{

   const retrievedLeasee = Leasee.findById(id).populate({path: "rejectedRoomIds", model: "Room"}).exec();
   return retrievedLeasee;
}

export const update = (leasee) =>{
   leasee.lastModifiedDate = new Date();
   const updatedLeasee = Leasee.findByIdAndUpdate(leasee.id, leasee, {new: true}).exec();
   return updatedLeasee;
}

export const remove = (id) => {
   const deletedLeasee = Leasee.findByIdAndDelete(id).exec();
   return deletedLeasee;
}
