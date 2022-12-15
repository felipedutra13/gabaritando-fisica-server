import mongoose from '../database/connection.js';

const MaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Material = mongoose.model('Material', MaterialSchema);

export default Material;