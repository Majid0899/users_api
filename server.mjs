import express from 'express'

/* Create a express app */
const app=new express()

/* Print the Welcome message on browser */
app.get("/",(req,res)=>{
    res.send("<h1 style='text-align:center'>Welcome to our Users Managment API</h1>");
})



/* app listen port */
app.listen(5000,()=>{
    console.log("SERVER IS RUNNING ON PORT:5000");
})
