const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    youtubeVideoId: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    packageIds: [{
        type: Number
    }],
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    tags: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Lecture = mongoose.model('lectures', lectureSchema);

module.exports = Lecture;
