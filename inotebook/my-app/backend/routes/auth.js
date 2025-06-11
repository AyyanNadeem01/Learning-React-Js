const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET="Ayyankalevelhai";

//Creating a New User, Not loggin required
router.post('/createuser', [
    body('name', "Enter Name").isLength({ min: 3 }),
    body('email', "Enter Valid Email").isEmail(),
    body('password', "Enter at least 5 character password").isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; 

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({success, error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        let data = {
            user: {
                id: user.id
            }
        };
        const JWT_DATA=jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, JWT_DATA});

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//Authenticating a User, not login required
router.post('/login', [
    body('email', "Enter Valid Email").isEmail(),
    body('password', "Password Cannot be blank").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try{
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){

            return res.status(400).json({success,error:"Invalid Credentials"});
        }
        let data = {
            user: {
                id: user.id
            }
        };
        const JWT_DATA=jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,JWT_DATA});
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

//Get Logged in User Details
router.post('/getuser',fetchuser, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
