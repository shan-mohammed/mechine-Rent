const express = require("express");
const cors = require("cors");
const mongoose =require("mongoose")
require("dotenv").config();

const recordRoutes = require("./routes/recordRoutes");
const errorHandler = require ("./middleware/errorHandler")

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// mongo DB connection
mongoose 
.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Mongodb connected successfully")

  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

})
.catch((error)=>{
    console.error("Mongodb connnection failed",error)
})

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Rent & Expense Management Backend is running",
  });
});

// Record routes
app.use("/api/records", recordRoutes);

// Error handler
app.use(errorHandler)

