const express = require("express")
const aktorlerRouter= require('./routers/aktorlerRouter')
const logger= require('./middleware/logger')
const errorHandling= require('./middleware/errorHandling')

const server = express()
server.use(express.json());
server.use(logger);
server.use("/aktorler",aktorlerRouter);
server.get('/', (req,res)=>{
    res.send("expressssssssssss")
})




server.use(errorHandling)

server.listen(3001,()=>{
  console.log("localhost:3001 calısıyor")
})