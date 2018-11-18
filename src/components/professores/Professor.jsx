import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

import Main from '../template/Main'
import Card from '../template/Card'

import consts from '../../assets/consts'

const headerProps = {
    icon: 'calendar',
    title: 'Horário de Permanência'
}


const baseUrl = consts.API_URL

export default class Professor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            professor: [],
            hrPermanecia: [],
            noData: false
        }
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            axios.get(`${baseUrl}/m-professor/${this.props.match.params.id}`)
                .then(resp => {
                    this.setState({ professor: resp.data })
                    this.saveLocaStorage(this.props.match.params.id, resp.data)
                }).catch(error => {
                    console.error("Error: " + error)

                    this.readLocalStorage(this.props.match.params.id)
                })
        }

        axios.get(`${baseUrl}/m-horario-de-permanencia`)
            .then(resp => {
                this.setState({ hrPermanecia: resp.data })
                this.saveLocaStorage('hp', resp.data)
            }).catch(error => {
                console.error("Error: " + error)

                this.readLocalStorage('hp')
            })
    }

    saveLocaStorage(id, data) {
        var jsonAux = JSON.stringify(data);
        // "Seta" este json no localStorage
        window.localStorage.setItem(id, jsonAux);
    }

    readLocalStorage(id) {
        // Recupera o json do localStorage
        var jsonData = window.localStorage.getItem(id)

        // Converte este json para objeto
        var data = JSON.parse(jsonData)

        if (data) {
            if (id === 'hp') {
                this.setState({
                    hrPermanecia: data
                })
            } else {
                this.setState({
                    professores: data
                })
            }
        } else {
            this.setState({
                noData: true
            })
        }


    }

    renderProfessores(key, hp) {
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
            return <Redirect to="/404" />
        }
        return (
            <Main>
                <h5>
                    <i className={`fa fa-${headerProps.icon}`}></i>
                    <strong> {headerProps.title}</strong>
                </h5>
                {Object
                    .keys(this.state.hrPermanecia)
                    .map(key => {
                        if (this.state.hrPermanecia[key].professor
                            .includes(this.state.professor.nome)) {
                            return this.renderProfessores(key, this.state.hrPermanecia[key])
                        }
                    })}

                <Link to="/professores" className='btn btn-success btn-sm'>Voltar</Link>
            </Main>
        )
    }
}
