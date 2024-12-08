const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware.js");
const History = require("../models/History.js"); // Import the History model

const router = express.Router();

// Route to summarize video description based on the YouTube video URL
router.post("/summarize", async (req, res) => {

  console.log("Request body:", req.body);
  const { videoUrl } = req.body;  // Change this line to use videoUrl instead of videoDescription

  if (!videoUrl) {
    return res.status(400).json({ error: "Video URL is required" });
  }

  try {
    // Extract video ID from the URL
    const videoId = getVideoIdFromUrl(videoUrl);  // videoUrl, not videoDescription
    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube video URL" });
    }

    // Get video details from YouTube API
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
    console.log(youtubeApiUrl)
    const youtubeResponse = await axios.get(youtubeApiUrl);
    if (youtubeResponse.data.items.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    console.log(youtubeResponse.data.items)

    const videoDescription = youtubeResponse.data.items[0].snippet.description;

    if (!videoDescription) {
      return res.status(400).json({ error: "Video description is empty" });
    }

    // Now, call Hugging Face API for summarization
    const modelName = "facebook/bart-large-cnn"; // Model name for summarization
    const huggingFaceResponse = await axios.post(
      `https://api-inference.huggingface.co/models/${modelName}`,
      { inputs: videoDescription },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const results = await History.insertMany({
      query: videoUrl,
      summary : huggingFaceResponse.data[0].summary_text || "No summary generated"
    })
    console.log(results)

    // Send the summary back to the client
    res.status(200).json({
      summary: huggingFaceResponse.data[0].summary_text || "No summary generated",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to summarize the video description." });
  }
});

// Utility function to extract video ID from YouTube URL
function getVideoIdFromUrl(url) {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

console.log("Summarize route loaded successfully!");

module.exports = router;



