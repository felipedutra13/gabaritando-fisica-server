import express from 'express';
import AuthController from './controllers/AuthController.js';
import CourseController from './controllers/CourseController.js';
import UserController from './controllers/UserController.js';
import DisciplineController from './controllers/DisciplineController.js';
import ContentController from './controllers/ContentController.js';
import ExerciceController from './controllers/ExerciceController.js';
import LessonController from './controllers/LessonController.js';
import MaterialController from './controllers/MaterialController.js';
import AnswerController from './controllers/AnswerController.js';
import UserAnswerController from './controllers/UserAnswerController.js';

const routes = express.Router();
const authController = new AuthController();
const courseController = new CourseController();
const userController = new UserController();
const disciplineController = new DisciplineController();
const contentController = new ContentController();
const exerciceController = new ExerciceController();
const lessonController = new LessonController();
const materialController = new MaterialController();
const answerController = new AnswerController();
const userAnswerController = new UserAnswerController();

routes.post('/signUp', authController.signUp);
routes.post('/signIn', authController.signIn);

// routes.get('/courses', authController.verifyJWT, courseController.getCoursesByUserId);
routes.get('/courses', authController.verifyJWT, userController.getCourses);


// ADMIN
routes.post('/createCourse', courseController.createCourse);

routes.post('/createDiscipline', disciplineController.createDiscipline);
routes.get('/getDisciplines', disciplineController.getDisciplines);
routes.get('/getDisciplinesWithContent', disciplineController.getDisciplinesWithContent);

routes.post('/createContent', contentController.createContent);
routes.get('/getContents', contentController.getContents);
routes.get('/getContent', authController.verifyJWT, contentController.getContent);

routes.post('/createExercice', exerciceController.createExercice);
routes.get('/getExercices', exerciceController.getExercices);

routes.post('/createLesson', lessonController.createLesson);
routes.get('/getLessons', lessonController.getLessons);

routes.post('/createMaterial', materialController.createMaterial);
routes.get('/getMaterials', materialController.getMaterials);

routes.post('/addCourse', userController.addCourse);
routes.get('/getUser', authController.verifyJWT, userController.getUser);
routes.post('/updateUser', authController.verifyJWT, userController.updateUser);

routes.get('/getAnswers', answerController.getAnswers);
routes.post('/setAnswer', answerController.setAnswer);

routes.post('/setUserAnswer', authController.verifyJWT, userAnswerController.setUserAnswer);
routes.get('/getUserAnswers', authController.verifyJWT, userAnswerController.getUserAnswers);

//////////////

export default routes;