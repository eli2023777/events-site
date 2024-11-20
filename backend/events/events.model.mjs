import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    time: String,
    location: String,
    description: String,
    image: {
        url: String,
        alt: String,
    },

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});


export const Event = mongoose.model('Event', eventSchema);

