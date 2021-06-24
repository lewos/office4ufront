import React, { Component } from 'react';


class LateralNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    Post = () => {
        this.props.history.push({
            pathname: '/publicar',
        })
    }
    Published = () => {
        this.props.history.push({
            pathname: '/publicados',
        })
    }
    Favorites = () => {
        this.props.history.push({
            pathname: '/favoritos',
        })
    }
    Bookings = () => {
        this.props.history.push({
            pathname: '/reservas',
        })
    }
    render() {
        return (
            <div>
                <div className="bg-light" id="sidebar-wrapper">
                    <div className="list-group list-group-flush mt-2">
                        <button 
                            type="button"
                            className="list-group-item list-group-item-action bg-light item-menu my-account mt-3 mb-3"
                            name="myAccount"
                            disabled>
                            <i className="material-icons align-middle me-2">view_headline</i>Mi cuenta
                        </button>
                        <button 
                            type="button"
                            className="list-group-item list-group-item-action bg-light item-menu dropdown-toggle"
                            name="Publications"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsePxublications"
                            aria-controls="collapsePxublications" 
                            aria-expanded="false">
                            <i className="material-icons align-middle me-2">local_offer</i><span className="me-2">Publicaciones</span>
                        </button>
                        <div className="collapse" id="collapsePxublications">
                            <button 
                                type="button" 
                                className="list-group-item list-group-item-action bg-light item-menu btn-collapse"
                                name="Post"
                                onClick={this.Post}>
                                <span className="ms-4">Publicar</span>
                            </button>
                            <button 
                                type="button" 
                                className="list-group-item list-group-item-action bg-light item-menu btn-collapse"
                                name="Published"
                                onClick={this.Published}>
                                <span className="ms-4">Publicados</span>
                            </button>
                        </div>

                        <button 
                            type="button"
                            className="list-group-item list-group-item-action bg-light item-menu dropdown-toggle"
                            name="Rental"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseRent"
                            aria-controls="collapseRent" 
                            aria-expanded="false">
                            <i className="material-icons align-middle me-2">storefront</i><span className="me-2">Alquiler</span>
                        </button>
                        <div className="collapse" id="collapseRent">
                            <button 
                                type="button" 
                                className="list-group-item list-group-item-action bg-light item-menu btn-collapse"
                                name="Rented"
                                onClick={this.Bookings}>
                                <span className="ms-4">Reservas</span>
                            </button>
                            <button 
                                type="button" 
                                className="list-group-item list-group-item-action bg-light item-menu btn-collapse"
                                name="Rent"
                                onClick={this.Favorites}>
                                <span className="ms-4">Favoritos</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* <button 
                    type="button"
                    className="list-group-item list-group-item-action item-menu align-bottom btn-config"
                    name="Rental"
                    disabled>
                    <i className="material-icons align-middle me-2">settings</i><span className="me-2">Configuración</span>
                </button> */}
            </div>
        )
    }
}

export default LateralNav;