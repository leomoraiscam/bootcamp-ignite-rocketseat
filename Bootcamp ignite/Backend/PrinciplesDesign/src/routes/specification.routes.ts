import { Router } from 'express';

import SpeficationRepository from '../modules/cars/repositories/SpecificationRepository';
import CreateSpecificationService from '../modules/cars/services/CreateSpeficationService';

const specificationRepository = new SpeficationRepository();
const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createSpecification = new CreateSpecificationService(
    specificationRepository
  );

  createSpecification.execute({
    name,
    description,
  });

  return response.status(201).send();
});

export default specificationRoutes;
