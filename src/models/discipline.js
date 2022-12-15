import mongoose from '../database/connection.js';

const DisciplineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Discipline = mongoose.model('Discipline', DisciplineSchema);

export default Discipline;