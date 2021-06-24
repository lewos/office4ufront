import React, { Component } from 'react';

// Componentes
import Nav from '../../Nav'
import LateralNav from '../../LateralNav'
import BookingOffice from './BookingOffice'
import Footer from '../../Footer'

// Importo llamada a endpoint
import {GetReservationByTenant as GetReservationByTenantAPI} from "../../../../controller/ReservationsController";

class Published extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            text_search: '',
            loading: false,
        };
        
    }

    async componentDidMount() {
        this.getBookings();
    }

    setTextFilter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
    }

    getBookings = async () => {
        // Ejecuto el endopoint para consultar las reservas del usuario.
        const userName = localStorage.getItem('nombre') 
        this.setState({loading: true});
        let reservationByTenant = await GetReservationByTenantAPI(userName);
        this.setState({loading: false});
        if(reservationByTenant.rdo === 0) {
            this.setState({
                bookings: reservationByTenant.data,
            })
        } 
    }

    render() {
        if(this.state.loading){
            return (
                <div>
                    <Nav history={this.props.history} />
                    <div>
                        <div className="container-fluid">
                            <div className="row ">
                                <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                    <LateralNav history={this.props.history}/>
                                </div>
                                <div className="col col-sm-12 col-md-7 col-lg-10 text-center">
                                    <div className="card mt-4 card-height border-light mt-5" >
                                        <div className="card-body">
                                            <div className="spinner-grow text-dark mt-5 mb-5 me-3" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <div className="spinner-grow text-dark mt-5 mb-5 me-3" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <div className="spinner-grow text-dark mt-5 mb-5 me-3" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <div className="spinner-grow text-dark mt-5 mb-5 me-3" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        } else {
            return (
                <div>
                    <Nav history={this.props.history} />
                    <div>
                        <div className="container-fluid mb-4">
                            <div className="row">
                                <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                    <LateralNav history={this.props.history}/>
                                </div>
                                <div className="col">
                                    <div className="container-fluid">
                                        <div className="row mt-4">
                                            <nav className="navbar navbar-light w-100">
                                                <h4 className="rr22">Reservas</h4><br/>
                                                <form className="d-flex"> 
                                                    <input 
                                                        className="form-control me-2" 
                                                        type="search" 
                                                        placeholder="Buscar" 
                                                        aria-label="Search"
                                                        value={this.state.text_search} 
                                                        onChange={(text_search) => this.setTextFilter(text_search)}/>
                                                    <button 
                                                        className="btn btn-office4u-outline" type="button">
                                                        <i 
                                                            className="material-icons float-right align-middle">
                                                            search
                                                        </i>
                                                    </button>
                                                </form>
                                            </nav>
                                        </div>
                                        <span className="rr16 text-muted">Podes administrar todas tus reservas fácilmente en un solo lugar.</span>
                                        <hr/>

                                        { this.state.bookings.length > 0 ? ( 

                                            /*Mapeo todas las reservas existentes en el .json */

                                            this.state.bookings
                                                .filter(booking => booking.ubicación.direccion.calle.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                                .map(booking => <BookingOffice booking = {booking} key={booking.calendario_alquileres[0].id} history={this.props.history}/>)

                                            ) : (

                                                <div className="text-center mt-5">
                                                    <i className="material-icons size-ico-120 text-secondary">view_headline</i>
                                                    <br/>
                                                    <span className="text-secondary">Todavía no hay ningún contenido</span> <br/>
                                                    <span className="small text-secondary">Cuando hagas tu primera reserva la vas a poder visualizar y administrar en esta sección.</span>
                                                </div>

                                            ) 
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

export default Published;