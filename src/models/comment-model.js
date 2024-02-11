const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Post'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    commentText : {
        type : String,
        required  : true
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema)
module.exports=Comment