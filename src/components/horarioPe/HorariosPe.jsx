import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import InputField from '../template/InputField'
import Main from '../template/Main'
import Card from '../template/Card'
import consts from '../../assets/consts'

const headerProps = {
    icon: 'calendar',
    title: 'Horário de Permanência'
}

const baseUrl = consts.API_URL

export default class HorariosPe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            horarios: [],
            noData: false
        }
    }

    componentWillMount() {
        axios.get(`${baseUrl}/m-horario-de-permanencia`)
            .then(resp => {
                this.setState({ horarios: resp.data })
                this.saveLocaStorage(resp.data)
            }).catch(error => {
                console.error("Error: " + error)
                this.readLocalStorage()
            })
    }

    saveLocaStorage(horarios) {
        var jsonAux = JSON.stringify(horarios);
        window.localStorage.setItem('horarios', jsonAux);
    }

    readLocalStorage() {
        var jsonData = window.localStorage.getItem('horarios');

        var data = JSON.parse(jsonData);

        if (data) {
            this.setState({
                horarios: data
            })
        } else {
            this.setState({
                noData: true
            })
        }
    }

    handleSearch = () => {
        this.setState({
            search: this.search.value
        })
    }

    renderCards(key, hp) {
        return (
            <Card border='success' key={hp._id}>

                <h5 className="card-title">
                    <i className="fa fa-id-card-o"></i> {hp.professor}
                </h5>
                <h6 className=" mb-2 text-muted">
                    <i className="fa fa-calendar-o"></i> {hp.dia_semana}
                </h6>
                <p className="card-subtitle">
                    <i className="fa fa-building-o"></i> {hp.local}
                </p>
                <p className="card-text">
                    <i className="fa fa-clock-o"></i> {`${hp.hrs_inicio} - ${hp.hrs_final}`}
                </p>

            </Card>
        )
    }

    render() {
        if (this.state.noData) {
            return <Redirect to='/404' />
        }
        return (
            <Main>
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
                        textPlaceholder='Digite o nome do professor...'
                        keyUp={this.handleSearch} />
                </div>
                <hr />
                {Object
                    .keys(this.state.horarios)
                    .map(key => {
                        if (this.state.horarios[key].professor.toUpperCase()
                            .includes(this.search.value.toUpperCase())) {
                            return this.renderCards(key, this.state.horarios[key])
                        }
                    })}
            </Main >
        )
    }
}
