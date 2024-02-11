const mongoose = require("mongoose")
const transactionSchema = mongoose.Schema({

},{
    timestamps:true
})

const Transaction=mongoose.model('Transaction',transactionSchema)
module.exports=Transaction