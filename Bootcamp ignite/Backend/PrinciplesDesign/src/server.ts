import express from 'express';

import categoriesRoutes from './routes/categories.routes';
import speficationRoutes from './routes/specification.routes';

const app = express();

app.use(express.json());
app.use('/categories', categoriesRoutes);
app.use('/specifications', speficationRoutes);

app.listen(3333, () => {
  console.log('🚀 Server is running');
});
