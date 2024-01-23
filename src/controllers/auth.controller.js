const express = require('express');

const userController = {
    getUSer: async (req, res) => {
       res.send('perfil de usuario')
   }

}


module.exports = userController