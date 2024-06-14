const User = require("../Schema/user.model");
const { hashPassword } = require("../utility/bcrypt");
const generateToken = require("../utility/jwtToken");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const payload = req.body;
    console.log('Payload:',payload)
    try {
        const encryptedPassword = await hashPassword(payload.password);
        payload.password = encryptedPassword;

        // db call
        const user = await User.create(payload);
        console.log(user);
        const authorization = await generateToken({id: user._id});
        res.setHeader('Authorization', authorization);
        res.status(201).send(user);
    } catch (error) {
        console.log('Error creating user:', error)
        res.status(500).send('Internal server error');
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    let userId = null;
    if(req.user) {
        userId = req.user.id;
    }

    try {

        if(userId) {
            const user = await User.findById(userId);
            res.setHeader('Authorization', req.headers.authorization);
            res.status(200).send(user);
        } else {
            if(!email || !password) {
                return res.status(400).send('Email and password required');
            }

            const user = await User.findOne({email});
            if(!user) {
                return res.status(404).send('User not found');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) {
                return res.status(401).send('Invalid password');
            }

            const authorization = await generateToken({id: user._id});
            res.setHeader('Authorization', authorization);
            res.status(200).send(user);
        }

    } catch (error) {
        console.log('Error logging in user:', error)
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    createUser, loginUser
}