import axios from "axios";
import Video from '../model/videoSchema.js'

import { updateKey, getAPIKey } from "../config/config.js";

const baseURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&';

let id;
let API_KEY = await getAPIKey();

async function changeAPIKey() {
    // Logic To Add API Key
    await updateKey();
    let newKey = await getAPIKey();
    API_KEY = newKey;
}

const startFetchingVideos = async (keyword) => {
    try {
        let startDate = new Date(); // Today's date
        let endDate = getPreviousDay(startDate);
        id = setInterval(async () => {
            API_KEY = await getAPIKey();
            console.log(API_KEY);
            let query = `type=video&order=date&type=video&maxResults=10&q=${keyword}&key=${API_KEY}&publishedAfter=${getFormattedDate(endDate)}&publishedBefore=${getFormattedDate(startDate)}`;
            console.log(startDate, " ", endDate);
            try {
                console.log(baseURL + query);
                const response = await axios.get(baseURL + query);
                const { data } = response;
                storeVideo(data.items);
                startDate = endDate;
                endDate = getPreviousDay(startDate);
            } catch (error) {
                console.log(error);
                if (error.response.status == 403) {
                    await changeAPIKey();
                }
            }

        }, 10000);

        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// to store video in db
function storeVideo(videos) {

    videos.forEach(async video => {
        const videoData = {
            etag: video.etag,
            videoId: video.id.videoId,
            publishedAt: video.snippet.publishedAt,
            channelId: video.snippet.channelId,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnails: {
                default: {
                    url: video.snippet.thumbnails.default.url,
                    width: video.snippet.thumbnails.default.width,
                    height: video.snippet.thumbnails.default.height
                },
                medium: {
                    url: video.snippet.thumbnails.medium.url,
                    width: video.snippet.thumbnails.medium.width,
                    height: video.snippet.thumbnails.medium.height
                },
                high: {
                    url: video.snippet.thumbnails.high.url,
                    width: video.snippet.thumbnails.high.width,
                    height: video.snippet.thumbnails.high.height
                }
            },
            channelTitle: video.snippet.channelTitle,
            publishTime: video.snippet.publishTime,
        };

        try {
            const newVideo = new Video(videoData);
            await newVideo.save();
            console.log("Video data saved");
        } catch (error) {
            console.log("Something went wrong while storing video data");
            console.log(error);
        }

    });

}


function stopFetchingVideos() {
    try {
        clearInterval(id);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Utility function to get the previous day's date
function getPreviousDay(date) {
    const previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    return previousDay;
}

// Utility function to format the date as RFC 3339 string
function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00Z`;
}

export { startFetchingVideos, stopFetchingVideos };