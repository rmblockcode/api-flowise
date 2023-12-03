import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/api/lead', (req: Request, res: Response) => {
  const { firstName, lastName} = req.body;
  const fullName = `${firstName} ${lastName}`
  console.log(`Nombre completo: ${fullName}`);
  // Logica para almacenar esa informacion donde necesite
  res.json({ fullName });
});

app.post('/api/get-simple-price', async (req: Request, res: Response) => {
  try {
    // Obtener parámetros del query string
    const {ids, vsCurrencies} = req.body;

    console.log('ids: ', ids)

    // Validar la presencia de parámetros requeridos
    if (!ids || !vsCurrencies) {
      return res.status(400).json({ error: 'Los parámetros "ids" y "vs_currencies" son obligatorios.' });
    }

    // Construir la URL del servicio externo
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

    // Hacer la solicitud GET al servicio externo
    const response = await axios.get(apiUrl);

    // Enviar la respuesta del servicio externo como respuesta de este servicio
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
