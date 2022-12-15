import Discipline from '../models/discipline.js';
import Content from '../models/content.js';

function formatOutput(disciplines, contents) {
    return disciplines.map(discipline => ({
        discipline: {
            id: discipline.id,
            title: discipline.title
        },
        contents: contents
            .filter(content => content.discipline == discipline.id)
            .map(content => ({
                id: content.id,
                title: content.title
            }))
    }));
}

class DisciplineController {

    async createDiscipline(request, response) {
        const { title, courseId } = request.body;

        let discipline;

        try {
            discipline = await Discipline.create({
                title,
                course: courseId
            });
        } catch (err) {
            throw new Error("Não foi possível criar a disciplina: " + err);
        }

        return response.status(201).json({ discipline });
    }

    async getDisciplines(request, response) {
        const { courseId } = request.query;

        let disciplines;

        try {
            disciplines = await Discipline.find({ course: courseId });
        } catch (err) {
            throw new Error("Não foi possível obter as disciplinas: " + err);
        }

        return response.status(200).json({ disciplines });
    }

    async getDisciplinesWithContent(request, response) {
        const { courseId } = request.query;

        let disciplines;

        try {
            disciplines = await Discipline.find({ course: courseId });
            console.log(disciplines);
        } catch (err) {
            throw new Error("Não foi possível obter as disciplinas: " + err);
        }

        let contents;

        try {
            contents = await Content.find({ discipline: disciplines });
        } catch (err) {
            throw new Error("Erro ao obter conteúdos: " + err);
        }

        let res = formatOutput(disciplines, contents);

        return response.status(200).json(res);
    }
};

export default DisciplineController;