const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Admin Settings
const adminSecretCode = 'admin2025code';
const allowedEmails = [
  'alasatisaheedjamal@gmail.com',
  'crafty23jay@gmail.com'
];

// ✅ Register Controller
exports.register = async (req, res) => {
  const { username, email, password, secretCode } = req.body;

  try {
    // Check if email is whitelisted
    if (!allowedEmails.includes(email)) {
      return res.status(403).json({ message: 'Unauthorized email for admin registration' });
    }

    // Validate secret admin code
    if (secretCode !== adminSecretCode) {
      return res.status(401).json({ message: 'Invalid admin secret code' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Admin account created successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
