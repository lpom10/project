
// extraer todas las funcionalidades de express
import express, { Application, Request, Response } from 'express'; // agarra todo
// extraer todas las funcionalidades de cors
import cors from 'cors';
// extraer todas las funcionalidades de env para variables globales
import dotenv from 'dotenv';



dotenv.config(); // inicializar dotenv

const PORT = process.env.PORT || 3000; // puerto de la aplicacion
const app: Application = express(); // inicializar express



// MIDDLEWARES
app.use(cors()); // habilitar cors permite, darle seguridad a mi aplicacion, origenclose cruzado, 
// impide q alguien q no tenga acceso pueda acceder a la informaicon

app.use(express.json()); // permite que mi aplicacion entienda las peticiones y respuestas y formatos json


// rutas
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'El servidor esta funcionando correctamente'
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})


