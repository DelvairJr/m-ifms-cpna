import './Nav.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {

    render() {
        return (
            <aside className="menu-area" >


                <nav className="dropdown">
                    <button className="dropbtn" id="btMenu">&#9776;</button>
                    <div className="dropdown-content">

                        <Link to="/"><i className="fa fa-home"></i> Home</Link>

                        <Link to="/provas"><i className="fa fa-calendar-o"></i> Calendário de Provas</Link>

                        <Link to="/contatos"><i className="fa fa-users"></i> Contatos</Link>

                        <Link to="/cursos"><i className="fa fa-mortar-board"></i> Cusros</Link>

                        <Link to="/editais"><i className="fa fa-file-o"></i> Editais</Link>

                        <Link to="/eventos"><i className="fa fa-flag-o"></i > Eventos</Link>

                        <Link to="/permanencia"><i className="fa fa-calendar"></i> Horario de PE</Link>

                        <Link to="/professores"><i className="fa fa-id-card-o"></i> Professores</Link>

                        <Link to="/regulamentos"><i className="fa fa-file-text-o"></i> Regulamentos</Link>

                    </div>
                </nav>
            </aside>
        )
    }



}