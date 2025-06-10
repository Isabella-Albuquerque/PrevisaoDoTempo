import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';

const app = express();
const PORTA = process.env.PORT || 3000;

// configura o servidor para aceitar JSON nas requisições
app.use(express.json());

// define uma rota gET no servidor para retornar a previsão do tempo baseada na cidade informada
app.get('/api/previsao', async (req, res) => {
  const { cidade } = req.query;

  // verifica se o parâmetro 'cidade' foi enviado, retornando erro caso esteja ausente
  if (!cidade) {
    return res.status(400).json({ erro: 'É necessário digitar o nome da cidade no campo indicado' });
  }

  try {
    // faz uma requisição à API do OpenWeather para obter a previsão do tempo
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: cidade,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'pt_br',
      },
    });

    // transforma os dados recebidos da API em um formato simplificado contendo informações relevantes. tá em ingles pq sao as variaveis da API
    const previsoes = data.list.map(previsao => ({
      temp_min: previsao.main.temp_min,
      temp_max: previsao.main.temp_max,
      umidade: previsao.main.humidity,
      icone: previsao.weather[0].icon,
      descricao: previsao.weather[0].description,
    }));


    // retorna as previsões no formato JSON
    res.json(previsoes);
  } catch (erro) {
    // exibe um erro no console caso a busca na API falhe e retorna um erro 500 para o cliente. precisei fazer isso para debugar mas acho que pode manter
    console.error('Erro no backend:', erro.response?.data || erro.message || erro);
    res.status(500).json({ erro: 'Erro ao buscar dados da previsão do tempo.' });
  }
});

// inicia o servidor e exibe no console uma mensagem indicando a porta em que está rodando
app.listen(PORTA, () => {
  console.log(`inde.js rodando na porta: ${PORTA}`);
});
