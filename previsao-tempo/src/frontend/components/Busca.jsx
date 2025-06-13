import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Busca = () => {
    const [cidade, setCidade] = useState('São Paulo')

    useEffect(() => {
      const buscar = async () => {
        try {
          const { data } = await axios.get('/api/previsao', {
            params: { cidade }
        })

          console.log('Resultados da Previsão do Tempo:')
          
          data.forEach((previsao, index) => { 
            console.log(`Previsão ${index + 1}:`)  
            console.log(`- Temperatura Mínima: ${previsao.temp_min} graus Celsius`)
            console.log(`- Temperatura Máxima: ${previsao.temp_max} graus Celsius`)
            console.log(`- Umidade: ${previsao.umidade}%`)
            console.log(`- Descrição: ${previsao.descricao}`)
            console.log('----------------------------------------')
          })
        } catch (error) {
          console.error('Ocorreu um erro ao buscar a previsão:', error)
        }
  }
  if(cidade.length < 3){
      return 
    }
    else{
      const timeoutID = setTimeout(() => {
        if(cidade)
          buscar()
      }, 2000)
      return () => {
        clearTimeout(timeoutID)
      }
    }
}, [cidade]) 

 return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Previsão do Tempo</h1>
      <p className="mb-4">Digite o nome de uma cidade para obter as informações climáticas dos próximos dias:</p>
      <input 
        type="text" 
        id="CampoBusca" 
        placeholder="Informe uma cidade" 
        onChange={(e) => {setCidade(e.target.value)}}
        value={cidade}
        style={{paddingTop: 8, paddingBottom: 8, width: '60%', borderRadius: 6}}/>
    </div>
  )
}

export default Busca
