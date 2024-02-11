const mongoose = require('mongoose')
const targetSchema = mongoose.Schema({
   userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
   },
   aim : {
    type : String,
    required :[true,'Please provide aim for your target']
   },
   amount : {
    type : Number,
    required :[true,'Please set some amount for your target']
   },
   targetDate : {
    type : Date,
    required : [true,'Please provide a date to achieve this target']
   },
   description : {
    type  : String,
    required : [true,'Please provide some description about your target']
   }
},{
    timestamps:true
})

const Target = mongoose.model('Target',targetSchema)
module.exports=Target