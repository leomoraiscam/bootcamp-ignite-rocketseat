import { Router } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.status(200).json(categories);
});

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const categoryAlredyExist = categoriesRepository.findByName(name);

  if (categoryAlredyExist) {
    return response.status(400).json({ error: 'Category alredy exist' });
  }

  categoriesRepository.create({
    name,
    description,
  });

  return response.status(201).send();
});

export default categoriesRoutes;
