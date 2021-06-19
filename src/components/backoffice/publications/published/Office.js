import React, { Component } from 'react';

//import Office1 from '../../../assets/img/office1.jpg'
//import whatsapp from '../../../assets/img/whatsapp.png'

// Importo llamada a endpoint
import {UpdateOfficeStatus as UpdateOfficeStatusAPI} from "../../../../controller/OfficeController";


class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            office: this.props.office,
            show_toast: 'toast hide float-right text-white bg-dark',
            published: this.props.office.publicado,
            img: this.props.office.imagenes[Math.floor(Math.random()*this.props.office.imagenes.length)],
            reviews: this.props.office.opiniones.length-1,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    togglefavorite = () => {
        this.setState({published: !this.state.published})
    }

    showToast = () => {
        this.setState({ show_toast: 'toast show float-right text-white bg-dark' });
        setTimeout(this.hideToast, 4000);
    }

    hideToast = () => {
        this.setState({ show_toast: 'toast hide float-right text-white bg-dark' });
    }

    handleSubmit = async (event) =>{
        event.preventDefault();

        let officeId = this.state.office.prop_id;
        let published = !this.state.published
        
        this.setState({loading: true});

        let updateOfficeStatusAPI = await UpdateOfficeStatusAPI(officeId, published);

        this.setState({loading: false});

        if(updateOfficeStatusAPI.rdo === 0 ) {
            this.showToast();
            this.togglefavorite();
        } else {
            console.log("Error en actualizar el estado de la publicacion.");
        }
    }

    render() {
        const office = this.state.office;
        const published = this.state.published;
        // var img = this.state.office.imagenes[Math.floor(Math.random()*this.state.office.imagenes.length)];
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
                                        <div className="col-sm-12 col-md-7 col-lg-7">
                                            <h4 className="card-title align-middle">{office.ubicación.direccion.calle} {office.ubicación.direccion.numero} <i className="material-icons ms-2 text-muted">edit</i></h4>
                                            {/* <h6 className="card-subtitle mb-2 text-muted">{property.descripcion}</h6> */}
                                            { office.categoria==="#?planta_completa" ? ( <p className="card-subtitle mb-2 text-muted">Oficina de planta completa / 1 a +50</p> ) : null }
                                            { office.categoria==="#?espacio_oficina" ? ( <p className="card-subtitle mb-2 text-muted">Espacio de oficina / 1 a 15</p> ) : null }
                                            { office.categoria==="#?espacio_individual" ? ( <p className="card-subtitle mb-2 text-muted">Espacio individual / 1</p> ) : null }
                                            { office.categoria==="#?espacio_libre" ? ( <p className="card-subtitle mb-2 text-muted">Espacio de trabajo libre / 1 a 6</p> ) : null }

                                            <p className="card-subtitle mb-2 text-muted">{office.ubicación.provincia}</p>

                                            <button 
                                                type="button" 
                                                className="btn btn-link rr16-cyan card-link padding-cero"
                                                onClick={this.description} 
                                                disabled>
                                                    <i className="material-icons align-middle me-2">edit_calendar</i>
                                                    Editar disponibilidad
                                            </button>

                                            <br/>
                                            
                                            <button 
                                                type="button" 
                                                className="btn btn-link rr16-cyan card-link padding-cero"
                                                onClick={this.description} 
                                                disabled>
                                                    <i className="material-icons align-middle me-2">event_available</i>
                                                    Ver reservaciones
                                            </button>
                                            
                                        </div>

                                        <div className="col-sm-12 col-md-1 col-lg-1">
                                            <div className="vl"></div>
                                        </div>

                                        <div className="col-sm-12 col-md-4 col-lg-4 text-center">
                                            <div className="row mb-3">
                                                <div className="col col-md-12 mb-2">
                                                    <i className="material-icons align-middle me-2 color-star">star_rate</i>
                                                    <span className="me-2">{this.state.office.puntuacion.toFixed(1)}</span>
                                                </div>
                                                <div className="col col-md-12 mb-2">
                                                    
                                                    { this.state.reviews === 1 ? ( 
                                                        <p className="card-subtitle text-muted">{this.state.reviews} reseña</p> 
                                                    ) : (
                                                        <p className="card-subtitle text-muted">{this.state.reviews} reseñas</p> 
                                                    ) }
                                                    
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col col-md-12">
                                                { published === true ? (
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link card-link padding-cero color-stop"
                                                        onClick={this.handleSubmit} >
                                                            <i className="material-icons align-middle">pause</i> <br/> Pausar <br/> publicación
                                                    </button> ) :  
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link card-link padding-cero color-play"
                                                        onClick={this.handleSubmit} >
                                                            <i className="material-icons align-middle">play_arrow</i> <br/> Publicar
                                                    </button>
                                                }
                                                </div>
                                                <div className="fixed-bottom text-right bottom-0 right-0 p-3">
                                                    <div id="liveToast" className={this.state.show_toast} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
                                                        <div className="toast-body">
                                                            { published !== true ? (
                                                                    <p>Pausamos tu publicación de {office.ubicación.direccion.calle} {office.ubicación.direccion.numero}.</p> 
                                                                ) : (
                                                                    <p>Publicamos tu oficina de {office.ubicación.direccion.calle} {office.ubicación.direccion.numero}.</p>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
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