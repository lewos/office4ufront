import React, { Component } from 'react';

// Logo del proyecto.
import LogoImg from '../../assets/img/Logo_Black.png'
//import IconoUsuario from '../../assets/img/person.svg'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('nombre'),
        }
    }
    Main = () => {
        this.props.history.push({
            pathname: '/home',
        })
    }

    Login = () => {
        this.props.history.push({
            pathname: '/login',
        })
    }

    Logout = () => {
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("nombre");
        localStorage.removeItem("email");
        localStorage.removeItem("usuarioValido");
        localStorage.removeItem("favoritos");
        window.location.reload(false);
    }

    Post = () => {
        this.props.history.push({
            pathname: '/publicar',
        })
    }

    Backoffice = () => {
        this.props.history.push({
            pathname: '/inicio',
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button 
                            type="button" 
                            className="btn navbar-brand" 
                            onClick={this.Main}>
                                <img 
                                    src={LogoImg} 
                                    width="134" 
                                    height="32" 
                                    alt="Office4U"/>
                        </button>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/home#categoryView">Categorías</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#weView">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#rentMyOfficeView">Quiero alquilar mi oficina</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#offersView" >Ofertas</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="col col-sm-12 col-md-2 col-lg-2 text-end">
                            { !this.state.user_name ? ( 
                                <button
                                    type="button"
                                    className="btn btn-primary cabecera-btn"
                                    onClick={this.Login}>
                                    <span className="me-2">Guardado</span>
                                    <i className="material-icons align-middle">favorite_border</i>
                                </button>
                                ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary cabecera-btn"
                                    onClick={this.Backoffice}>
                                    <span className="me-2">Guardado</span>
                                    <i className="material-icons align-middle">favorite_border</i>
                                </button>
                                ) 
                            }
                        </div>
                        <div className="col col-sm-12 col-md-2 col-lg-2 text-end">
                            { !this.state.user_name ? ( 
                                <button
                                    type="button"
                                    className="btn btn-primary cabecera-btn"
                                    onClick={this.Login}>
                                    <span className="me-2">Iniciar sesión</span>
                                    <i className="material-icons align-middle">account_circle</i>
                                </button>    
                                ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary cabecera-btn"
                                    onClick={this.Post}>
                                    <span className="me-2">Publicá tu oficina</span>
                                    <i className="material-icons align-middle">local_offer</i>
                                </button>    
                                ) 
                            }
                        </div>
                        { this.state.user_name ? (
                            <div className="col col-sm-12 col-md-1 col-lg-1 text-end">
                                <button
                                    type="button"
                                    className="btn btn-primary cabecera-btn"
                                    onClick={this.Logout}>
                                    <span className="me-2">Salir</span>
                                    <i className="material-icons align-middle">logout</i>
                                </button>
                            </div>
                            ) : (
                            null    
                            ) 
                        }
                    </div>

                </nav>
            </div>
        )
    }
}

export default Nav;