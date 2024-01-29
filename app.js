const express = require("express");
const cors = require("cors");
const cookieParser = require( "cookie-parser");;
const authRouter = require( "./src/routes/auth.routes.js");
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter )

const publicPath = path.resolve(__dirname, '../public');
app.use('publicPath', express.static(publicPath));


app.use((req, res, next) => {
    res.status(404).json({message: "404 not found"})
    next();
})

app.listen(PORT, () => {
    console.log(`You have once again entered the world of survival horror! Good Luck!! Ohh! Also, the server is running on port http://localhost:${PORT} 😁`);
})