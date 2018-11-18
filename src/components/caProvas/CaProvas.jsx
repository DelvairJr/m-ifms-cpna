import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import Main from '../template/Main'
import Card from '../template/Card'
import consts from '../../assets/consts'

import InputField from '../template/InputField'

const headerProps = {
    icon: 'calendar-o',
    title: 'Calendário de Provas'
}

const baseUrl = consts.API_URL

export default class CaProvas extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            provas: [],
            noData: false
        }

    }

    componentWillMount() {
        axios.get(`${baseUrl}/m-provas`)
            .then(resp => {
                this.setState({ provas: resp.data })
                this.saveLocaStorage(resp.data)
            }).catch(error => {
                console.log(error);
                this.readLocalStorage()
            })
    }

    saveLocaStorage(provas) {
        var jsonAux = JSON.stringify(provas);
        window.localStorage.setItem('provas', jsonAux);
    }

    readLocalStorage() {
        var jsonData = window.localStorage.getItem('provas')

        var data = JSON.parse(jsonData);
        if (data) {
            this.setState({
                provas: data
            })
        } else {
            this.setState({
                noData: true
            })
        }
    }

    renderCards(key, p) {
        return (
            <Card key={key} border='success'>
                <h5 className="card-title"> <i className="fa fa-mortar-board" /> {p.curso} - {p.semestre}</h5>
                <p className="card-text"> <i className="fa fa-calendar-o" /> {p.dataProva}</p>
                <p className="card-text"> <i className="fa fa-book" /> {p.disciplina}</p>

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

                <div className="form-group">
                    <InputField
                        refValue={node => this.search = node}
                        idValue='search'
                        typeValue='text'
                        requiredValue={true}
                        textLabel='Buscar'
                        textPlaceholder='Digite o nome do curso...'
                        keyUp={this.handleSearch} />
                </div>
                <hr />
                {Object
                    .keys(this.state.provas)
                    .map(key => {
                        if (this.state.provas[key].curso.toUpperCase()
                            .includes(this.search.value.toUpperCase())) {
                            return this.renderCards(key, this.state.provas[key])
                        }
                    })}
            </Main>
        )
    }
}
