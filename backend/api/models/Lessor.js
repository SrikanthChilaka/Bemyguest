import mongoose from 'mongoose';

// Schema for Lessor
const lessorSchema = new mongoose.Schema({
   // use to display on navbar
   name:{
      type:String,
      required: "Name is a required field"
   },
   email: {
      type: String,
      required: "Email is a required field"
   },
   
   // used to render owned rooms on posting page.
   //  but if room has owner id, all owned rooms for a particular lessor can be queried from all rooms. So no need
   // ownedRoomIds:{
   //    type:[String],
   //    default : []
   // },

   // used for cosmetic purposes
   createdDate:{
      type: Date,
      default: new Date()
   },
   lastModifiedDate:{
      type: Date,
      default: new Date()
   }
}, {versionKey: false});



// When coverting model to JSON to return response, display '_id' field as 'id' for cosmetic reasons (does not change in db)  
lessorSchema.set('toJSON', { 
   transform: function(doc, ret) {
     ret.id = ret._id;
     delete ret._id;
   }});

// get model from schema
const model = mongoose.model('Lessor', lessorSchema);

export default model;