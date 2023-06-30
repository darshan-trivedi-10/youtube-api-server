import express from 'express';
import { YoutubeController } from '../../controller/index.js';

const router = express.Router();

const youtubeController = new YoutubeController();

// Youtube API Routes
router.post('/youtube/start', youtubeController.startFetchingVideos);
router.post('/youtube/stop', youtubeController.stopFetchingVideos);

export default router;