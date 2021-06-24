import React, { Component } from 'react';

import moment from 'moment'

// Importo llamada a endpoint
import {NewReservation as NewReservationAPI} from "../../../controller/ReservationsController";

class FormNewReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeView: 'main_form',
            office: this.props.office,
            selectedDateIN: this.props.selectedDateIN,
            selectedDateOUT: this.props.selectedDateOUT,
            partialPrice: '',
            serviceCost: '',
            finalPrice: '',
        };

    }

    Home = () => {
        this.props.history.push('/home');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    Bookings = () => {
        this.props.history.push('/reservas');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    componentDidMount() {
        // Calculo la cantidad de dias que se va a alquilar la oficina.
        var a = moment(this.state.selectedDateOUT);
        var b = moment(this.state.selectedDateIN);
        let diff = a.diff(b, 'days') + 1

        //console.log(diff)
        
        // No se calcula el precio por semana ni por mes solo por dia. 
        let precio = Math.round(this.state.office.precio.dia * diff)
        let costo_servicio = Math.round(precio * 0.10)

        this.setState({
            partialPrice: precio, 
            serviceCost: costo_servicio,
            finalPrice: precio + costo_servicio
        });
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }


    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        let dateIn = this.state.selectedDateIN.toISOString();
        let dateOut = this.state.selectedDateOUT.toISOString();
        let tenant = localStorage.getItem('nombre');
        let officeId = this.state.office.prop_id;
        let finalPrice = this.state.finalPrice;
        let outstanding = true; // Pendiente de pago en true por defecto.

        this.setState({activeView: "loading"});

        let newReservation = await NewReservationAPI(dateIn, dateOut, tenant, officeId, finalPrice, outstanding);

        if(newReservation) {
            if(newReservation.rdo === 0 ) {
                this.setState({activeView: "success"});
            } else {
                this.setState({activeView: "error"});
            }
        } else {
            this.setState({activeView: "error"});
        }

    }


    render() {
        switch(this.state.activeView) {
        case "loading": 
            return (
                <div>
                    <div className="container altura-minima">
                        <div className="row align-items-center justify-content-center">
                            <div className="col col-sm-12 col-md-7 col-lg-10 align-self-center text-center">
                                <div className="card card-height border-light position-absolute top-50 start-50 translate-middle">
                                    <div className="card-body mb-5">
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
                                        </div> <br/> <br/> <br/>
                                        <span>Creando reserva, esto puede tomar un momento...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "main_form":
            return (
                <div>
                    <div className="container altura-minima">
                        <div className="row align-items-center justify-content-center mt-4 mb-4">
                            <div className="col">
                                <h1>
                                    <button 
                                        type="button" 
                                        className="btn btn-link link-guardar text-reset me-2"
                                        onClick={this.props.onClick}>
                                        <i className="material-icons align-middle text-2">chevron_left</i>
                                    </button>
                                    Confirmar y pagar
                                </h1>
                            </div>
                        </div>

                        <div className="row mt-3 mb-5">
                            <div className="col col-5 mb-5">
                                <h4 className="mb-4">Tu reserva</h4>
                                
                                <h5>Fechas</h5>
                                {/* <div className="mb-4">26 jun. – 29 jun. */}
                                <div className="mb-4">{this.state.selectedDateIN.toLocaleDateString('en-GB')} – {this.state.selectedDateOUT.toLocaleDateString('en-GB')}
                                <button 
                                    type="button" 
                                    className="btn btn-link link-guardar text-reset text-decoration-underline float-end"
                                    onClick={this.props.onClick}>
                                        Editar
                                </button>
                                </div>

                                <h5>Pago</h5>
                                <div><strong>Lo coordinas con el locatario</strong></div>
                                <div className="mb-4">Una vez realizada la reserva, tenes hasta 48hrs para contactar al dueño y coordinar el pago. Pasadas esas 48hrs la reserva caducará sin costo alguno.
                                </div>

                                <h5>Política de cancelación</h5>
                                <div>Cancelación gratuita hasta 24 horas antes.</div>
                                <div className="mb-5">Después vas a obtener un reembolso del 50%, menos la tarifa por servicio. 
                                <span className="text-decoration-underline ms-2">Más información</span>
                                </div>

                                <small>Al seleccionar el botón que aparece a continuación, acepto las Normas de la casa, Política de cancelación, Distanciamiento social y otras pautas relacionadas con el COVID-19 de Office4U, y la Política de reembolso. También acepto pagar el total indicado, que incluye las tarifas por servicio.</small>

                                <hr/>

                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button 
                                        type="button" 
                                        className="btn btn-dark mt-4"
                                        onClick={this.handleSubmit}>
                                            Confirmar
                                    </button>
                                </div> 

                            </div>
                            <div className="col col-2 mb-5"></div>
                            <div className="col mb-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div>Oficina de planta completa / 1 a +50</div>
                                        <div>Austria 2355</div>
                                        <div>Buenos Aires - CABA / Palermo</div>
                                        <hr/>
                                        <h4 className="mb-4">Detalles del precio</h4>
                                        <p className="font-monospace">${this.state.office.precio.dia} por día
                                            <span className="float-end">${this.state.partialPrice}</span>
                                        </p>
                                        <p className="font-monospace">Tarifa por servicio 
                                            <span className="float-end">${this.state.serviceCost}</span>
                                        </p>
                                        <p className="font-monospace">Total (ARG)
                                            <span className="float-end">${this.state.finalPrice}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        case "success":
            return(
                <div>
                    <div className="container altura-minima">
                        <div className="row align-items-center justify-content-center mb-4">
                            <div className="col"></div>
                            <div className="col-7">
                                <div className="card mt-3 border-light">
                                    <div className="card-body text-center">
                                        <div className="mt-4"></div>
                                        <i className="material-icons ico-success">done</i>
                                        <br/>
                                        <h2>Listo!</h2>
                                        <p>Tu reserva ya est&aacute; creada.</p>
                                        {/* <p><span className="font-weight-bold"> Godoy Cruz 2234 </span> ya est&aacute; publicada.</p> */}
                                        <small className="text-muted">La podés ver en la sección: &nbsp;
                                            
                                        </small>
                                        <button 
                                                type="button" 
                                                className="btn btn-link btn-new-office pad-left"
                                                onClick={this.Bookings}
                                                >Reservas.
                                            </button>
                                        <div className="mb-4"></div>
                                        <div className="alert alert-dark" role="alert">
                                            Recordá que tenés hasta 48hrs para contactar al dueño y coordinar el pago. <br/>Pasadas esas 48hrs la reserva caducará.
                                        </div>
                                        <div className="mb-4"></div>
                                        <button 
                                            type="button" 
                                            className="btn btn-office4u-outline btn-sm"
                                            onClick={this.Home}>
                                                Volver al inicio
                                        </button>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
            )
        case "error":
            return(
                <div>
                    <div className="container altura-minima">
                        <div className="row align-items-center justify-content-center mb-4">
                            <div className="col"></div>
                            <div className="col-7">
                                <div className="card mt-3 border-light">
                                    <div className="card-body text-center">
                                        <div className="mt-4"></div>
                                        <i className="material-icons ico-error">priority_high</i>
                                        <br/>
                                        <h2>Algo salió mal.</h2>
                                        <p>No se pudo generar correctamente la reserva.</p>
                                        {/* <p>No pudimos cargar la oficina <span className="font-weight-bold">Godoy Cruz 2234</span>, pero no te preocupes. </p> */}
                                        <div className="mb-4"></div>
                                        <button 
                                            type="button" 
                                            className="btn btn-office4u-outline btn-sm"
                                            onClick={this.Home}>
                                                Volvamos a intentarlo
                                        </button>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
            )
        default:
            return(
                <div>
                    <div className="container altura-minima">
                        <div className="row align-items-center justify-content-center mt-4 mb-4">
                            <div className="col"></div>
                            <div className="col-7">
                                <div className="card mt-5">
                                    <div className="card-body">
                                        <h4 className="card-title">P&aacute;gina no encontrada</h4>
                                        <h6 className="card-subtitle mb-2 text-muted">Te pedimos disculpas por las molestias ocasionadas.</h6>
                                        <button 
                                            type="button" 
                                            className="btn btn-office4u-outline btn-sm mt-3"
                                            onClick={this.Home}>
                                                Volver al inicio
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default FormNewReservation;