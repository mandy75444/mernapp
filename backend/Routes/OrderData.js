const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    const { order_data, email } = req.body;

    try {
        // Check if the user has previous orders
        const existingOrder = await Order.findOne({ email: email });

        if (!existingOrder) {
            // If no previous order, create a new one
            await Order.create({
                email: email,
                order_data: [order_data]  // Directly push the order data
            });

            return res.json({ success: true });
        } else {
            // If user exists, update with the new order data
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } } // Push new order data
            );

            return res.json({ success: true });
        }
    } catch (error) {
        console.error("Error occurred while processing the order:", error.message);
        return res.status(500).send({ success: false, message: "Server Error", error: error.message });
    }
});


// Backend code (Node.js example)
router.post('/myOrderData', async (req, res) => {
    const userEmail = req.body.email;
    const orders = await Order.findOne({ email: userEmail });
    console.log(orders); // Log the response to ensure data is correct
    res.json(orders);  // Send the correct response
});


module.exports = router;
