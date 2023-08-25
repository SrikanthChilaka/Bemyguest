import mongoose from 'mongoose';

// Schema for Room
const roomSchema = new mongoose.Schema({
   // will be used to find out owner on Lease click of Book, and should send out email to owner
   // used to query all posted rooms for particular lessor.
   ownerId:{
      type: mongoose.Types.ObjectId,
      ref: "Lessor"
   },
   // this will be used on click of Lessor Accept/Reject.Also update room's "applications" field after this event
   // used to query all booked rooms for particular leasee
   bookedLeaseeIds:{
      type:[mongoose.Types.ObjectId],
      ref: "Leasee"
   },

   // used to query all approved rooms for particular leasee
   approvedLeaseeIds:{
      type:[mongoose.Types.ObjectId],
      ref: "Leasee"
   },

   //this is used to render all room related details
   features:{
      properties:{
         NAME : {type : String},
         DESCRIPTION : {type : String},
         Image : {type : String},
         Cost : {type : String},
         MaxCapacity : {type : Number},
         applications : {type : Number},
         trailerURL : {type : String},
         coordinates : {type : [Number]} // used to check if exceeds maxCapacity, and for rendering. If exceeds max, then remove from grid
      },
   },
   
   // all fields here for rendering details which are not essential on Lessors postings page
   createdDate:{
      type: Date,
      default: new Date()
   },
   lastModifiedDate:{
      type: Date,
      default: new Date()
   }
}, {versionKey: false,strictQuery: false}); // indexing might be performed on rooms, so strictQuery needs to be false



// When coverting model to JSON to return response, display '_id' field as 'id' for cosmetic reasons (does not change in db)  
roomSchema.set('toJSON', { 
   transform: function(doc, ret) {
     ret.id = ret._id;
     delete ret._id;
   }});

// get model from schema
const model = mongoose.model('Room', roomSchema);

export default model;