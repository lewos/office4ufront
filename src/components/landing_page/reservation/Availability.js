import React, { Component } from 'react';


// MaterialUI
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

// Componentes
import Nav from '../Nav'
import FormNewReservation from './formNewReservation'
import Footer from '../Footer'

// Importo llamada a endpoint
import {CheckOfficeAvailability as CheckOfficeAvailabilityAPI} from "../../../controller/ReservationsController";


class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeView: 'check_availability',
            office:  this.props.location.state.office,
            available: false,
            show_message: "available",
            selectedDateIN: new Date(),
            selectedDateOUT: new Date(),

            

            office_province: localStorage.getItem('office_province'),
            
        };

        this.goBack = this.goBack.bind(this);

    }

    handleDateChangeIN = (date) => {
        this.setState({ selectedDateIN: date })
    }

    handleDateChangeOUT = (date) => {
        this.setState({ selectedDateOUT: date })
    }

    // Validacion disponibilidad de la oficina.
    checkAvailability = async (event) =>{
        event.preventDefault();

        //console.log(this.state.selectedDateIN)

        let office_id = this.state.office.prop_id;
        // let date_in = "2021-06-22";
        // let date_out = "2021-06-22";
        let date_in = this.state.selectedDateIN.toISOString();
        let date_out = this.state.selectedDateOUT.toISOString();

        this.setState({activeView: "loading"});

        let checkOfficeAvailability = await CheckOfficeAvailabilityAPI(office_id, date_in, date_out);

        if(checkOfficeAvailability.rdo === 0 ) {
            if(checkOfficeAvailability.data === true ) {
                this.setState({available: true, activeView: "check_availability"});
            } else {
                this.setState({available: false, show_message: "unavailable", activeView: "check_availability"});
            }
        } else {
            console.log("Error");
            // this.setState({activeView: "error"});
        }
        
    }

    handleSubmit= async (event) =>{
        event.preventDefault();
        this.setState({activeView: "form_reservation"});
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    goBack () {
        this.props.history.goBack();
    }

    goToStep1 = () => {
        this.setState({activeView: "check_availability"});
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        const office = this.state.office;
        switch(this.state.activeView) {
        case "loading": 
            return (
                <div>
                    <Nav history={this.props.history} />
                    <div>
                        <div className="container altura-minima">
                            <div className="row align-items-center justify-content-center mt-4 mb-4">
                                <div className="col col-sm-12 col-md-7 col-lg-7">
                                    
                                    <h1>
                                        <button 
                                            type="button" 
                                            className="btn btn-link link-guardar text-reset me-2"
                                            onClick={this.goBack}>
                                            <i className="material-icons align-middle text-2">chevron_left</i>
                                        </button>
                                        {office.ubicación.direccion.calle} {office.ubicación.direccion.numero}
                                    </h1>
                                    
                                    { office.categoria==="#?planta_completa" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Oficina de planta completa / 1 a +50</p> ) : null }
                                    { office.categoria==="#?espacio_oficina" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Espacio de oficina / 1 a 15</p> ) : null }
                                    { office.categoria==="#?espacio_individual" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Espacio individual / 1</p> ) : null }
                                    { office.categoria==="#?espacio_libre" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Espacio de trabajo libre / 1 a 6</p> ) : null }

                                </div>
                                <div className="col col-sm-12 col-md-5 col-lg-5">
                                    <h5 className="text-muted text-end">{office.ubicación.provincia} - {office.ubicación.ciudad}</h5>
                                    <h6 className="text-muted text-end">{office.ubicación.barrio}</h6>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col col-sm-12 col-md-7 col-lg-10 align-self-center text-center">
                                    <div className="card mt-4 card-height border-light mt-5 position-absolute top-50 start-50 translate-middle">
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
                                            <span>Consultando disponibilidad...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        case "check_availability":
            return (
                <div>
                    <Nav history={this.props.history} />
                    <div>
                        <div className="container altura-minima">
                            <div className="row align-items-center justify-content-center mt-4 mb-4">
                                <div className="col col-sm-12 col-md-7 col-lg-7">
                                    
                                    <h1>
                                        <button 
                                            type="button" 
                                            className="btn btn-link link-guardar text-reset me-2"
                                            onClick={this.goBack}>
                                            <i className="material-icons align-middle text-2">chevron_left</i>
                                        </button>
                                        {office.ubicación.direccion.calle} {office.ubicación.direccion.numero}
                                    </h1>
                                    
                                    { office.categoria==="#?planta_completa" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Oficina de planta completa / 1 a +50</p> ) : null }
                                    { office.categoria==="#?espacio_oficina" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Espacio de oficina / 1 a 15</p> ) : null }
                                    { office.categoria==="#?espacio_individual" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Espacio individual / 1</p> ) : null }
                                    { office.categoria==="#?espacio_libre" ? ( <p className="card-subtitle mb-2 ms-4 text-muted">Espacio de trabajo libre / 1 a 6</p> ) : null }

                                </div>
                                <div className="col col-sm-12 col-md-5 col-lg-5">
                                    <h5 className="text-muted text-end">{office.ubicación.provincia} - {office.ubicación.ciudad}</h5>
                                    <h6 className="text-muted text-end">{office.ubicación.barrio}</h6>
                                </div>
                            </div>
                            <div className="row mt-3 mb-5 align-items-center justify-content-center">
                                <div className="col"></div>
                                <div className="col-7 mb-5">
                                    <h4 className="mb-4">Primero debemos verificar que haya disponibilidad</h4>
                                    <h5 className="mb-4">Seleccioná tu fecha de ingreso y egreso</h5>

                                    <div className="card text-center">
                                        <div className="card-body ">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around">

                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-IN"
                                                    label="check-in"
                                                    format="dd/MM/yyyy"
                                                    value={this.state.selectedDateIN}
                                                    onChange={this.handleDateChangeIN}
                                                    KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                    }}
                                                />

                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-OUT"
                                                    label="check-out"
                                                    format="dd/MM/yyyy"
                                                    value={this.state.selectedDateOUT}
                                                    onChange={this.handleDateChangeOUT}
                                                    KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                    }}
                                                />

                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className="card-footer d-grid gap-2">
                                            <button 
                                                type="button" 
                                                className="btn btn-dark"
                                                onClick={this.checkAvailability}>
                                                    Consultar
                                            </button>
                                        </div>
                                    </div>
                                    
                                    { this.state.available ? 
                                        this.state.show_message==="available" ? 
                                            <div className="alert alert-success mt-2" role="alert">
                                                Bien! La oficina está disponible. Seleccioná "Reservar" para confirmar y pagar.
                                            </div>
                                        : null
                                    : this.state.show_message==="unavailable" ?
                                            <div className="alert alert-secondary mt-2" role="alert">
                                                Lo sentimos, la oficina no está disponible, seleccioná otras fechas y volvé a intentar.
                                            </div>
                                        : null
                                    }
                                    
                                    <div className="alert alert-light" role="alert">
                                        No vamos a cobrarte ningún cargo por el momento
                                    </div>
                                    <div> 
                                        <button 
                                            type="button" 
                                            className="btn btn-office4u-outline"
                                            onClick={this.goBack}>
                                                No, gracias
                                        </button>
 
                                        { this.state.available ? 
                                            <button 
                                                type="button" 
                                                className="btn btn-office4u-outline float-end"
                                                onClick={this.handleSubmit}>
                                                    Reservar
                                            </button> : 
                                            <button 
                                                type="button" 
                                                className="btn btn-office4u-outline float-end"
                                                disabled >
                                                    Reservar
                                            </button> 
                                        }
                                    </div>
                                </div>
                                <div className="col"></div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )

        case "form_reservation":
            return(
                <div>
                    <Nav history={this.props.history} />
                        <div>
                            <FormNewReservation history={this.props.history} onClick={this.goToStep1} office={office} selectedDateIN={this.state.selectedDateIN} selectedDateOUT={this.state.selectedDateOUT}/>
                        </div>
                    <Footer/>
                </div>
            )

        default:
            return(
                <div>
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
            )
        }
    }
}

export default Availability;