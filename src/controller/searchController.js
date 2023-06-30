import { StatusCodes } from "http-status-codes";
import Video from "../model/videoSchema.js";


class SearchController {
    async fetchVideos(req, res) {
        try {
            const page = req.params.page || 1;

            const pageSize = 15;
            const skipCount = (page - 1) * pageSize;
            if (skipCount < 0) {
                skipCount = 0;
            }

            const videos = await Video.find({}).sort({ publishedAt: -1 }).skip(skipCount).limit(pageSize);
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

    async search(req, res) {
        try {
            const searchQuery = req.query.q;
            const page = parseInt(req.query.page) || 1; // Get the page number from the request query, default to page 1 if not provided
            const perPage = 10; // Number of results per page

            // Split the search query into individual keywords
            const keywords = searchQuery.split(' ').map(keyword => keyword.trim()); // Trim whitespace from each keyword

            const videos = await Video.aggregate([
                // Match videos that contain any of the keywords in either the title or description
                {
                    $match: {
                        $or: [
                            { title: { $regex: keywords.join('|'), $options: 'i' } },
                            { description: { $regex: keywords.join('|'), $options: 'i' } },
                        ],
                    },
                },
                // Add a field `matchCount` to store the number of matching keywords in title and description
                {
                    $addFields: {
                        matchCount: {
                            $add: [
                                { $size: { $regexFindAll: { input: '$title', regex: keywords.join('|'), options: 'i' } } },
                                { $size: { $regexFindAll: { input: '$description', regex: keywords.join('|'), options: 'i' } } },
                            ],
                        },
                    },
                },
                // Sort the videos based on the matchCount field in descending order
                {
                    $sort: { matchCount: -1 },
                },
                // Pagination: Skip and Limit
                {
                    $skip: (page - 1) * perPage,
                },
                {
                    $limit: perPage,
                },
            ]);

            res.json({
                videos,
                currentPage: page,
            });
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