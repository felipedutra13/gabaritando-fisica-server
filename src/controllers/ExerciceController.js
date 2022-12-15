import Exercice from '../models/exercice.js';

class ExerciceController {

    async createExercice(request, response) {
        let exercice;

        const { number, level, description, answers, contentId } = request.body;

        try {
            exercice = await Exercice.create({
                number,
                level,
                description,
                answers,
                content: contentId
            });
        } catch (err) {
            throw new Error("Não foi possível criar o exercício: " + err);
        }

        return response.status(201).json({ exercice });
    }

    async getExercices(request, response) {
        const { contentId } = request.query;

        let exercices;

        try {
            exercices = await Exercice.find({ content: contentId });
        } catch (err) {
            throw new Error("Não foi possível obter os exercícios: " + err);
        }

        return response.status(200).json({ exercices });
    }
};

export default ExerciceController;