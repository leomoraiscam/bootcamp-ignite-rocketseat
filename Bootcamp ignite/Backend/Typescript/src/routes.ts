import express from 'express';
import CreateCourseService from './CreatecourseService';

const routes = express.Router();

routes.get('/course', (request, response) => {
  CreateCourseService.execute({
    name: "NodeJs", 
    duration: 10,
    educator: "Leonardo" 
  });

  CreateCourseService.execute({
    name: "NodeJs", 
    educator: "Leonardo" 
  });
});

export default routes;