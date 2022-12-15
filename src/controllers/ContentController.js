import Content from '../models/content.js';
import Exercice from '../models/exercice.js';
import Lesson from "../models/lesson.js";
import Material from '../models/material.js';
import UserAnswer from '../models/userAnswer.js';

function formatOutput(contentId, exercices, materials, lessons, userAnswers) {
    function formatExercices(exercices) {
        return exercices.map(exercice => {
            let userAnswer = userAnswers.find(item => item.exercice._id.equals(exercice._id));
            return {
                _id: exercice._id,
                level: exercice.level,
                number: exercice.number,
                description: exercice.description,
                image: exercice.image,
                isCorrect: userAnswer && userAnswer.answer == exercice.answers.find(answer => answer.correct)._id,
                answers: exercice.answers.map(answer => {
                    return {
                        _id: answer._id,
                        description: answer.description,
                        correct: answer.correct,
                        userAnswer: userAnswer && userAnswer.answer == answer._id
                    };
                })
            }
        });
    }

    return {
        content: contentId,
        exercices: formatExercices(exercices),
        materials: materials,
        lessons: lessons
    };
}

async function getObjs(Model, contentId) {
    let objs;

    try {
        objs = await Model.find({ content: contentId });
    } catch (err) {
        throw new Error("Não foi possível obter os objetos: " + err);
    }

    return objs;
}


async function getUserAnswers(user_id) {
    let userAnswers;

    try {
        userAnswers = await UserAnswer.find({ user: user_id });
    } catch (err) {
        throw new Error("Não foi possível obter as respostas do usuário: " + err);
    }

    return userAnswers;
}

class ContentController {

    async createContent(request, response) {
        const { title, disciplineId } = request.body;

        let content;

        try {
            content = await Content.create({
                title,
                discipline: disciplineId
            });
        } catch (err) {
            throw new Error("Não foi possível criar o conteúdo: " + err);
        }

        return response.status(201).json({ content });
    }

    async getContents(request, response) {
        const { disciplineId } = request.query;

        let contents;

        try {
            contents = await Content.find({ discipline: disciplineId });
        } catch (err) {
            throw new Error("Não foi possível obter os conteúdos: " + err);
        }

        return response.status(200).json({ contents });
    }

    async getContent(request, response) {
        const { contentId, user_id } = request.query;

        let exercices = await getObjs(Exercice, contentId);
        let materials = await getObjs(Material, contentId);
        let lessons = await getObjs(Lesson, contentId);
        let userAnswers = await getUserAnswers(user_id);

        return response.status(200).json(formatOutput(contentId, exercices, materials, lessons, userAnswers));
    }
};

export default ContentController;