import axios from "axios";
import { API_KEY } from "../config/config.js";

const baseURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&';

let id;

const startFetchingVideos = async (keyword) => {
    try {
        let startDate = new Date(); // Today's date
        let endDate = getPreviousDay(startDate);
        id = setInterval(async () => {
            let query = `type=video&order=date&type=video&maxResults=10&q=${keyword}&key=${API_KEY}&publishedAfter=${getFormattedDate(endDate)}&publishedBefore=${getFormattedDate(startDate)}`;
            const response = await axios.get(baseURL + query);
            const { data } = response;
            startDate = endDate;
            endDate = getPreviousDay(startDate);
        }, 1000);
    } catch (error) {
        console.log(error);
    }
};

function stopFetchingVideos() {
    setTimeout(() => {
        clearInterval(id);
    }, 1000);
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