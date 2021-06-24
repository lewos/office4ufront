import React, { Component } from 'react';

//import Office1 from '../../assets/img/office1.jpg'

// Importo llamada a endpoint
import {CreateFavourite as CreateFavouriteAPI} from "../../../controller/FavoritesController";

class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: localStorage.getItem('nombre'),
            loading: false,
            office: this.props.office,
            favorite: false,
            seconds: 10,
            img: this.props.office.imagenes[Math.floor(Math.random()*this.props.office.imagenes.length)],
            reviews: this.props.office.opiniones.length-1,
            stars: this.props.office.puntuacion,
            cantServices: this.props.office.servicios.length - 4,

            lng: -58.38166337703597, // Longitud de BsAs.
            lat: -34.60438696354044, // Latitud de BsAs.
        };
    }

    componentDidMount() {
        var arrayFav = []
        arrayFav = JSON.parse(localStorage.getItem("favoritos"));
        console.log(JSON.parse(localStorage.getItem("favoritos")))
        if(arrayFav !== null) {
            arrayFav.map( favourite => favourite === this.state.office.prop_id ? this.togglefavorite() : null)
        }

        if(localStorage.getItem('office_province') !== 'Buenos Aires') {
            if(localStorage.getItem('office_province') === 'Córdoba') {
                this.setState({lng: -64.18211591036815});
                this.setState({lat: -31.416132119259075});
            }
            if(localStorage.getItem('office_province') === 'Mendoza') {
                this.setState({lng: -68.84362650066404});
                this.setState({lat: -32.889071425279944});
            }
            if(localStorage.getItem('office_province') === 'Neuquén') {
                this.setState({lng: -68.05922970041003});
                this.setState({lat: -38.95165895014187});
            }
        }
    }


    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
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

    redirectToDetail = () => {
        this.props.history.push({
            pathname: '/detalle',
            state: {
                office: this.state.office,
                favourite: this.state.favorite,
                lng: this.state.lng,
                lat: this.state.lat
            }
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    createFavourite = async () => {
        // Ejecuto el endopoint para crear un nuevo favorito.
        
        const userName = localStorage.getItem('nombre');
        const favourite = this.state.office.prop_id;

        this.setState({loading: true});

        let createFavouriteAPI = await CreateFavouriteAPI(userName, favourite);

        this.setState({loading: false});

        if(createFavouriteAPI.rdo === 0) {
            this.togglefavorite();
        } 
    }

    render() {
        const office = this.state.office;
        //console.log(this.state.favorite)
        if(this.state.loading){
            return (
                <div className="card mt-4 card-height align-items-center justify-content-center" >
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
                                        <div className="col-sm-12 col-md-8 col-lg-8">

                                            <button 
                                                type="button" 
                                                className="btn btn-link link-guardar text-reset"
                                                onClick={this.redirectToDetail}>
                                                <h4 className="card-title align-middle">{office.ubicación.direccion.calle} {office.ubicación.direccion.numero}</h4>
                                            </button>
                                            
                                            { office.categoria==="#?planta_completa" ? ( <p className="card-subtitle mb-2 text-muted">Oficina de planta completa / 1 a +50</p> ) : null }
                                            { office.categoria==="#?espacio_oficina" ? ( <p className="card-subtitle mb-2 text-muted">Espacio de oficina / 1 a 15</p> ) : null }
                                            { office.categoria==="#?espacio_individual" ? ( <p className="card-subtitle mb-2 text-muted">Espacio individual / 1</p> ) : null }
                                            { office.categoria==="#?espacio_libre" ? ( <p className="card-subtitle mb-2 text-muted">Espacio de trabajo libre / 1 a 6</p> ) : null }

                                            <p className="card-subtitle mb-2 text-muted">{office.ubicación.provincia}</p>
                                            
                                            <p className="card-subtitle mb-2 text-muted mt-5">
                                                {office.servicios.slice(0, 4).map((servicio) => <span key={servicio}>{servicio} | </span>)}
                                                { this.state.cantServices > 0 ? ( <span> + {this.state.cantServices}</span> ) : null }
                                            </p>
                                        </div>

                                        <div className="col-sm-12 col-md-1 col-lg-1">
                                            <div className="vl"></div>
                                        </div>

                                        <div className="col-sm-12 col-md-3 col-lg-3 text-center">
                                            <div className="row mt-3">
                                                <div className="col col-md-12">
                                                    { this.state.favorite===true ? (
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-link link-guardar text-reset"
                                                            onClick={this.favorite}
                                                            disabled>
                                                            Quitar <i className="material-icons align-middle mr-2 guardar">favorite</i>
                                                        </button>) : (
                                                            <button 
                                                            type="button" 
                                                            className="btn btn-link link-guardar text-reset"
                                                            onClick={this.favorite}>
                                                            Guardar <i className="material-icons align-middle mr-2 guardar">favorite_border</i>
                                                        </button> ) 
                                                    }
                                                </div>
                                            </div>
                                            
                                            <div className="row mt-3 mb-3"></div>

                                            <div className="row mb-3">
                                                <div className="col col-md-12 mb-2">
                                                    <i className="material-icons align-middle mr-2 color-star">star_rate</i>
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