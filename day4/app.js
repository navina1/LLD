const express=require("express");
const app=express();
const {getProductData}=require("./product")
app.get("/",(req,res)=>{
    res.send("this is home page")
})
app.get("/product/:id",async(req,res)=>{
    const {id}=req.params;
    const data=await getProductData(id);
    return res.send(data)
})

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getUserData(id);
    return res.send(data);
  });
app.listen(3000,()=>{
    console.log("server started at port 3000"); 
    });