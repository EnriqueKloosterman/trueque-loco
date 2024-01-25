const express = require('express');
const database = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const userController = {

   register: async (req, res) => {
       const { user_name, user_email, user_password, user_address, user_phone, user_avatar } = req.body;
       console.log(req.body);
       const user = await database.Users.findOne({ where: { user_email: user_email } });
       if (user) {
           return res.status(400).json({ message: 'El mail ya se encuentra registrado' });
       }
       try {
            await database.Users.create({
                user_id: uuidv4(),
                user_name: user_name,
                user_email: user_email,
                user_password: bcrypt.hashSync(user_password, 10),
                user_address: user_address,
                user_phone: user_phone,
                user_avatar: req.file ? req.file.filename: ''
            })

            return res.status(201).json({ message: 'User created' });
       } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
       }
   }
}


module.exports = userController