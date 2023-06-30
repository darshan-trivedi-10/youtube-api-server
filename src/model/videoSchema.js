import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    etag: {
        type: String,
    },
    videoId: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    },
    channelId: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    thumbnails: {
        default: {
            url: {
                type: String,
            },
            width: {
                type: Number,
            },
            height: {
                type: Number,
            }
        },
        medium: {
            url: {
                type: String,
            },
            width: {
                type: Number,
            },
            height: {
                type: Number,
            }
        },
        high: {
            url: {
                type: String,
            },
            width: {
                type: Number,
            },
            height: {
                type: Number,
            }
        }
    },
    channelTitle: {
        type: String,
    },
    publishTime: {
        type: Date,
    }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;