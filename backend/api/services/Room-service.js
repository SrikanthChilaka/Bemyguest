import Room from '../models/Room.js';

// service to save, search, get, update and remove rooms to be exported from here  

export const save = (newRoom) => {
   const room = new Room(newRoom);
   return room.save();
}

export const search = (query) =>{
   const params = {...query};
   const populateQuery = [{path: "ownerId", model: "Lessor"},{path: "bookedLeaseeIds", model: "Leasee"},{path: "approvedLeaseeIds", model: "Leasee"}]
   return Room.find(params).populate(populateQuery);
}

export const get = (id) =>{
   const populateQuery = [{path: "ownerId", model: "Lessor"},{path: "bookedLeaseeIds", model: "Leasee"},{path: "approvedLeaseeIds", model: "Leasee"}]
   const retrievedRoom = Room.findById(id).populate(populateQuery).exec();
   return retrievedRoom;
}

export const update = (room) =>{
   room.lastModifiedDate = new Date();
   const updatedRoom = Room.findByIdAndUpdate(room.id, room, {new: true}).exec();
   return updatedRoom;
}

export const remove = (id) => {
   const deletedRoom = Room.findByIdAndDelete(id).exec();
   return deletedRoom;
}
