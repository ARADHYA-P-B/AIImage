// routes/imageRoutes.js

import express from 'express';
import axios from 'axios';

const router = express.Router();

// Replicate API token and model version
const MODEL_VERSION = 'stability-ai/stable-diffusion:latest';

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Send a request to Replicate API
    const response = await axios.post(
      `https://api.replicate.com/v1/predictions`,
      {
        version: MODEL_VERSION,
        input: { prompt,
          width: 1024,
          height: 1024,
          format: 'b64_json'},
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Get the image output URL from response data
    const image = response.data.output ? response.data.output : 'Image generation in progress...';

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('Error response:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response?.data?.error || 'An error occurred' });
}
});

export default router;
