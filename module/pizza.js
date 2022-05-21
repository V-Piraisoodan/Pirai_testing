const pizzaModule = require("../model/pizza");

exports.createPizza = async (req,res,next)=>{
    const pizzaData = new pizzaModule ({...req.body});
    try {
        var response = await pizzaData.save();
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

exports.getPizza = async (req,res,next)=>{
    try {
        const pizza = await pizzaModule.find();
        res.send(pizza)
    } catch (error) {
        console.log(error)
    }
}