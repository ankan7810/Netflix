const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config({
    path:"./.env"
})

const databaseConnection =()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Mongodb connected sucessfully !!!");
    }).catch((error)=>{
        console.log(error);
    })
};

module.exports=databaseConnection;