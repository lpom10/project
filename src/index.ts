import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import productoRoutes from './routes/producto.routes.js';
import './models/producto.model.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/productos', productoRoutes);

async function startServer() {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(` Servidor en http://localhost:${env.PORT}`);
  });
}

startServer();