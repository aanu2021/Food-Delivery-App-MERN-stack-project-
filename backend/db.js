require("dotenv").config();
const mongoose = require("mongoose");
const mongouri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);

const mongodb = async () => {
  try {
    await mongoose.connect(mongouri);
    console.log("Connected to Mongo Successfully!");
    console.log(`Database is located at ${mongoose.connection.host}`);
    console.log(`Database is ported at ${mongoose.connection.port}`);

    const fetched_data = await mongoose.connection.db.collection("food_items");

    global.foodItems = await fetched_data
      .find({})
      .toArray(async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      });

    const fetched_data_2 = await mongoose.connection.db.collection(
      "food_category"
    );

    global.foodCategory = await fetched_data_2
      .find({})
      .toArray(async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      });

    // console.log(global.foodItems);
    // console.log(global.foodCategory);

    /*

    const fetched_data = await mongoose.connection.db.collection('food_items');
    
    const foodItems =  await fetched_data.find({}).toArray((err,data)=>{
       if(err){
         console.log(err);
       }
       else{
         console.log(data);
       }
    });
    console.log(foodItems);


    const fetched_data2 = await mongoose.connection.db.collection('food_category');

    const foodCategory = await fetched_data2.find({}).toArray((err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(data);
        }
    });
    console.log(foodCategory);

    */
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongodb;
