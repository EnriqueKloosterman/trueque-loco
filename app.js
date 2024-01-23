const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require( "cookie-parser");;
const authRouter = require( "./src/routes/auth.routes.js");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter )

// app.use(express.static("public"));


app.use((req, res, next) => {
    res.status(404).json({message: "404 not found"})
    next();
})

app.listen(PORT, () => {
    console.log(`You have once again entered the world of survival horror! Good Luck!! Ohh! Also, the server is running on port http://localhost:${PORT} 😁`);
})