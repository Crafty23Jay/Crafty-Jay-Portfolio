import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const allowedEmails = [
  'alasatisaheedjamal@gmail.com',
  'crafty23jay@gmail.com'
];

const hashedAdminCode = '88f0b8fd26d704c145b5bdd4706cc9a78de72ea2991bd71bc2ba6810d65da27b';

export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, adminCode } = req.body;

    // Check email whitelist
    if (!allowedEmails.includes(email)) {
      return res.status(403).json({ message: 'Unauthorized email.' });
    }

    // Validate admin code
    const inputCodeHash = bcrypt.hashSync(adminCode, 10); // Note: For production, use a constant-time compare
    const isValidCode = bcrypt.compareSync(adminCode, 'admin2025code');
    if (!isValidCode) {
      return res.status(403).json({ message: 'Invalid admin code.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Admin already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Admin registered successfully!',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Admin Registration Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
