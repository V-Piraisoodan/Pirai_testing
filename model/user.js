const { string } = require("joi");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const JoipasswordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type : String,
            required : true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
);

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.SECRETKEY)
    return token;
};

const User = mongoose.model("users",userSchema);

const validate = (data) => {
    const Schema = Joi.object({
        firstname:Joi.string().required().label("First Name"),
        lastname:Joi.string().required().label("Last Name"),
        email:Joi.string().required().label("Enter the Email"),
        password:JoipasswordComplexity().required().label("Password")
    });
    return Schema.validate(data)
};

module.exports={User,validate}