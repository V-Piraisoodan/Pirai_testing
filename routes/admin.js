const router = require("express").Router();
const {User,validate} = require("../model/user");
const bcrypt = require("bcrypt");


router.post("/",async (req,res,next)=>{
    try{
        const {error} = validate(req.body);
        if(error){
            
            return res.status(400).send({message:error.details[0].message});
        }
        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(409).send({message:"Email id already exists"})
            
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        await new User({...req.body,password:hashedPassword}).save();
        res.status(201).send({message:"Admin account created successfully"})
    }
    catch(err){
        res.send(500).send({message:"Internal Server Error"});
    }
})

module.exports = router;