import express from 'express';
import v1Routes from './v1/index.js';

const router = express.Router();

// router.post('/start');
// router.

router.use('/v1', v1Routes);


export default router;