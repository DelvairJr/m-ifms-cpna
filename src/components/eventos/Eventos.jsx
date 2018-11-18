import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import InputField from '../template/InputField'
import Main from '../template/Main'
import Card from '../template/Card'

import If from '../operators/If'
import consts from '../../assets/consts'


const headerProps = {
    icon: 'flag-o',
    title: 'Eventos'
}

const baseUrl = consts.API_URL

export default class Eventos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventos: [],
            noData: false
        }
    }

    componentDidMount = () => {
        axios.get(`${baseUrl}/m-eventos`)
            .then(resp => {
                this.setState({ eventos: resp.data })
                this.saveLocaStorage(resp.data)
            }).catch(error => {
                console.error("Error: " + error)
                this.readLocalStorage()
            })
    }

    saveLocaStorage(eventos) {
        var jsonAux = JSON.stringify(eventos);
        window.localStorage.setItem('eventos', jsonAux);
    }

    readLocalStorage() {
        var jsonData = window.localStorage.getItem('eventos');
        var data = JSON.parse(jsonData);

        if (data) {
            this.setState({
                eventos: data
            })
        } else {
            this.setState({
                noData: true
            })
        }

    }

    renderCards(key, e) {
        return (

            <Card border='success' key={key}>
                <h5 className="card-title"> <i className={`fa fa-${headerProps.icon}`} /> {e.nome}</h5>
                <p className="card-text"> <i className="fa fa-calendar-o" /> {e.data}</p>
                <If test={e.descricao}>
                    <p className="card-text">
                        <i className="fa fa-external-link" /><a href={e.descricao}> Página do Evento</a>
                    </p>
                </If>

            </Card>

        )
    }

    handleSearch = () => {
        this.setState({
            search: this.search.value
        })
    }

    render() {
        if (this.state.noData) {
            return <Redirect to='/404' />
        }

        return (
            <Main >
                <h5>
                    <i className={`fa fa-${headerProps.icon}`}></i>
                    <strong> {headerProps.title}</strong>
                </h5>


                <div class="form-group">

                    <InputField
                        refValue={node => this.search = node}
                        idValue='search'
                        typeValue='text'
                        requiredValue={true}
                        textLabel='Buscar'
                        textPlaceholder='Digite o nome do evento...'
                        keyUp={this.handleSearch} />
                </div>
                <hr />
                {Object
                    .keys(this.state.eventos)
                    .map(key => {
                        if (this.state.eventos[key].nome.toUpperCase()
                            .includes(this.search.value.toUpperCase())) {
                            return this.renderCards(key, this.state.eventos[key])
                        }
                    })}
                <hr />
            </Main>
        )
    }
}
