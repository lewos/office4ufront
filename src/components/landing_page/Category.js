import React, { Component } from 'react';

// Logo del proyecto.
//import LogoImg from '../../assets/img/logo.jpg'
//import IconoUsuario from '../../assets/img/person.svg'
import FullFloorOffice from '../../assets/img/full-floor-office.jpg'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            office_province: 'Buenos Aires',
        }
    }
    
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    searchOffice = () => {
        localStorage.setItem("office_province", this.state.office_province);
        this.props.history.push({
            pathname: '/buscar_oficina',
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        return (
            <div className="altura-minima" id="categoryView">
                <div className="categorias-box">
                    <div className="row">
                        <div className="title-Cateogrias">Categorías</div>
                    </div>
                    <div className="row">
                        <div className="description-Cateogrias">Estos son nuestros espacios disponibles para vos</div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card sombra">
                                <div className="row no-gutters">
                                    <div className="col-md-5 col-lg-5 align-self-center">
                                        <img src={FullFloorOffice} className="mr-2 card-img img-rooms" alt="Full-Floor-Office" />
                                    </div>
                                    <div className="col-md-7 col-lg-7">
                                        <div className="card-body">
                                            <span>Oficina de planta completa</span><br/>
                                            <span className="badge bg-dark mt-2"> 
                                                <i className="material-icons align-middle mr-2 size-ico-19">person</i>    
                                                1 a +50
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card sombra">
                                <div className="row no-gutters">
                                    <div className="col-md-5 col-lg-5 align-self-center">
                                        <img src="https://ctfassets.imgix.net/vh7r69kgcki3/2wwIw8X4gOhY1BM0GrJEEp/71ca4efc9af1ad9585e4a876ee8ee732/PRIVATE_ICON.png?auto=format%20compress&fit=crop&q=50&w=400&h=400 2x" className="card-img img-rooms" alt="Miniatura" />
                                    </div>
                                    <div className="col-md-7 col-lg-7">
                                        <div className="card-body">
                                            <span>Espacio de oficina</span><br/>
                                            <span className="badge bg-dark mt-2"> 
                                                <i className="material-icons align-middle mr-2 size-ico-19">person</i>    
                                                1 a 15
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card sombra">
                                <div className="row no-gutters">
                                    <div className="col-md-5 col-lg-5 align-self-center">
                                        <img src="https://ctfassets.imgix.net/vh7r69kgcki3/5unWhnHyutQ31UR1e2Sn8f/efb3aabb71975d24a80e5f0c66bc0c10/DEDICATED_ICON.png?auto=format%20compress&fit=crop&q=50&w=200&h=200" className="card-img img-rooms" alt="Miniatura" />
                                    </div>
                                    <div className="col-md-7 col-lg-7">
                                        <div className="card-body">
                                            <span>Espacio individual</span><br/>
                                            <span className="badge bg-dark mt-2"> 
                                                <i className="material-icons align-middle mr-2 size-ico-19">person</i>    
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card sombra">
                                <div className="row no-gutters">
                                    <div className="col-md-5 col-lg-5 align-self-center">
                                        <img src="https://ctfassets.imgix.net/vh7r69kgcki3/3j9aqbBpEAl7GYPX1CbAIo/49ca5c0cade38cb65f9de4f3241706bc/HOTDESK_ICON.png?auto=format%20compress&fit=crop&q=50&w=200&h=200" className="card-img img-rooms" alt="Miniatura" />
                                    </div>
                                    <div className="col-md-7 col-lg-7">
                                        <div className="card-body">
                                            <span>Espacio de trabajo libre</span><br/>
                                            <span className="badge bg-dark mt-2"> 
                                                <i className="material-icons align-middle mr-2 size-ico-19">person</i>    
                                                1 a 6
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4"></div>

                    <div className="row mt-5">
                        <div className="col-5">
                            <div className="row">
                                <div className="col"></div>
                                <div className="col">
                                    <div className="buscador-text">
                                    Encontrá tu espacio de trabajo
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-6">
                            <div className="buscador-description">
                                Ofrecemos oficinas de toda Argentina
                            </div>
                            <div className="row">
                                <div className="col-10">
                                    <select 
                                        className="form-select" 
                                        name="office_province"
                                        value={this.state.office_province}
                                        onChange={this.myChangeHandler}>
                                    <option defaultValue value="Buenos Aires">Buenos Aires</option>
                                    <option value="Córdoba">Córdoba</option>
                                    <option value="Mendoza">Mendoza</option>
                                    <option value="Neuquén">Neuquén</option>
                                    </select>
                                    <div className="buscador-button">
                                        <div className="d-grid gap-2">
                                            <button 
                                                type="button" 
                                                className="btn btn-dark btn-lg"
                                                onClick={this.searchOffice}>
                                                Empezar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-4"></div>
                        <div className="col-4"><hr/></div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Category;