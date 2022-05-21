const router = require("express").Router();
const {User} = require("../model/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/",async (req,res,next)=>{
    // res.send("hi")
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message:error.details[0].message});
        }
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(401).send({message:"Invalid Email or Password"});
        
        }
        const ValidPassword = await bcrypt.compare(req.body.password,user.password);
        if(!ValidPassword){
            return res.status(401).send({message:"Invalid Email or Password"});
        }

        const token = user.generateAuthToken();
        res.status(200).send({token:token,message:"Logged in successfully"})
        


    }
    catch(err){
        res.status(500).send({message:"Internal Server Error"});
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email:Joi.string().required().label("Enter the Email"),
        password:Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = router;