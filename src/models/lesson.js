import mongoose from '../database/connection.js';

const LessonSchema = new mongoose.Schema({
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

const Lesson = mongoose.model('Lesson', LessonSchema);

export default Lesson;