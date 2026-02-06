import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check user in DB
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      res.status(400).json({ message: 'User already exist' }); //400 invalid input from client
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //new user
    const newUser = await User.create({ email, password: hashPassword });

    //create token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res
      .status(201)
      .json({ message: 'New user is created', token, email: newUser.email });
  } catch (err) {
    console.log('server error', err.message);
  }
};

//login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: 'Email or password is not correct.' });
    }
    // create token
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      token,
      _id: user._id,
      email: user.email,
      message: 'User login successful.',
    });
  } catch (err) {
    console.log('Server error', err.message);
    res.status(500).json({ message: 'server error' });
  }
};

export const getProfile = (req, res) => {
  try {
    const currentUser = req.user;
    res.status(200).json(currentUser);
  } catch (err) {
    res.status(500).json({ message: 'Invalid user' });
  }
};
