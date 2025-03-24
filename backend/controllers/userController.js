import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    
    const token = generateToken(user._id);


    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }
    // check email and password
    const user = await User.findOne({ email });    
    const isMatch = await bcrypt.compare(password, user.password);
    // generate jwt token
    const token = generateToken(user._id);
    if(user && isMatch) {
        res.json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
}
);

// @desc    Get user data
// @route   POST /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);
    res.status(200).json({
        _id,
        name,
        email
    });
}
);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}