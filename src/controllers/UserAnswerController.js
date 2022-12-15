import UserAnswer from "../models/userAnswer.js";
import Exercice from "../models/exercice.js";

class UserAnswerController {
    async setUserAnswer(request, response) {
        const { user_id, exerciceId, answerId } = request.query;

        let exercice;

        try {
            exercice = await Exercice.findById({ _id: exerciceId });
        } catch (err) {
            throw new Error("Ocorreu um erro ao verificar resposta do usuário: " + err);
        }

        let isCorrectAnswer = exercice.answers.find(answer => answer._id.equals(answerId)).correct;

        try {
            await UserAnswer.create({
                exercice: exerciceId,
                user: user_id,
                answer: answerId
            });
        } catch (err) {
            throw new Error("Não foi possível salvar a resposta do usuário: " + err);
        }

        let exerciceUpdated = {
            _id: exercice._id,
            level: exercice.level,
            number: exercice.number,
            description: exercice.description,
            image: exercice.image,
            isCorrect: isCorrectAnswer,
            answers: exercice.answers.map(answer => {
                return {
                    _id: answer._id,
                    description: answer.description,
                    correct: answer.correct,
                    userAnswer: answerId == answer._id
                };
            })
        };

        return response.status(200).json({ exerciceUpdated });
    }

    async getUserAnswers(request, response) {
        const { user_id } = request.query;

        let userAnswers;

        try {
            userAnswers = await UserAnswer.find({ user: user_id });
        } catch (err) {
            throw new Error("Não foi possível obter as respostas do usuário: " + err);
        }

        return response.status(200).json(userAnswers);
    }
}

export default UserAnswerController;