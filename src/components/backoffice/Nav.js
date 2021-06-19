import React, { Component } from 'react';

// Logo del proyecto.
import LogoImg from '../../assets/img/Logo_White.png'
//import IconoUsuario from '../../assets/img/person.svg'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('nombre'),
        };
    }
    
    Post = () => {
        this.props.history.push({
            pathname: '/inicio',
        })
    }

    Main = () => {
        this.props.history.push({
            pathname: '/home',
        })
    }

    Logout = () => {
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("nombre");
        localStorage.removeItem("email");
        localStorage.removeItem("usuarioValido");
        localStorage.removeItem("favoritos");
        this.props.history.push({
            pathname: '/login',
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg cabecera">
                    <div className="container-fluid">
                        <button 
                            type="button" 
                            className="btn navbar-brand ms-3" 
                            onClick={this.Post}>
                                <img 
                                    src={LogoImg} 
                                    width="134" 
                                    height="32" 
                                    alt="Office4U"/>
                        </button>
                        <div>
                            <ul className="navbar-nav me-4">
                                <li>
                                    <button
                                        type="button"
                                        className="btn btn-primary cabeceraBack-btn me-5"
                                        onClick={this.Main}>
                                        <span className="me-2">Inicio</span>
                                        <i className="material-icons align-middle">store</i>
                                    </button>
                                </li>
                                <li className="nav-item dropdown">
                                    <button
                                        type="button"
                                        className="btn btn-primary dropdown-toggle cabeceraBack-btn"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true" 
                                        aria-expanded="false">
                                        <span className="me-2">{this.state.user_name}</span>
                                        <i className="material-icons align-middle me-2">account_circle</i>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="user_header">
                                        <button 
                                            type="button" 
                                            className="dropdown-item btn btn-link item-menu p-1rem"
                                            disabled>
                                            <i className="material-icons align-middle me-2">manage_accounts</i><span className="item-nav">Mi Cuenta</span>
                                        </button>
                                        <button 
                                            type="button" 
                                            className="dropdown-item btn btn-link p-1rem"
                                            disabled>
                                            <i className="material-icons align-middle me-2">lock</i><span className="item-nav">Cambiar contraseña</span>
                                        </button>
                                        <div className="dropdown-divider"></div>
                                        <button 
                                            type="button" 
                                            className="dropdown-item btn btn-link p-1rem"
                                            disabled>
                                            <i className="material-icons align-middle me-2">help</i><span className="item-nav">Ayuda</span>
                                        </button>
                                        <button 
                                            type="button" 
                                            className="dropdown-item btn btn-link p-1rem"
                                            onClick={this.Logout}>
                                            <i className="material-icons align-middle me-2">logout</i><span className="item-nav">Cerrar sesi&oacute;n</span>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;