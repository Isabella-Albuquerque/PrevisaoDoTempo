import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Exibicao from './Exibicao'

const Busca = () => {
  const [cidade, setCidade] = useState('São Paulo')
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const buscar = async () => {
      try {
        setCarregando(true)
        const { data } = await axios.get('/api/previsao', {
          params: { cidade }
        })

        console.log('Resultados da Previsão do Tempo:')
        data.forEach((previsao, index) => {
          console.log(`Previsão ${index + 1}:`)
          console.log(`- Temperatura Mínima: ${previsao.temp_min}°C`)
          console.log(`- Temperatura Máxima: ${previsao.temp_max}°C`)
          console.log(`- Umidade: ${previsao.umidade}%`)
          console.log(`- Ícone: ${previsao.icone}`)
          console.log(`- Descrição: ${previsao.descricao}`)
          console.log('----------------------------------------')
        })
        setResultados(data)
      } catch (error) {
        console.error('Ocorreu um erro ao buscar a previsão:', error)
      } finally {
        setCarregando(false)
      }
    }
    if (cidade.length < 3) {
      setResultados([])
      return
    }
    else {
      const timeoutID = setTimeout(() => {
        if (cidade)
          buscar()
      }, 2000)
      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [cidade])

  return (
    <div className="p-4">
      <div>
        <h1 className="text-4xl text-center font-bold">Previsão do Tempo</h1>
        <p className="text-center">Digite o nome de uma cidade para obter as informações climáticas dos próximos 5 dias:</p>
        <div className='flex justify-content-center'>
          <input
            type="text"
            id="CampoBusca"
            placeholder="Digite o nome da cidade com pelo menos 3 caracteres"
            onChange={(e) => { setCidade(e.target.value) }}
            value={cidade}
            style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 8, fontSize: '1rem', width: '40%', borderRadius: 6 }} />
        </div>
      </div>
      <div>
        <Exibicao resultados={resultados}  carregando={carregando} />
      </div>
    </div>
  )
}

export default Busca