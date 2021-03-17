import { Router } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoriesService from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.status(200).json(categories);
});

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoriesService = new CreateCategoriesService(
    categoriesRepository
  );

  createCategoriesService.execute({
    name,
    description,
  });

  return response.status(201).send();
});

export default categoriesRoutes;
