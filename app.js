const mongoose= require('mongoose');

let dataSchema =new mongoose.Schema({

    'title':{
        required: true,
        type: String,
    },
    'description':{
        required: true,
        type: String,
    }

});

module.exports=mongoose.model("node_js",dataSchema);