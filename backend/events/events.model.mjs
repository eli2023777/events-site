import mongoose, { model, Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    time: String,
    // participants: [{ name: String, email: String }],
    zoomLink: String,
    location: String,
    image: {
        url: String,
        alt: String,
    },

    // eventType: { type: String, enum: ['party', 'conference'] },
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

