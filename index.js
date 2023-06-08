const express= require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const Product = require('./app');

app.use(express.urlencoded({
    extended:true
}));

const taskdata=[];

// mongodb+srv://dibu:<password>@cluster0.tllkilq.mongodb.net/?retryWrites=true&w=majority
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://dibu:Dibya%40123@cluster0.tllkilq.mongodb.net/task_management",
{ useNewUrlParser: true, useUnifiedTopology: true },
(error)=>{
    if(!error){
    console.log("Status","Connected to mongodb");
    //post api

app.post("/api/add_task",async(req, res)=>{
    console.log("Result",req.body);

let data =Product(req.body);

try{
    
    let dataToStore=await data.save();
    res.status(200).json(dataToStore);
}catch(error){
    res.status(400).json({
        "status":error.message
    })

}

    // const Tdata={
    //     "id":taskdata.length+1,
    //     "title":req.body.title,
    //     "description":req.body.desc,
    // };

    // taskdata.push(Tdata);
    // console.log("Final",Tdata);

    // res.status(200).send({
    //     "status_code":200,
    //     "message":"Task added successfully",
    //     "task":Tdata
    // })
})

//get api

app.get("/api/get_task",async (req,res)=>{

    try{
    
        let data=await Product.find();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json(error.message)
    
    }
    // if(taskdata.length>0){
    //     res.status(200).send({
    //         "status_code":200,
    //         "task":taskdata
    //     });
    // }else{
    //     res.status(200).send({
    //         "status_code":200,
    //         "task":[]
    //     });
    // }
})

//put api

app.patch("/api/update/:id",async (req,res)=>{

    let id=req.params.id;
    let updatedData=req.body;
    let options={new:true};
    try{
        const data =await Product.findByIdAndUpdate(id,updatedData,options);
        res.send(data);

    }catch(error){
        res.send(error.message);

    }


    // let id=req.params.id*1;
    // let productToUpdate=taskdata.find(p=>p.id===id);
    // let index=taskdata.indexOf(productToUpdate);
    // taskdata[index]=req.body;
    

    // res.status(200).send({
    //     "status": "success",
    //     "message": "Task updated"
    // })
})

//delete api

app.delete("/api/delete/:id",async (req,res)=>{

    let id=req.params.id;
    try{
        const data =await Product.findByIdAndDelete(id);
        res.json({
            "status": "Deleted the product "+data.title,
        });

    }catch(error){
        res.json(error.message);

    }


    // let id=req.params.id*1;
    // let productToUpdate=taskdata.find(p=>p.id===id);
    // let index=taskdata.indexOf(productToUpdate);

    // taskdata.splice(index,1);

    // res.status(204).send({
    //     "status":"success",
    //     "message":"product deleted"
    // });
})
}else{
    console.log(error.message);
}
})




app.listen(2000,()=>{
    console.log("Connected to server at 2000");
})