import mongoose from '../database/connection.js';

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discipline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discipline'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Content = mongoose.model('Content', ContentSchema);

export default Content;