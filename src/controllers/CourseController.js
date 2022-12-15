import Course from "../models/course.js";

class CourseController {

    async createCourse(request, response) {
        const { title, description, image } = request.body;

        let course;

        try {
            course = await Course.create({
                title,
                description,
                image,
                active: true
            });
        } catch (err) {
            throw new Error("Não foi possível criar o curso: " + err);
        }

        return response.status(201).json({ course });
    }
}

export default CourseController;