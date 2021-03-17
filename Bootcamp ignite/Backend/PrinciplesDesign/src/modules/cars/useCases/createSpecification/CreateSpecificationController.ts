import CreateSpecificationUseCase from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request, response): Response {
    const { name, description } = request.body;

    this.createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}

export default CreateSpecificationController;
