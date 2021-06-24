import React, { Component } from 'react';

// MaterialUI
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

// MapBox
import ReactMapGL from 'mapbox-gl';

// Imagenes
import noImg from '../../../assets/img/no-image.png'

// Componentes
import Nav from '../Nav'
import Footer from '../Footer'

// Importo llamada a endpoint
import {CreateFavourite as CreateFavouriteAPI} from "../../../controller/FavoritesController";
import {GetFavorites as GetFavoritesAPI} from "../../../controller/FavoritesController";
import {CheckOfficeAvailability as CheckOfficeAvailabilityAPI} from "../../../controller/ReservationsController";

import FromModal from '../FormModal';

ReactMapGL.accessToken = 'pk.eyJ1IjoibWFycXVlemp1YW4yMjExIiwiYSI6ImNrcGQ0b2gyeTE0aHEydXBlczV1MjB3dHEifQ.MmDsrFIX1HhKyAExXmPqjg'

function cambiarAFormatoAR(fecha){
    //let fecha = "15/08/2020";
    let fechaSplit = fecha.split("-");
    let dia = new Date(parseInt(fechaSplit[0], 10), // anio
                      parseInt(fechaSplit[1], 10) - 1, //mes
                      parseInt(fechaSplit[2], 10)); // dia
  
    //let diaFormateado = dia.getDate() + "-" + (dia.getMonth() + 1) + "-" + dia.getFullYear()
    let diaFormateado =  dia.getDate() + "-" + (dia.getMonth() + 1) + "-" + dia.getFullYear();
    return diaFormateado;
  }

class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('nombre'),
            office: this.props.location.state.office,
            favorite: false,
            reviews: this.props.location.state.office.opiniones.length-1,

            lng: this.props.location.state.lng,
            lat: this.props.location.state.lat,
            zoom: 10,

            dateIN: new Date(),
            dateOUT: new Date(),
            btnAvailability: false,
            available: false,
            show_message: '',


        };
        this.mapContainer = React.createRef();
        this.goBack = this.goBack.bind(this);

    }

    componentDidMount() {
        this.getFavourites();
        const { lng, lat, zoom } = this.state;
        const map = new ReactMapGL.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/marquezjuan2211/ckpd4tqo90p7y17t53p4g4f5d',
            center: [lng, lat],
            zoom: zoom
        });
    }

    handleDateChangeIN = (date) => {
        this.setState({ dateIN: date })
    }

    handleDateChangeOUT = (date) => {
        this.setState({ dateOUT: date })
    }

    // Validacion disponibilidad de la oficina.
    checkAvailability = async (event) =>{
        event.preventDefault();

        let office_id = this.state.office.prop_id;
        let date_in = this.state.dateIN.toISOString();
        let date_out = this.state.dateOUT.toISOString();

        this.setState({btnAvailability: true});

        let checkOfficeAvailability = await CheckOfficeAvailabilityAPI(office_id, date_in, date_out);

        if(checkOfficeAvailability.rdo === 0 ) {
            if(checkOfficeAvailability.data === true ) {
                this.setState({available: true, show_message: "available", btnAvailability: false});
            } else {
                this.setState({available: false, show_message: "unavailable", btnAvailability: false});
            }
        } else {
            console.log("Error");
        }
    }

    goBack(){
        this.props.history.goBack();
    }

    togglefavorite = () => {
        this.setState({favorite: !this.state.favorite})
    }

    favorite = () => {
        if(!this.state.user_name) {
            this.props.history.push({
                pathname: '/login',
                hash: '?searchView'
            })
        } else {
            this.createFavourite()
        }
    }

    reservation = () => {
        if(!this.state.user_name) {
            this.props.history.push({
                pathname: '/login',
                hash: '?searchView'
            })
        } else {
            this.props.history.push({
                pathname: '/reserva',
                hash: '?searchView',
                state: {
                    office: this.state.office,
                }
            })
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    createFavourite = async () => {
        // Ejecuto el endopoint para crear un nuevo favorito.
        
        const userName = localStorage.getItem('nombre');
        const favourite = this.state.office.prop_id;

        let createFavouriteAPI = await CreateFavouriteAPI(userName, favourite);

        if(createFavouriteAPI.rdo === 0) {
            this.togglefavorite();
        } 
    }

    getFavourites = async () => {
        const userName = localStorage.getItem('nombre') 

        let getFavoritesAPI = await GetFavoritesAPI(userName);

        if(getFavoritesAPI.rdo === 0) {
            if(getFavoritesAPI.data.length !== 0) {
                getFavoritesAPI.data.map(favourite => favourite.prop_id === this.state.office.prop_id ? this.togglefavorite() : null);
            }
        }
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        const office = this.state.office;
        return (
            <div>
                <Nav history={this.props.history} />
                <div>
                    <div className="container altura-minima">

                        <div className="row mt-5 mb-4">
                            <div className="col">
                                <button 
                                    type="button" 
                                    className="btn btn-link link-guardar ms-5 text-reset"
                                    onClick={this.goBack}>
                                    <i className="material-icons align-middle">chevron_left</i>Buscar
                                </button>
                            </div>
                            <div className="col d-flex justify-content-end">
                                <button 
                                    type="button" 
                                    className="btn btn-link link-guardar text-reset me-5"
                                    disabled>
                                    <i className="material-icons align-middle me-2">share</i> Compartir
                                </button>
                                { this.state.favorite===true ? (
                                    <button 
                                        type="button" 
                                        className="btn btn-link link-guardar text-reset me-4"
                                        onClick={this.favorite}
                                        disabled>
                                        <i className="material-icons align-middle me-2 guardar">favorite</i> Quitar
                                    </button>) : (
                                        <button 
                                        type="button" 
                                        className="btn btn-link link-guardar text-reset me-4"
                                        onClick={this.favorite}>
                                        <i className="material-icons align-middle me-2 guardar">favorite_border</i> Guardar
                                    </button> ) 
                                }
                            </div>
                        </div>
            
                        <div className="row align-items-center justify-content-center mt-5">
                            <div className="col col-sm-12 col-md-7 col-lg-7">
                                
                                <h1>{office.ubicación.direccion.calle} {office.ubicación.direccion.numero}</h1>
                                <i className="material-icons align-middle me-2 color-star">star_rate</i>
                                <span>{office.puntuacion.toFixed(1)}</span>
                                <span className="ms-3 me-3">|</span>
                                { this.state.reviews === 1 ? ( 
                                    <span className="card-subtitle text-muted">{this.state.reviews} reseña</span> 
                                ) : (
                                    <span className="card-subtitle text-muted">{this.state.reviews} reseñas</span> 
                                ) }
                            </div>
                            <div className="col col-sm-12 col-md-5 col-lg-5">
                                
                                <h5 className="text-muted text-end">{office.ubicación.provincia} - {office.ubicación.ciudad}</h5>
                                <h6 className="text-muted text-end">{office.ubicación.barrio}</h6>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-5 mb-5">
                            <div className="col col-sm-12 col-md-7 col-lg-8">
                                
                                <div id="carouselImg" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselImg" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselImg" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselImg" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        <button type="button" data-bs-target="#carouselImg" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                    </div>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                        {office.imagenes[0] ? <img src={office.imagenes[0]} className="d-block w-100 height-490" alt="Img1"/> :
                                            <img src={noImg} className="d-block w-100 height-490" alt="Img1"/>}
                                        </div>
                                        <div className="carousel-item">
                                            {office.imagenes[1] ? <img src={office.imagenes[1]} className="d-block w-100 height-490" alt="Img2"/> :
                                            <img src={noImg} className="d-block w-100 height-490" alt="Img2"/>}
                                        </div>
                                        <div className="carousel-item">
                                        {office.imagenes[2] ? <img src={office.imagenes[2]} className="d-block w-100 height-490" alt="Img3"/> :
                                            <img src={noImg} className="d-block w-100 height-490" alt="Img3"/>}
                                        </div>
                                        <div className="carousel-item">
                                        {office.imagenes[3] ? <img src={office.imagenes[3]} className="d-block w-100 height-490" alt="Img4"/> :
                                            <img src={noImg} className="d-block w-100 height-490" alt="Img4"/>}
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselImg" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselImg" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                    
                            </div>

                            <div className="col col-sm-12 col-md-5 col-lg-4">
                                <div className="alert alert-secondary" role="alert">
                                    <button 
                                        type="button" 
                                        className="btn btn-link link-guardar text-reset">
                                        <i className="material-icons align-middle guardar">coronavirus</i> Conocé más sobre nuestra respuesta frente al COVID-19.
                                    </button>
                                </div>
                                <div className="card text-center">
                                    <div className="card-header">
                                        <button 
                                            type="button" 
                                            className="btn btn-link link-guardar text-reset">
                                            <span className="text-075">Consiguí una oficina gratis durante un mes (solo miembros nuevos).</span>
                                        </button>
                                    </div>
                                    <div className="card-body ">
                                        <h5 className="card-title mt-3 mb-4">¿Te interesa esta oficina?</h5>
                                        <h6 className="card-subtitle mb-4 text-muted">Solicita una visita virtual</h6>
                                        <FromModal/>

                                        <h6 className="card-subtitle mt-5 mb-4 text-muted">¿Listo para dar el salto?</h6>

                                        <button 
                                            type="button" 
                                            className="btn btn-outline-dark mb-3"
                                            onClick={this.reservation}>
                                            Reservar ésta oficina ahora
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        <div className="row mt-5 mb-5">
                            <h4 className="mb-4">Servicios</h4>
                                {office.servicios.map((servicio) => 
                                    <div key={servicio} className="col col-sm-12 col-md-2 col-lg-2 mb-4">    
                                        <div className="card border-light text-center height-services color-services">
                                            <div className="card-body d-flex align-items-center justify-content-center">
                                                <span>{servicio}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>

                        <div className="row justify-content-center mt-5 mb-5">
                            <h4 className="mb-4">Ubicación</h4>
                            <p className="font-monospace">{office.ubicación.direccion.calle} {office.ubicación.direccion.numero}</p>
                            <p className="font-monospace">{office.ubicación.provincia} - {office.ubicación.ciudad} - {office.ubicación.barrio}</p>
                            <div className="card text-center">
                                <div className="card-body ">
                                    <div ref={this.mapContainer} className="map-container" />
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-5 mb-5">
                            <h4 className="mb-4">Costos</h4>
                            <p className="font-monospace">Valor estimado por día: $ ARG {office.precio.dia}</p>
                            <p className="font-monospace">Valor estimado por semana: $ ARG {office.precio.semana}</p>
                            <p className="font-monospace">Valor estimado por mes: $ ARG {office.precio.mes}</p>
                            <div className="alert alert-light" role="alert"><i className="material-icons align-middle">campaign</i> Luego de generar la reserva tendrás hasta 48hrs para contactarte con el dueño y coordinar el pago. <br/>Pasadas esas 48hrs la reserva caducará sin costo alguno.</div>
                        </div>

                        <div className="row mt-5 mb-5">
                            <h4 className="mb-4">Consultar disponibilidad</h4>
                            <div className="col col-sm-12 col-md-7 col-lg-7 ">
                                <div className="card text-center">
                                    <div className="card-body ">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">

                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-IN"
                                                    label="check-in"
                                                    format="dd/MM/yyyy"
                                                    value={this.state.dateIN}
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
                                                    value={this.state.dateOUT}
                                                    onChange={this.handleDateChangeOUT}
                                                    KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                    }}
                                                />

                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="card-footer d-grid gap-2">
                                        { !this.state.btnAvailability ?
                                            <button 
                                                type="button" 
                                                className="btn btn-dark"
                                                onClick={this.checkAvailability}>
                                                    Consultar
                                            </button>
                                            : 
                                            <button 
                                                type="button" 
                                                className="btn btn-dark"
                                                disabled>
                                                    Consultar
                                            </button>
                                        }
                                    </div>
                                </div>
                                { this.state.available ? 
                                    this.state.show_message==="available" ? 
                                        <div className="alert alert-success mt-2 text-center" role="alert">
                                            La oficina está libre. Es tu oportunidad, reservá ahora!
                                        </div>
                                    : null
                                : this.state.show_message==="unavailable" ?
                                        <div className="alert alert-secondary mt-2 text-center" role="alert">
                                            Parece que la oficina no está disponible. Proba con otras fechas.
                                        </div>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="row justify-content-center mt-5 mb-5">
                            <h4 className="mb-4">Lo que dice la gente</h4>
                            { office.opiniones.length > 1 ? ( 
                                office.opiniones.slice(1, ).map((opinion) =>  
                                    <div className="col col-sm-12 col-md-12 col-lg-12 mb-4">    
                                        <div className="card border-light color-services">
                                            <div className="card-body">
                                                <i className="material-icons align-middle me-2 color-star">star_rate</i>
                                                <span>{opinion.calificación.toFixed(1)}</span> <br/>
                                                <span className="text-muted">{cambiarAFormatoAR(opinion.dia)}</span> <br/>
                                                <span>{opinion.comentario}</span>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            ) : (
                                <div className="alert alert-light" role="alert"><i className="material-icons align-middle me-3">reviews</i>Esta propiedad no cuenta con reseñas.</div>
                            ) }
                            
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Office;