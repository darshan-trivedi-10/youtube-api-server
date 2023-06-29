import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    etag: {
        type: String,
        required: true
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
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnails: {
        default: {
            url: {
                type: String,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            }
        },
        medium: {
            url: {
                type: String,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            }
        },
        high: {
            url: {
                type: String,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            }
        }
    },
    channelTitle: {
        type: String,
        required: true
    },
    publishTime: {
        type: Date,
        required: true
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
