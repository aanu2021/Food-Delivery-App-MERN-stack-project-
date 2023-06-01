const express = require("express");
const app = express();
const Order = require("../models/Orders");
const router = express.Router();

app.use(express.json());

router.post("/orderdata", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  const eId = await Order.findOne({ email: req.body.email });

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { order_data: data },
        }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post('/myorders',async(req,res)=>{
    try{
       const myData = await Order.findOne({email : req.body.email});
       res.json({orderData : myData});
    }catch(error){
       console.log(error.message);
       res.send("Server Error",error.message);
    }
})

module.exports = router;
