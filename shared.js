const mongoose = require('mongoose');

module.exports = {
    selectedDb : {},
     async connectMongoose(){
    try{
        await mongoose.connect(process.env.MONGOOSE_CONNECTION_URL);
        // this.selectedDb = client.db("user");
        console.log("connection success");
    }
    catch(err){
        console.log(err);
    }
}
}


