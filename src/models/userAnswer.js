import mongoose from '../database/connection.js';

const UserAnswerSchema = new mongoose.Schema({
    exercice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercice',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserAnswer = mongoose.model('UserAnswer', UserAnswerSchema);

export default UserAnswer;