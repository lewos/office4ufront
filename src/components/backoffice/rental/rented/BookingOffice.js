import React, { Component } from 'react';

//import Office1 from '../../../assets/img/office1.jpg'

// Importo llamada a endpoint
//import {DeleteFavourite as DeleteFavouriteAPI} from "../../../../controller/FavoritesController";

class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            office: this.props.booking,
            img: this.props.booking.imagenes[Math.floor(Math.random()*this.props.booking.imagenes.length)],
            cantServices: this.props.booking.servicios.length - 4,
        };
    }

    // deleteFavorites = async () => {
    //     // Ejecuto el endopoint para borrar el favorito seleccionado.
    //     let favourite_id = this.props.favorite.favorito

    //     this.setState({loading: true});

    //     let deleteFavouriteAPI = await DeleteFavouriteAPI(favourite_id);

    //     this.setState({loading: false});

    //     if(deleteFavouriteAPI.rdo === 0) {
    //         window.location.reload(false);
    //     } 
    // }

    render() {
        const office = this.state.office;
        //console.log(office)
        const dbDateSince = new Date(office.calendario_alquileres[0].desde);
        const dbDateUntil = new Date(office.calendario_alquileres[0].desde);
        let booked_from = new Intl.DateTimeFormat('en-GB').format(dbDateSince);
        let booked_until = new Intl.DateTimeFormat('en-GB').format(dbDateUntil);
        if(this.state.loading){
            return (
                <div className="card mt-4 card-height align-items-center justify-content-center" >
                    <div className="card-body">
                        <div className="spinner-grow text-dark mt-5 me-3" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-dark mt-5 me-3" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-dark mt-5 me-3" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-dark mt-5 me-3" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card mt-4">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={this.state.img} className="card-img" height="220" alt="Miniatura" />
                            {/* <img src={Office1} className="card-img h-100" alt="Miniatura" /> */}
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col col-8">
                                            <h4 className="card-title align-middle">{office.ubicación.direccion.calle} {office.ubicación.direccion.numero} </h4>
                                            {/* <h4 className="card-title align-middle"> Av. Corrientes 2081</h4> */}

                                            { office.categoria==="#?planta_completa" ? ( <p className="card-subtitle mb-2 text-muted">Oficina de planta completa / 1 a +50</p> ) : null }
                                            { office.categoria==="#?espacio_oficina" ? ( <p className="card-subtitle mb-2 text-muted">Espacio de oficina / 1 a 15</p> ) : null }
                                            { office.categoria==="#?espacio_individual" ? ( <p className="card-subtitle mb-2 text-muted">Espacio individual / 1</p> ) : null }
                                            { office.categoria==="#?espacio_libre" ? ( <p className="card-subtitle mb-2 text-muted">Espacio de trabajo libre / 1 a 6</p> ) : null }

                                            <p className="card-subtitle mb-2 text-muted">{office.ubicación.provincia}</p>
                                            
                                            <p className="card-subtitle text-muted mt-5">
                                                {booked_from} – {booked_until}
                                            </p>
                                        </div>

                                        <div className="col col-1">
                                            <div className="vl"></div>
                                        </div>

                                        <div className="col col-3 text-center align-self-center">
                                            <p className="font-monospace">Total ${office.calendario_alquileres[0].monto}</p>
                                            { office.calendario_alquileres[0].pendiente_pago ?
                                                <span className="badge bg-dark mb-5">Pendiente de pago</span>
                                            :
                                                <span className="badge bg-light text-muted mb-5">Pago recibido</span>
                                            }
                                            <div className="col d-grid gap-2">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-office4u btn-sm"
                                                    disabled>
                                                        Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Office;