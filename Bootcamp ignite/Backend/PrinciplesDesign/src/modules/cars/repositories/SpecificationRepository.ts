import Specification from '../models/Specification';
import ISpecificationRepository from './ISpecificationRepository';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  findByName(name: string): Specification {
    const specificationAlredyExist = this.specifications.find(
      (specification) => specification.name === name
    );

    return specificationAlredyExist;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
}

export default SpecificationsRepository;
