const { google } = require('googleapis');

// Replace with your own API key
const API_KEY = 'AIzaSyBi0tvBwaneUzHuRSPNlT1391nao8n5kDY'; // Dummy API KEY,don't even try

// Replace with the video ID you want to fetch details for
const VIDEO_ID = 'OmZLC2bf5-w';

async function getVideoLikes() {
  try {
    // Initialize the YouTube API client
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY,
    });

    // Fetch video details
    const response = await youtube.videos.list({
      part: 'statistics',
      id: VIDEO_ID,
    });

    // Check if video data was returned
    if (response.data.items.length === 0) {
      console.log('Video not found');
      return;
    }

    // Get statistics
    const stats = response.data.items[0].statistics;

    // Output like count
    console.log(`Likes: ${stats.likeCount}`);
    console.log(`Dislikes: ${stats.dislikeCount}`);
  } catch (error) {
    console.error('Error fetching video details:', error);
  }
}

// Call the function
getVideoLikes();
