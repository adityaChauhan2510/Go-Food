const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/Go-Food'; // Replace with your MongoDB connection URI
//const mongoURI = 'mongodb+srv://adityachauhan2501:ChauhanAditya@cluster0.uw2bacf.mongodb.net/GoFoodMERN?retryWrites=true&w=majority'; 

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
  
      const fetchedData = mongoose.connection.db.collection("food_items");
      const foodItemsData = await fetchedData.find({}).toArray();
  
      const foodCategory = mongoose.connection.db.collection("foodCategory");
      const foodCategoryData = await foodCategory.find({}).toArray();
  
      global.food_items = foodItemsData;
      global.foodCategory = foodCategoryData;
  
    //   console.log(global.food_items);
    //   console.log(global.foodCategory);
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  };
  





module.exports = connectDB;
