import mongoose from '../database/connection.js';

const AnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exercice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercice',
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

export default Answer;