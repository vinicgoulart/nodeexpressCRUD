const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/user', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({ message: "successful", users: users });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try{
        const query = { userId: req.params.id };
        const oneUser = await User.findOne(query);
        res.status(200).json({ message: "successful", user: oneUser });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.post('/createuser', async (req, res) => {
    const userdb = new User({
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });

    try{
        const newUser = await userdb.save();
        res.status(201).json({ message: "Successful", user: newUser});
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.delete('/user/:id', async(req, res) => {
    const query = { userId: req.params.id };
    try{
        const deleteUser = await User.deleteOne(query);
        res.status(200).json({ message: "Successfully deleted" });
    }catch(error){ 
        res.status(500).json({ message: error.message });
    }
});

router.put('/user/:id', async (req, res, next) => {
    const query = {userId: req.params.id};
    const newDataUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    }
    try{
        const updatedUser = await User.updateOne(query, newDataUser);
        res.status(200).json({ message: "Successfully updated", user: newDataUser });
        next();
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;