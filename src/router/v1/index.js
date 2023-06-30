import express from 'express';
import { YoutubeController, SearchController } from '../../controller/index.js';

const router = express.Router();

const youtubeController = new YoutubeController();
const searchController = new SearchController();

// Youtube API Routes
router.post('/youtube/start', youtubeController.startFetchingVideos);
router.post('/youtube/stop', youtubeController.stopFetchingVideos);

// Search Router
router.get('/videos/search/:page', searchController.fetchVideos);
// api/videos/search

export default router;