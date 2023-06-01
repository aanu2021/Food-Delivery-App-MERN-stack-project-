require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
   res.sendFile("<h1>Hello World!!!</h1>");
})

app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api",require("./routes/OrderData"));
app.use("/api",require("./routes/GetLocation"));

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
    // console.log(global.foodItems);
  });
});
