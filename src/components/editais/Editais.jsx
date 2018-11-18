import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import InputField from '../template/InputField'
import Main from '../template/Main'
import Card from '../template/Card'

import consts from '../../assets/consts'

const headerProps = {
    icon: 'file-o',
    title: 'Editais'
}

const baseUrl = consts.API_URL

export default class Editais extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editais: [],
            noData: false
        }
    }

    componentWillMount() {
        axios.get(`${baseUrl}/m-editais`)
            .then(resp => {
                this.setState({ editais: resp.data })
                this.saveLocaStorage(resp.data)
            }).catch(error => {
                console.error("Error: " + error)
                this.readLocalStorage()
            })
    }

    saveLocaStorage(editais) {
        var jsonAux = JSON.stringify(editais);
        window.localStorage.setItem('editais', jsonAux);
    }

    readLocalStorage() {
        var jsonData = window.localStorage.getItem('editais');

        var data = JSON.parse(jsonData);

        if (data) {
            this.setState({
                editais: data
            })
        } else {
            this.setState({
                noData: true
            })
        }
    }

    renderArquivos(arq) {
        return arq.map((a, cont) => (
            <p className="card-text">
                <i className="fa fa-file-pdf-o" /> <a href={a}>{`Arquivo #${cont + 1}`}</a>
            </p>
        ))
    }

    renderCards(key, e) {
        return (
            <Card key={key} border='success'>
                <h5 className="card-title"> <i className={`fa fa-${headerProps.icon}`} /> {e.titulo}</h5>

                {this.renderArquivos(e.arquivos)}

                <p className="card-text">
                    <i className="fa fa-external-link" /><a href={e.informacoes}>Mais informações...</a>
                </p>
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
                        textPlaceholder='Digite o nome do edital...'
                        keyUp={this.handleSearch} />
                </div>
                <hr />
                {Object
                    .keys(this.state.editais)
                    .map(key => {
                        if (this.state.editais[key].titulo.toUpperCase()
                            .includes(this.search.value.toUpperCase())) {
                            return this.renderCards(key, this.state.editais[key])
                        }
                    })}
            </Main>
        )
    }
}
