import React, { Component } from 'react';

// Componentes
import Nav from '../Nav'
import Office from './Office'
import Footer from '../Footer'

// Importo llamada a endpoint
import {GetOfficesByProvince as GetOfficesByProvinceAPI} from "../../../controller/OfficeController";
import {GetFavorites as GetFavoritesAPI} from "../../../controller/FavoritesController";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            office_province: localStorage.getItem('office_province'),
            
            loading: false,

            offices: [],
            text_search: '',

            type_workspace: '',
            amount_of_people: '',
        };

    }

    componentDidMount() {
        if(localStorage.getItem('nombre')) {
            this.getFavourites().then(this.getOffices())
        } else {
            this.getOffices();
        }
        
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    getOffices = async () => {
        // Ejecuto el endopoint para consultar todas las officinas

        let office_province = this.state.office_province

        this.setState({loading: true});

        let getOfficesByProvinceAPI = await GetOfficesByProvinceAPI(office_province);

        this.setState({loading: false});

        if(getOfficesByProvinceAPI.rdo === 0) {
            this.setState({
                offices: getOfficesByProvinceAPI.data,
            })
        }
    }

    getFavourites = async () => {
        const userName = localStorage.getItem('nombre') 

        let getFavoritesAPI = await GetFavoritesAPI(userName);

        if(getFavoritesAPI.rdo === 0) {
            if(getFavoritesAPI.data.length !== 0) {
                let arrayFav = []
                getFavoritesAPI.data.map(favourite => arrayFav.push(favourite.prop_id))
                localStorage.setItem("favoritos", JSON.stringify(arrayFav));
            }
        }
    }

    render() {
        if(this.state.loading){
            return (
                <div>
                    <Nav history={this.props.history} />
                    <div>
                        <div className="container-fluid altura-minima">
                            <hr/>
                            <div className="row mt-4 mb-4 align-items-center justify-content-center">
                                <div className="col-4">
                                    <div className="input-group">
                                        <i className="input-group-text material-icons"> search </i>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            placeholder="Proba con <<Buenos Aires>> o <<Mendoza>>"
                                            name="office_province"
                                            autoComplete = "new-password"
                                            value={this.state.office_province}
                                            onChange={this.myChangeHandler} />
                                    </div>
                                </div>
                                <div className="col-3">
                                        <select 
                                            className="form-select form-control-sm"
                                            name="type_workspace"
                                            value={this.state.type_workspace}
                                            onChange={this.myChangeHandler}>
                                            <option defaultValue disabled value="">Tipo de espacio de trabajo</option>
                                            <option value="Buenos Aires">Oficina de planta completa / 1 a +50</option>
                                            <option value="Buenos Aires">Espacio de oficina / 1</option>
                                            <option value="Buenos Aires">Espacio individual / 1 a 15</option>
                                            <option value="Buenos Aires">Espacio de trabajo libre / 1 a 6</option>
                                        </select>

                                </div>
                                <div className="col-3">
                                    <select 
                                        className="form-select form-control-sm"
                                        name="amount_of_people"
                                        value={this.state.amount_of_people}
                                        onChange={this.myChangeHandler}>
                                        <option defaultValue disabled value="">Número de personas</option>
                                        <option value="1">1</option>
                                        <option value="2">2 a 6</option>
                                        <option value="3">7 a 15</option>
                                        <option value="4">16 o +</option>
                                    </select>
                                </div>
                            </div>
                            <hr/>
                
                            <div className="row align-items-center justify-content-center">
                                <div className="col col-sm-12 col-md-7 col-lg-10 align-self-center text-center">
                                    <div className="card mt-4 card-height" >
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
                        <div className="container-fluid altura-minima">
                            <hr/>
                            <div className="row mt-4 mb-4 align-items-center justify-content-center">
                                <div className="col-4">
                                    <div className="input-group">
                                        <i className="input-group-text material-icons"> search </i>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            placeholder="Proba con <<Buenos Aires>> o <<Mendoza>>"
                                            name="office_province"
                                            autoComplete = "new-password"
                                            value={this.state.office_province}
                                            onChange={this.myChangeHandler} 
                                            disabled/>
                                    </div>
                                </div>
                                <div className="col-3">
                                        <select 
                                            className="form-select form-control-sm"
                                            name="type_workspace"
                                            value={this.state.type_workspace}
                                            onChange={this.myChangeHandler}
                                            disabled>
                                            <option defaultValue disabled value="">Tipo de espacio de trabajo</option>
                                            <option value="Buenos Aires">Oficina de planta completa / 1 a +50</option>
                                            <option value="Buenos Aires">Espacio de oficina / 1</option>
                                            <option value="Buenos Aires">Espacio individual / 1 a 15</option>
                                            <option value="Buenos Aires">Espacio de trabajo libre / 1 a 6</option>
                                        </select>

                                </div>
                                <div className="col-3">
                                    <select 
                                        className="form-select form-control-sm"
                                        name="amount_of_people"
                                        value={this.state.amount_of_people}
                                        onChange={this.myChangeHandler}
                                        disabled>
                                        <option defaultValue disabled value="">Número de personas</option>
                                        <option value="1">1</option>
                                        <option value="2">2 a 6</option>
                                        <option value="3">7 a 15</option>
                                        <option value="4">16 o +</option>
                                    </select>
                                </div>
                            </div>
                            <hr/>
                            <div className="row mt-3 mb-5 align-items-center justify-content-center">
                                <div className="col-10 mb-5">

                                    { this.state.offices.length > 0 ? ( 

                                        /*Mapeo todas las oficinas existentes en el .json */

                                        this.state.offices
                                            .map(office => <Office office = {office} key={office.prop_id} history={this.props.history}/>)

                                        ) : (

                                            <div className="text-center mt-5">
                                                <i className="material-icons size-ico-120 text-secondary">view_headline</i>
                                                <br/>
                                                <span className="text-secondary">Aun no hay oficinas cargadas.</span>
                                            </div>

                                        ) 
                                    }
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

export default Main;