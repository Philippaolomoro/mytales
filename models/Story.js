const mongoose = require("mongoose")

const StorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model("Story", StorySchema)

// name
// usetid
// createdat
// description
// media-just pictures
