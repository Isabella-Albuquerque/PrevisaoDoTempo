import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/previsao', async (req, res) => {
  const { cidade } = req.query;

  if (!cidade) {
    return res.status(400).json({ erro: 'É necessário digitar o nome da cidade no campo indicado' });
  }

  try {
      const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: cidade,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    });

      const previsoes = data.list.map(previsao => ({
      dt: previsao.dt_txt,
      temp_min: previsao.main.temp_min,
      temp_max: previsao.main.temp_max,
      umidade: previsao.main.humidity,
      icone: previsao.weather[0].icon,
      descricao: previsao.weather[0].description,
    }));


    res.json(previsoes);
  } catch (erro) {
    console.error('Erro no backend:', erro.response?.data || erro.message || erro);
    res.status(500).json({ erro: 'Erro ao buscar dados da previsão do tempo.' });
  }
});

app.listen(PORTA, () => {
  console.log(`inde.js rodando na porta: ${PORTA}`);
});
