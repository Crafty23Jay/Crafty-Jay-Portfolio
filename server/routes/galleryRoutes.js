const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const authenticateToken = require('../middleware/authMiddleware');
const cloudinary = require('../utils/cloudinary');
const multer = require('multer');
const streamifier = require('streamifier');

// Set up Multer to buffer upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload new gallery image
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio-gallery' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary Upload Failed', error });
        }

        const newImage = new Gallery({
          imageUrl: result.secure_url,
          caption: req.body.caption || ''
        });

        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully', data: newImage });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  } catch (err) {
    res.status(500).json({ message: 'Upload Error', error: err.message });
  }
});

// Fetch all gallery images (public)
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images', error: err.message });
  }
});

// Delete a gallery image
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting image', error: err.message });
  }
});

module.exports = router;
