const express = require("express");
const mongoose = require("mongoose");
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const Router = require("./routes/index")

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.get('/', (req, res) => {
    res.send('The backend is responding well!!')
})

app.use(process.env.APP_USER_ROUTE, Router)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 7000");
})

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB Connected!!"))
.catch((err) => console.error("Connection error:", err));

// Swagger Setup
// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Homnique Report Management API',
//             version: '1.0.0',
//             description: 'API documentation for report management system',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:7000', //http://localhost:7000/auth/user/resetPassword
//             },
//         ],
//     },
//     apis: ['/auth/user/resetPassword'], ['/auth/user/verifyOtp'] // Path to the API routes
// };
  