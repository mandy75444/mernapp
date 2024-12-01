const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://ms75444:Crow123@cluster0.eqscxh1.mongodb.net/gofoodmern?appName=Cluster0"
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL,);
        console.log("Connected to DB");

        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const foodItems = await foodItemsCollection.find({}).toArray();
        global.food_items = foodItems;

        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        const foodCategory = await foodCategoryCollection.find({}).toArray();
        global.foodCategory = foodCategory;

       
    } catch (err) {
        console.error(err);
    }
};

module.exports = mongoDB;