import React from 'react'
import { Card } from 'primereact/card'
import striptags from 'striptags'
import 'primeflex/primeflex.css'
import { Accordion, AccordionTab } from 'primereact/accordion'
import 'primeicons/primeicons.css'
import { Skeleton } from 'primereact/skeleton'

const gruposPorData = (resultados) => {
    const agrupados = {}

    resultados.forEach(resultado => {
        const data = new Date(resultado.dt).toLocaleDateString('pt-BR')
        if (!agrupados[data]) {
            agrupados[data] = []
        }
        agrupados[data].push(resultado)
    })

    return agrupados
}

const Exibicao = ({ resultados, carregando }) => {
    const grupos = gruposPorData(resultados)

    if (carregando) {
        return (
            <div className="p-4">
                <h2 className="flex align-items-center justify-content-center text-xl font-bold">Carregando...</h2>
                <div className="grid">
                    <div className="col-12">
                        <Card>
                            <Skeleton width="100%" height="13rem" className='mb-2'/>
                            <Skeleton width="100%" height="2rem" className="mb-2" />
                            <Skeleton width="100%" height="2rem" className="mb-2" />
                            <Skeleton width="100%" height="2rem"className="mb-2" />
                            <Skeleton width="100%" height="2rem" className="mb-2" />
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-column gap-4'>
            {!carregando && resultados.length > 0 && (
                <h2 className='flex align-items-center justify-content-center text-xl font-bold mb-0'>Resultados da busca:</h2>
            )}
            <Accordion activeIndex={0}>
                {Object.entries(grupos).map(([data, previsoes]) => (
                    <AccordionTab key={data}
                        header={
                            <div className='flex align-items-center justify-content-center'>
                                <i className='pi pi-calendar mr-3'></i>
                                <span className='font-bold'>Previsões para o dia {data}</span>
                            </div>
                        }
                    >
                        <div className='grid'>
                            {previsoes.map((resultado, indice) => (
                                <div className='col-12 md:col-6 lg:col-4 p-5' key={indice}>
                                    <Card style={{ backgroundColor: '#cfc3f7' }}>
                                        <div className='flex align-items-center'>
                                            <img src={`http://openweathermap.org/img/wn/${(striptags(resultado.icone))}@2x.png`}/>
                                            <h3>{`Previsão ${(striptags(new Date(resultado.dt).toLocaleString('pt-BR')))}`}</h3>
                                        </div>
                                        <div className='text-center'>
                                            <p>Temperatura Mínima: {resultado.temp_min}°C</p>
                                            <p>Temperatura Máxima: {resultado.temp_max}°C</p>
                                            <p>Umidade: {resultado.umidade}%</p>
                                            <p>Descrição: {(striptags(resultado.descricao))}</p>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    )
}

export default Exibicao