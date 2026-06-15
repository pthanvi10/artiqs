import User from '../models/Users.js';

// @desc    Generate Image via Clipdrop API
// @route   POST /api/image/generate
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // 1. Validation
    if (!prompt) {
      return res.status(400).json({ message: 'Please provide a prompt' });
    }

    // 2. Check user credits in MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(444).json({ message: 'User not found' });
    }

    if (user.credits < 1) {
      return res.status(403).json({ message: 'Insufficient credits. Please buy more.' });
    }

    // 3. Prepare Multi-part Form Data for Clipdrop
    const formData = new FormData();
    formData.append('prompt', prompt);

    // 4. Send secure request to Clipdrop API
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API, // Loaded securely from your .env
      },
      body: formData,
    });

    // Handle Clipdrop errors (e.g., out of API credits or bad request)
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Clipdrop API Error:', errorText);
      return res.status(response.status).json({ message: 'AI generation engine failed' });
    }

    // 5. Convert image response to binary buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert buffer to a base64 string so it's easy to send over JSON and display in React
    const base64Image = buffer.toString('base64');
    const resultImage = `data:image/jpeg;base64,${base64Image}`;

    // 6. Deduct credit and save to MongoDB
    user.credits -= 1;
    await user.save();

    // 7. Return the image and updated credit count
    res.json({
      success: true,
      message: 'Image generated successfully',
      creditBalance: user.credits,
      image: resultImage,
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};