const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email : {
       type : String,
       required : true,
       unique : true
    },
    order_data : {
       type : Array,
       required : true
    }
});

const Order = new mongoose.model('orders',orderSchema);

module.exports = Order;