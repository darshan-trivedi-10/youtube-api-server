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
router.get('/videos/search', searchController.search);

// Key management
router.post('/add/key', youtubeController.addKey);
router.get('/get/keys', youtubeController.getKey);

export default router;