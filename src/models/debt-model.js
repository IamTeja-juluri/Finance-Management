const mongoose = require('mongoose')
const debtSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name : {
        type: String,
        required : [true,'Please provide a suitable name for your debt']
    },
    amount : {
        type : Number,
        required : [true,'Please provide an amount']
    },
    interest : {
        type : Number,
        required : [true,"Please enter interest rate"]
    },
    startDate : {
        type :  Date,
        required : [true, "Please provide a starting date"],
    },
    duration : {
        type : Number,
        required : [true, "Please provide duration in number of months"]
    }
},{
    timestamps:true
})

const Debt =  mongoose.model("Debt",debtSchema)
module.exports=Debt