import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            estacao: null,
            data: null,
            icone: null
        }
    }

    obterEstacao = (data, latitude) => {
        const anoAtual = data.getFullYear()
        //new Date(ano, mês(0 a 11), dia (1 a 31))
        // 21/06
        const d1 = new Date(anoAtual, 5, 21)
        // 24/09
        const d2 = new Date(anoAtual, 8, 24)
        // 22/12
        const d3 = new Date(anoAtual, 11, 22)
        // 21/03
        const d4 = new Date(anoAtual, 2, 21)
        //hemisferio sul tem latitude negativa
        const sul = latitude < 0
        if (data >= d1 && data < d2)
            return sul ? 'Inverno' : 'Verão'
        if (data >= d2 && data < d3)
            return sul ? 'Primavera' : 'Outono'
        if (data >= d3 || data < d1)
            return sul ? 'Verão' : 'Inverno'
        
        return sul ? 'Outono' : 'Primavera'
    }

    icones = {
        'Primavera': 'fa-seedling',
        'Verão': 'fa-umbrella-beach',
        'Outono': 'fa-tree',
        'Inverno': 'fa-snowman'
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (posicao) => {
                let data = new Date()
                let estacao = this.obterEstacao(data, posicao.coords.latitude)
                let icone = this.icones[estacao]
                console.log(icone)
                this.setState(
                    {
                        latitude: posicao.coords.latitude,
                        longitude: posicao.coords.longitude,
                        estacao: estacao,
                        data: data.toLocaleTimeString(),
                        icone: icone
                    }
                )
            }
        )
    }

    render(){
        return(
        <div>
        <div className='container mt-2'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='d-flex align-items-center border rounded mb-2' style={{height:'6rem'}}>
                            <i className={`fas fa-5x ${this.state.icone}`}></i>
                            <p className='w-75 ms-3 text center fs-1'>{this.state.estacao}</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-center'>
                                {
                                    this.state.latitude ?
                                    `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}`
                                    :
                                    'Clique no botão para saber sua estação climática'
                                }
                            </p>
                        </div>
                        <button onClick={this.obterLocalizacao}
                                className='btn btn-outline-primary w-100 mt-2'>
                                Qual minha estação?
                                </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)