const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());

router.post('/foodData',async(req,res)=>{
    try{
        res.send([global.foodItems,global.foodCategory]);
    }catch(err){
        console.log(err);
        res.send("Server Error");
    }
})

module.exports = router;