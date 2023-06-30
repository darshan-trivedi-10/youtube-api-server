import { StatusCodes } from "http-status-codes";
import { startFetchingVideos, stopFetchingVideos } from "../services/YoutubeService.js";


class YoutubeController {
    async startFetchingVideos(req, res) {
        try {
            const keyword = req.body.keyword;
            const response = await startFetchingVideos(keyword);
            res.status(StatusCodes.OK).json({
                message: "Youtube Video Fetching Start Succesfully",
                data: response,
                success: true,
                err: {}
            })


        } catch (error) {
            console.log("Error in Youtube Controller");
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                data: {},
                success: false,
                err: error
            });
        }
    }

    async stopFetchingVideos(req, res) {
        try {
            const response = stopFetchingVideos();
            res.status(StatusCodes.OK).json({
                message: "Youtube Video Fetching stop",
                data: response,
                success: true,
                err: {}
            });

        } catch (error) {
            console.log("Error in Youtube Controller");
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                data: {},
                success: false,
                err: error
            });
        }
    }

}

export default YoutubeController;