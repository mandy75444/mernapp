const express = require("express");
const app = express();
const dbConnect = require("./db")
const createUser = require('./Routes/CreateUser');
const displayData = require('./Routes/DisplayData');
const OrderData = require('./Routes/OrderData');

const cors = require('cors');

// Use CORS with default options
app.use(cors({
    origin: "http://localhost:3000",  // Frontend origin
    methods: "GET,POST,PUT,DELETE",  // Allowed methods
    allowedHeaders: "Content-Type, Authorization"  // Allowed headers
}));



const PORT = 5000;


app.use(express.json());
app.use('/api', createUser);
app.use('/api', displayData);
app.use('/api', OrderData);




app.get('/', (req, res) => {
    res.send("hello world")
})
app.listen(5000, () => {
    console.log(`Server is running at port: ${PORT}`);
})



dbConnect();









