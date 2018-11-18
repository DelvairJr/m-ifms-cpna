import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

import Main from '../template/Main'
import Card from '../template/Card'
import consts from '../../assets/consts'

import InputField from '../template/InputField'

const headerProps = {
    icon: 'id-card-o',
    title: 'Professores'
}

const baseUrl = consts.API_URL

export default class Professores extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            professores: [],
            noData: false
        }

    }

    componentDidMount = () => {
        axios.get(`${baseUrl}/m-professor`)
            .then(resp => {
                this.setState({ professores: resp.data })
                this.saveLocaStorage(resp.data)
            }).catch(error => {
                console.error("Error: " + error);
                this.readLocalStorage()
            })
    }

    saveLocaStorage(professores) {
        var jsonAux = JSON.stringify(professores);
        // "Seta" este json no localStorage
        window.localStorage.setItem('professores', jsonAux);
    }

    readLocalStorage() {
        // Recupera o json do localStorage
        var jsonData = window.localStorage.getItem('professores');

        // Converte este json para objeto
        var data = JSON.parse(jsonData);

        if (data) {
            this.setState({
                professores: data
            })
        } else {
            this.setState({
                noData: true
            })
        }


    }


    renderCards(key, prof) {
        return (
            <Card key={key} border='success'>
                <Link to={`/professores/${prof._id}`} className="link-none">
                    <div class="card-body">
                        <h5 class="card-title"> <i className="fa fa-id-card-o" /> {prof.nome}</h5>
                        <p class="card-text"> <i className="fa fa-envelope" /> {prof.email}</p>

                    </div>
                </Link>
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
            return <Redirect to="/404" />
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
                        textPlaceholder='Digite o nome do professor...'
                        keyUp={this.handleSearch} />
                </div>
                <hr />
                {Object
                    .keys(this.state.professores)
                    .map(key => {
                        if (this.state.professores[key].nome.toUpperCase()
                            .includes(this.search.value.toUpperCase())) {
                            return this.renderCards(key, this.state.professores[key])
                        }
                    })}
            </Main>
        )
    }
}
