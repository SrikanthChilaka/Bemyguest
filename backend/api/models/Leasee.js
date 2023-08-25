import mongoose from 'mongoose';

// Schema for Leasee
const leaseeSchema = new mongoose.Schema({
   // used for rendering on navbar
   name:{
      type:String,
      required: "Name is a required field"
   },
   email: {
      type: String,
      required: "Email is a required field"
   },
   rejectedRoomIds : {
      type : [mongoose.Types.ObjectId],
      ref: "Room"
   },
   
   
   // used to render all booked rooms for each leasee in myBookings page
   // But if room has bookedUserIdObjects, booked rooms for any particular user can be queried from all rooms , so no need here

   // bookedRoomIds:{
   //    type:[String],
   //    default : []
   // },

   // used to know which rooms should render as accepted in myBookings from list of booked rooms
   // But if room has approvedUserIdObjects, all approved rooms for a particular user can be queried from rooms, so no need here
   // approvedRoomIds:{
   //    type:[String],
   //    default : []
   // },

   // all fields below this are for cosmetic purposes
   createdDate:{
      type: Date,
      default: new Date()
   },
   lastModifiedDate:{
      type: Date,
      default: new Date()
   }
}, {versionKey: false,strictQuery: false});



// When coverting model to JSON to return response, display '_id' field as 'id' for cosmetic reasons (does not change in db)  
leaseeSchema.set('toJSON', { 
   transform: function(doc, ret) {
     ret.id = ret._id;
     delete ret._id;
   }});

// get model from schema
const model = mongoose.model('Leasee', leaseeSchema);

export default model;