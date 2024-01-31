const database = require("../database/models");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const generateToken = require("../utils/tokenManager.js");

const userController = {
  register: async (req, res) => {
    const { user_name, user_email, user_password, user_address, user_phone } =
      req.body;
    const user = await database.Users.findOne({
      where: { user_email: user_email },
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "El mail ya se encuentra registrado" });
    }
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      };
      await database.Users.create({
        user_id: uuidv4(),
        user_name: user_name,
        user_email: user_email,
        user_password: bcryptjs.hashSync(user_password, 10),
        user_address: user_address,
        user_phone: user_phone,
        user_avatar: req.file ? req.file.filename : "",
      });

      return res.status(201).json({ message: "User created" });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const  { user_email, user_password } = req.body;
      let user = await database.Users.findOne({
        where: { user_email: user_email }
      });
      if(!user){
        return res.status(404).json({message: "User not found"});
      };
      const passwordToMatch = bcryptjs.compareSync(user_password, user.user_password);
      if(!passwordToMatch){
        return res.status(401).json({message: "Invalid password"});
      };
      const { token, expiresIn} = generateToken(user.user_id);
      res.cookie("token", token, {
        httpOnly: true,
        // secure: !(process.env.MODO === "developer"),
      })
   
      res.status(200).json({ token, expiresIn, message: "login ok"})
    } catch (error) {
      return res.status(500).json( {error: "Server Error"} )
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout ok" });
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await database.Users.findOne({
        where: { user_id: userId },
        attributes: [
          "user_name",
          "user_email",
          "user_address",
          "user_phone",
          "user_avatar",
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { user_name, user_email, user_address, user_phone } = req.body;

      const user = await database.Users.findOne({
        where: { user_id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.update({
        user_name: user_name,
        user_email: user_email,
        user_address: user_address,
        user_phone: user_phone,
      });

      return res.status(200).json({ message: "User updated" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }, 
};

module.exports = userController;
