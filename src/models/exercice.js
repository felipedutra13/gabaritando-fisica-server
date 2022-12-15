import mongoose from '../database/connection.js';

const ExerciceSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    answers: [{
        description: {
            type: String,
            required: true
        },
        correct: {
            type: Boolean,
            required: true
        }
    }],
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Exercice = mongoose.model('Exercice', ExerciceSchema);

export default Exercice;