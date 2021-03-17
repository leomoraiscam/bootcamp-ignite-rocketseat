import Category from '../model/Category';

interface ICreateRepository {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(data: ICreateRepository): void;
}

export default ICategoriesRepository;
