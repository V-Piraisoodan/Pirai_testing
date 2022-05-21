const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema (
    {
        name:{
            type:String,
            required:true
        },
        pic:{
            type:String,
            required:false
        }
    }
)

const Pizza = mongoose.model("pizza",pizzaSchema);
module.exports = Pizza;