import Lesson from "../models/lesson.js";

class LessonController {

    async createLesson(request, response) {
        const { title, url, contentId } = request.body;

        let lesson = null;

        try {
            lesson = await Lesson.create({
                title,
                url,
                content: contentId
            });
        } catch (err) {
            throw new Error("Erro ao criar aula: " + err);
        }

        return response.status(201).json({ lesson })
    }

    async getLessons(request, response) {
        const { contentId } = request.query;

        let lessons = null;
        try {
            lessons = await Lesson.find({ content: contentId });
        } catch (err) {
            throw new Error("Erro ao listar aulas: " + err);
        }

        return response.status(200).json({ lessons });
    }
}

export default LessonController;