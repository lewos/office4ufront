import React, { Component } from 'react';

// Componentes
import Nav from '../../Nav'
import LateralNav from '../../LateralNav'
import Office from './Office'
import Footer from '../../Footer'

// Importo llamada a endpoint
import {GetOfficesByOwner as GetOfficesByOwnerAPI} from "../../../../controller/OfficeController";

class Published extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offices: [],
            text_search: '',
            loading: false,
        };
        
    }

    componentDidMount() {
        this.getOffices();
    }

    setTextFilter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
    }

    getOffices = async () => {
        // Ejecuto el endopoint para consultar todas las officinas
        const userName = localStorage.getItem('nombre') 
        this.setState({loading: true});
        let getOfficesByOwnerAPI = await GetOfficesByOwnerAPI(userName);
        this.setState({loading: false});
        if(getOfficesByOwnerAPI.rdo === 0) {
            this.setState({
                offices: getOfficesByOwnerAPI.data,
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
                                    <div className="card mt-4 card-height align-items-center justify-content-center border-light mt-5" >
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
                                                <h4 className="rr22">Publicaciones</h4><br/>
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
                                        <span className="rr16 text-muted">En esta sección podrás administrar tus oficinas.</span>
                                        <hr/>

                                        { this.state.offices.length > 0 ? ( 

                                            /*Mapeo todas las propiedades existentes en el .json */

                                            this.state.offices
                                                .filter(office => office.ubicación.direccion.calle.toLowerCase().includes(this.state.text_search.toLowerCase()))
                                                .map(office => <Office office = {office} key={office.prop_id} history={this.props.history}/>)

                                            ) : (

                                                <div className="text-center mt-5">
                                                    <i className="material-icons size-ico-120 text-secondary">view_headline</i>
                                                    <br/>
                                                    <span className="text-secondary">Aun no tienes oficinas cargadas, crea una desde la sección Publicaciones / Publicar.</span>
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