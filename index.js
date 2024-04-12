const express=require('express')
const dotenv=require('dotenv');
const  databaseConnection  = require('./utils/database');
const cookieParser = require('cookie-parser');
const userRouter=require('./routes/userRoutes')
const cors=require('cors')

databaseConnection();

dotenv.config({
    path:".env"
})

const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));

const corsoption={
    // frontend a url backend r kon jaiga thaka data ascha sata jana na. akhana origin bhujanor jonno "origin" diya hoccha.
    origin:'http://localhost:3000',
    credentials:true
}

app.use(cors(corsoption))
//custom API:
app.use("/api/v1/user",userRouter)

app.listen(process.env.PORT,()=>{  
    console.log(`server is started at PORT ${process.env.PORT}`);
})