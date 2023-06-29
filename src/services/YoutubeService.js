import axios from "axios";
import { API_KEY } from "../config/config.js";
/*

FIRST TIME : https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&maxResults=10&q=${KEYWORD}&key=${API_KEY}

next page token will be in the body nextPageToken

AFER SECOND CODE : https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&pageToken=${PAGE_TOKEN}&q={KEYWORD}&key=${YOUR_API_KEY}'

*/

const baseURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&';

let id;

const startFetchingVideos = async (keyword) => {
    try {
        let nextPageToken = undefined;
        id = setInterval(async () => {
            console.log(keyword);
            let query = `type=video&order=date&maxResults=10&q=${keyword}&key=${API_KEY}`;
            if (nextPageToken) {
                query = query + `&pageToken=${nextPageToken}`;
            }
            console.log(query);
            const data = await axios.get(baseURL + query);
            nextPageToken = data.data.nextPageToken;
        }, 1000);
    } catch (error) {
        console.log(error);
    }
}

function stopFetchingVideos() {
    setTimeout(() => {
        clearInterval(id);
    }, 1000);
}

export {
    startFetchingVideos, stopFetchingVideos
};