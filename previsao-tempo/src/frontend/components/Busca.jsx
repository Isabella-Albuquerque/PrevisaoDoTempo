import React, { useState } from 'react';
import axios from 'axios';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

//componente busca, aqui deve ficar a lógica do input de dados. Depois precisa estilizar com ua classe .css

// define um estado chamado 'cidade' e sua função de atualização, iniciando como uma string vazia
const Busca = () => {
  const [cidade, setCidade] = useState(''); 
  
  // função que realiza a busca da previsão do tempo na API quando chamada
  const buscar = async () => {
    try {
  // faz uma requisição para a rota '/api/previsao', passando o nome da cidade como parâmetro
      const { data } = await axios.get('/api/previsao', {
        params: { cidade },
      });

      // exibe no console um título para os resultados da previsão do tempo
      console.log('Resultados da Previsão do Tempo:');
      // exibe cada previsão de forma formatada no console
      data.forEach((previsao, index) => { //isso aqui fiz só pra exibir bonito no console, depois podemos apagar
        console.log(`Previsão ${index + 1}:`); // soma 1 
        console.log(`- Temperatura Mínima: ${previsao.temp_min} graus Celsius`);
        console.log(`- Temperatura Máxima: ${previsao.temp_max} graus Celsius`);
        console.log(`- Umidade: ${previsao.umidade}%`);
        console.log(`- Descrição: ${previsao.descricao}`);
        console.log('----------------------------------------');
      });
    } catch (error) {
      console.error('Ocorreu um erro ao buscar a previsão:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Previsão do Tempo</h1>
      <p className="mb-4">Digite o nome de uma cidade para obter as informações climáticas mais recentes:</p>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          placeholder="Nome da Cidade" //aqui precisaremos mudar pra deixar dafault São Paulo
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
      </IconField>
      <Button label="Buscar" className="ml-2" onClick={buscar} />
    </div>
  );
};

export default Busca;
