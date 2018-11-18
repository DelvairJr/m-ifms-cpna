import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

import Main from '../template/Main'
import Card from '../template/Card'
import consts from '../../assets/consts'

const headerProps = {
    icon: 'folder-o',
    title: ''
}

const baseUrl = consts.API_URL

export default class Regulamento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lsReg: [],
            noData: false
        }
    }


    componentWillMount() {
        if (this.props.match.params.id) {
            axios.get(`${baseUrl}/m-regulamentos/${this.props.match.params.id}`)
                .then(resp => {
                    this.setState({ lsReg: resp.data })
                    this.saveLocaStorage(resp.data)
                }).catch(error => {
                    console.error("Error: " + error);
                    this.readLocalStorage()
                })
        }
    }

    saveLocaStorage(lsReg) {
        var jsonAux = JSON.stringify(lsReg);
        window.localStorage.setItem(this.props.match.params.id, jsonAux);
    }

    readLocalStorage() {
        var jsonData = window.localStorage.getItem(this.props.match.params.id);
        var data = JSON.parse(jsonData);

        if (data) {
            this.setState({
                lsReg: data
            })
        } else {
            this.setState({
                noData: true
            })
        }
    }

    renderArquivos(arquivos) {
        const ls = arquivos || []

        return ls.map((arq, key) => (
            <li key={key}><i className="fa fa-file-text-o" /> <a href={arq.link}>{arq.titulo}</a></li>
        ))
    }

    renderCards() {

        const ls = this.state.lsReg

        return (

            <Card border='primary' key={ls._id}>

                <div classNames="card-body">
                    <ul>
                        {this.renderArquivos(ls.arquivos)}
                    </ul>
                </div>

            </Card>
        )


    }

    render() {
        if (this.state.noData) {
            return <Redirect to='/404' />
        }
        headerProps.title = this.state.lsReg.categoria
        return (
            <Main >
                <h5>
                    <i className={`fa fa-${headerProps.icon}`}></i>
                    <strong> {headerProps.title}</strong>
                </h5>

                <hr />

                {this.renderCards()}

                <Link to="/regulamentos" className='btn btn-success btn-sm'>Voltar</Link>
            </Main>
        )
    }
}
