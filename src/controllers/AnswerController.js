import Answer from './../models/answer.js';

class AnswerController {
    async getAnswers(request, response) {
        const { exerciceIds, userId } = request.query;

        let answers;

        try {
            answers = await Answer.find({
                user: userId,
                exercice: exerciceIds.split(',')
            })
        } catch (err) {
            throw new Error("Não foi obter a lista de respostas: " + err);
        }

        return response.status(200).json({ answers });
    }

    async setAnswer(request, response) {
        const { exerciceId, userId, answerSelected, correct } = request.body;

        let answer;

        try {
            answer = await Answer.create({
                exercice: exerciceId,
                user: userId,
                answer: answerSelected,
                correct
            });
        } catch (err) {
            throw new Error("Não foi possível salvar a resposta: " + err);
        }

        return response.status(201).json({ answer });
    }
};

export default AnswerController;