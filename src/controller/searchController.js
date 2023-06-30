import { StatusCodes } from "http-status-codes";
import Video from "../model/videoSchema.js";


class SearchController {
    async fetchVideos(req, res) {
        try {
            const page = req.params.page;
            
            const pageSize = 15;
            const skipCount = (page - 1) * pageSize;
            if (skipCount < 0) {
                skipCount = 0;
            }

            const videos = await Video.find({}).sort({ createdAt: -1 }).skip(skipCount).limit(pageSize);
            return res.status(StatusCodes.OK).json({
                message: "videos fetched SuccesFully",
                data: videos,
                success: true,
                err: {}
            })

        } catch (error) {
            console.log("Error in search Controller");
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

export default SearchController;