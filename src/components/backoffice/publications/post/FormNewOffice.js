import React, { Component } from 'react';

// Imagenes
import noImage from '../../../../assets/img/noImage.jpg'
import mercadopago from '../../../../assets/img/mercadopago.png'

// Importo llamada a endpoint
import {NewOffice as NewOfficeAPI} from "../../../../controller/OfficeController";

class FormNewOffice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classNameForm: 'form-control form-control-sm',
            className: 'btn btn-outline-primary',
            activeView: 'main_form',
            icon: 'filter_1',
            checked: false,
            msj_error: 'Campo requerido',

            office_owner: localStorage.getItem('nombre'),
            
            category: window.location.hash,

            fileOne: noImage,
            fileTwo: noImage,
            fileThree: noImage,
            fileFour: noImage,

            // Workspace location
            office_province: '',
            office_city: '',
            office_neighborhood: '',
            office_address: '',
            office_address_number: '',

            // Property description
            office_surface: '',
            unit_floor: '',
            number_of_garages: '',
            antiquity: '',
            expenses: '',
            number_of_bathrooms: '',
            office_orientation: '',
            office_layout: '',

            // Comforts and amenities
            services: [
                {id: 0, name: "Servicio de limpieza", isChecked: false},
                {id: 1, name: "Espacio para eventos", isChecked: false},
                {id: 2, name: "Aire acondicionado", isChecked: false},
                {id: 3, name: "Calefacción", isChecked: false},
                {id: 4, name: "Recepción", isChecked: false},
                {id: 5, name: "Ascensor", isChecked: false},
                {id: 6, name: "Seguridad 24 horas", isChecked: false},
                {id: 7, name: "Línea telefónica", isChecked: false},
                {id: 8, name: "Sala de lactancia", isChecked: false},
                {id: 9, name: "Guardabicis", isChecked: false},
                {id: 10, name: "Se permiten mascotas", isChecked: false},
                {id: 11, name: "Dispensadores automáticos", isChecked: false}
            ],

            value_per_day: '',
            value_per_week: '',
            value_per_month: '',

            published: false,

            acceptedTerms: false

        };

        this.handleActiveView = this.handleActiveView.bind(this);
        this.handleImageOne = this.handleImageOne.bind(this)
        this.handleImageTwo = this.handleImageTwo.bind(this)
        this.handleImageThree = this.handleImageThree.bind(this)
        this.handleImageFour = this.handleImageFour.bind(this)
        this.goBack = this.goBack.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    myChangeHandlerServices = (event) => {
        let nam = event.target.name;
        let services = this.state.services
        services.forEach(service => {
            if (service.name === nam) {
                service.isChecked = event.target.checked
            }
        })
        this.setState({[services]: services});
    }

    validateForm = () => {
        if(this.state.office_city === '') {
            // this.setState({msj_error: !this.state.msj_error})
            this.setState({classNameForm: "form-control form-control-sm is-invalid"})
        }
    }

    // Validacion de los datos ingresados por el usuario.
    handleSubmit = async (event) =>{
        event.preventDefault();

        let nam = event.target.name;

        let published;

        if(nam === 'Post') {
            published = true;
        } else {
            published = false;
        }
        
        var arrImage = []
        arrImage.push('https://d28m5bx785ox17.cloudfront.net/v1/img/IOZsuZmp-kOKvwNwlQjMbD2R_0THT-zb6xtuLpEgjNo=/d/l');
        

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        let office_owner = this.state.office_owner;

        let category = this.state.category;

        let office_province = this.state.office_province;
        let office_city = this.state.office_city;
        let office_neighborhood = this.state.office_neighborhood;
        let office_address = this.state.office_address;
        let office_address_number = this.state.office_address_number;

        let office_surface = this.state.office_surface;
        let unit_floor = this.state.unit_floor;
        let number_of_garages = this.state.number_of_garages;
        let antiquity = this.state.antiquity;
        let expenses = this.state.expenses;
        let number_of_bathrooms = this.state.number_of_bathrooms;
        let office_orientation = this.state.office_orientation;
        let office_layout = this.state.office_layout;

        var arrServices = []
        this.state.services.forEach(service => {
            if (service.isChecked) {
                arrServices.push(service.name)
            }
        })

        //console.log(arrServices);

        let value_per_day = this.state.value_per_day;
        let value_per_week = this.state.value_per_week;
        let value_per_month = this.state.value_per_month;

        this.setState({activeView: "loading"});

        let postNewOffice = await NewOfficeAPI(office_owner, category, office_province, office_city, office_neighborhood, office_address, office_address_number, office_surface, unit_floor, number_of_garages, antiquity, expenses, number_of_bathrooms, office_orientation, office_layout, arrServices, value_per_day, value_per_week, value_per_month, arrImage, published);

        if(postNewOffice.rdo === 0 ) {
            this.setState({activeView: "success"});
        } else {
            this.setState({activeView: "error"});
        }
        
    }

    handleCheckAcceptedTerms(event){
        this.setState({ acceptedTerms: !this.state.acceptedTerms });
    }

    handleImageOne(event) {
        this.setState({
            fileOne: window.URL.createObjectURL(
                new Blob([event.target.files[0]], {
                type: "image/png",
                })
            )
        })
    }

    handleImageTwo(event) {
        this.setState({
            fileTwo: window.URL.createObjectURL(
                new Blob([event.target.files[0]], {
                type: "image/png",
                })
            )
        })
    }

    handleImageThree(event) {
        this.setState({
            fileThree: window.URL.createObjectURL(
                new Blob([event.target.files[0]], {
                type: "image/png",
                })
            )
        })
    }

    handleImageFour(event) {
        this.setState({
            fileFour: window.URL.createObjectURL(
                new Blob([event.target.files[0]], {
                type: "image/png",
                })
            )
        })
    }

    handleActiveView(e) {
        const { name } = e.target;
        this.setState(() => ({
            activeView: name
        }));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

    Home = () => {
        this.props.history.push('/inicio');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    Post = () => {
        this.props.history.push('/publicar');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    Published = () => {
        this.props.history.push('/publicados');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    goBack(){
        this.props.history.goBack();
    }

    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    myChangeHandlerServices = (event) => {
        let nam = event.target.name;
        let services = this.state.services
        services.forEach(service => {
           if (service.name === nam) {
                service.isChecked = event.target.checked
           }
        })
        this.setState({[services]: services});
    }

    myChangeHandlerInstallations = (event) => {
        let nam = event.target.name;
        let installations = this.state.installations
        installations.forEach(installation => {
           if (installation.name === nam) {
                installation.isChecked = event.target.checked
           }
        })
        this.setState({[installations]: installations});
    }

    onClick = () => {
        this.setState({
          checked: !this.state.checked
        });
      }

    render() {
        const category = this.state.category;
        switch(this.state.activeView) {
        case "loading": 
        return (
            <div>
                <div className="card mt-5">
                    <div className="card-body mt-5 mb-5">
                        <div className="container text-center">
                            <div className="spinner-border text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <br/>
                            <p className="text-muted mt-5">Estamos publicando tu oficina!</p>
                        </div>    
                    </div>
                </div>
            </div>
        )
        case "main_form":
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col">
                                <h4 className="rr22">Describí el espacio que queres poner en alquiler</h4>
                            </div>    
                        </div>
                        
                        <div className="row mt-4">
                            <div className="col">
                                <h4 className="rr16-cyan">Categoría</h4>
                            </div>    
                        </div>
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-4 align-self-center">

                                { category==="#?planta_completa" ? ( <span className="text-muted p-2">Oficina de planta completa / 1 a +50</span> ) : null }
                                { category==="#?espacio_oficina" ? ( <span className="text-muted p-2">Espacio de oficina / 1 a 15</span> ) : null }
                                { category==="#?espacio_individual" ? ( <span className="text-muted p-2">Espacio individual / 1</span> ) : null }
                                { category==="#?espacio_libre" ? ( <span className="text-muted p-2">Espacio de trabajo libre / 1 a 6</span> ) : null }

                            </div>
                            <div className="col">
                            <button 
                                type="button" 
                                className="btn btn-link rr16-cyan"
                                onClick={this.goBack} >
                                    Modificar
                            </button>
                            </div>
                        </div>
                            
                        <hr/>

                        <div className="row mt-4">
                            <div className="col">
                                <h4 className="rr16-cyan">Ingresa fotos de tu espacio de trabajo</h4>
                                <div className="row mt-4">
                                    <div className="col-3">
                                        <div>
                                            <div className="mb-3">
                                                <input 
                                                    type="file" 
                                                    className="form-control form-control-sm" 
                                                    id="customFile"
                                                    onChange={this.handleImageOne} />
                                                
                                            </div>
                                            <img alt="" className="img-thumbnail mt-2 img-uploadFile" src={this.state.fileOne}/>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div>
                                            <div className="mb-3">
                                                <input 
                                                    type="file" 
                                                    className="form-control form-control-sm" 
                                                    id="customFile"
                                                    onChange={this.handleImageTwo} />
                                            </div>
                                            <img alt="" className="img-thumbnail mt-2 img-uploadFile" src={this.state.fileTwo}/>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div>
                                            <div className="mb-3">
                                                <input 
                                                    type="file" 
                                                    className="form-control form-control-sm" 
                                                    id="customFile"
                                                    onChange={this.handleImageThree} />
                                            </div>
                                            <img alt="" className="img-thumbnail mt-2 img-uploadFile" src={this.state.fileThree}/>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div>
                                            <div className="mb-3">
                                                <input 
                                                    type="file" 
                                                    className="form-control form-control-sm" 
                                                    id="customFile"
                                                    onChange={this.handleImageFour} />
                                            </div>
                                            <img alt="" className="img-thumbnail mt-2 img-uploadFile" src={this.state.fileFour}/>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>

                        <hr/>

                        
                        <div className="row mt-4">
                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                <h4 className="rr16-cyan">Ubicación de tu espacio de trabajo</h4>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="rr14">Provincia</label>
                                        <select 
                                            className="form-control form-control-sm"
                                            name="office_province"
                                            value={this.state.office_province}
                                            onChange={this.myChangeHandler}>
                                            <option defaultValue disabled value="">Seleccione una opci&oacute;n...</option>
                                            <option value="Buenos Aires">Buenos Aires</option>
                                            <option value="Catamarca">Catamarca</option>
                                            <option value="Chaco">Chaco</option>
                                            <option value="Chubut">Chubut</option>
                                            <option value="Córdoba">C&oacute;rdoba</option>
                                            <option value="Corrientes">Corrientes</option>
                                            <option value="Entre Ríos">Entre R&iacute;os</option>
                                            <option value="Formosa">Formosa</option>
                                            <option value="Jujuy">Jujuy</option>
                                            <option value="La Pampa">La Pampa</option>
                                            <option value="La Rioja">La Rioja</option>
                                            <option value="Mendoza">Mendoza</option>
                                            <option value="Misiones">Misiones</option>
                                            <option value="Neuquén">Neuqu&eacute;n</option>
                                            <option value="Río Negro">R&iacute;o Negro</option>
                                            <option value="Salta">Salta</option>
                                            <option value="San Juan">San Juan</option>
                                            <option value="San Luis">San Luis</option>
                                            <option value="Santa Cruz">Santa Cruz</option>
                                            <option value="Santa Fe">Santa Fe</option>
                                            <option value="Santiago del Estero">Santiago del Estero</option>
                                            <option value="Tierra del Fuego">Tierra del Fuego</option>
                                            <option value="Tucumám">Tucum&aacute;n</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Ciudad</label>
                                        <input 
                                            type="text" 
                                            className={this.state.classNameForm}
                                            placeholder="Ciudad"
                                            name="office_city"
                                            value={this.state.office_city}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Barrio</label>
                                        <input 
                                            type="text" 
                                            className={this.state.classNameForm}
                                            placeholder="Barrio"
                                            name="office_neighborhood"
                                            value={this.state.office_neighborhood}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col col-sm-12 col-md-4 col-lg-4">
                                        <label className="rr14">Calle</label>
                                        <input 
                                            type="text" 
                                            className={this.state.classNameForm}
                                            placeholder="Calle"
                                            name="office_address"
                                            value={this.state.office_address}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col col-sm-12 col-md-4 col-lg-4">
                                        <label className="rr14">Número</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Número"
                                            name="office_address_number"
                                            value={this.state.office_address_number}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                            </div>
                            
                            {/* <div className="col col-sm-12 col-md-5 col-lg-5">
                                <Map
                                    googleMapURL = {mapURL}
                                    containerElement = {<div style = {{height: '200px'}} />}
                                    mapElement = {<div style = {{height: '100%'}} />}
                                    loadingElement = {<p>Cargando Maps</p>}
                                />
                            </div> */}
                        </div>

                        <hr/>

                        <div className="row mt-4">
                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                <h4 className="rr16-cyan">Describe tu inmueble</h4>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="rr14">Superficie total</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Superficie total en m2"
                                            name="office_surface"
                                            value={this.state.office_surface}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Número de piso de la unidad</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Número de piso de la unidad"
                                            name="unit_floor"
                                            value={this.state.unit_floor}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Cocheras</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Cocheras"
                                            name="number_of_garages"
                                            value={this.state.number_of_garages}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Antigüedad</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Antigüedad"
                                            name="antiquity"
                                            value={this.state.antiquity}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <label className="rr14">Expensas</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Expensas"
                                            name="expenses"
                                            value={this.state.expenses}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Baños</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Baños por piso"
                                            name="number_of_bathrooms"
                                            value={this.state.number_of_bathrooms}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Orientación</label>
                                        <select 
                                            className={this.state.classNameForm}
                                            name="office_orientation"
                                            value={this.state.office_orientation}
                                            onChange={this.myChangeHandler}>
                                            <option defaultValue disabled value="">Elegir</option>
                                            <option value="Norte">Norte</option>
                                            <option value="Oeste">Oeste</option>
                                            <option value="Sur">Sur</option>
                                            <option value="Este">Este</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Disposición</label>
                                        <select 
                                            className={this.state.classNameForm}
                                            name="office_layout"
                                            value={this.state.office_layout}
                                            onChange={this.myChangeHandler}>
                                            <option defaultValue disabled value="">Elegir</option>
                                            <option value="Contrafrente">Contrafrente</option>
                                            <option value="Frente">Frente</option>
                                            <option value="Interno">Interno</option>
                                            <option value="Lateral">Lateral</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row mt-4">
                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                <h4 className="rr16-cyan">Comodidades y amenities</h4>
                                <div className="row mt-3">
                                    
                                        { this.state.services.map(service =>{
                                                return(
                                                    <div className="col-4" key={service.id}>
                                                        <div className="input-group mb-2" onClick={this.onClick}>
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <div>
                                                                        <input 
                                                                            
                                                                            type="checkbox" 
                                                                            name={service.name}
                                                                            value={service.name}
                                                                            checked={service.checked}
                                                                            onChange={this.myChangeHandlerServices}/>
                                                                            
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        <input className="form-control" type="text" placeholder={service.name} key={service.id} disabled/>
                                                        </div>
                                                    </div>
                                        ) } ) }
                                    
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row mt-4">
                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                <h4 className="rr16-cyan">¿Cuál va a ser el valor del alquiler?</h4>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="rr14">Por día</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Valor por día en $ ARG"
                                            name="value_per_day"
                                            value={this.state.value_per_day}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Por semana</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Valor por semana en $ ARG"
                                            name="value_per_week"
                                            value={this.state.value_per_week}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="col">
                                        <label className="rr14">Por mes</label>
                                        <input 
                                            type="number" 
                                            className={this.state.classNameForm}
                                            placeholder="Valor por mes en $ ARG"
                                            name="value_per_month"
                                            value={this.state.value_per_month}
                                            onChange={this.myChangeHandler}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row mt-4">
                            <div className="col col-sm-12 col-md-12 col-lg-12">
                                <h4 className="rr16-cyan">¿Cómo te gustaría que te paguen?</h4>
                                <div className="row mt-3">
                                    <div className="col col-sm-12 col-md-12 col-lg-12">
                                        <div className="card">
                                            <div className="row no-gutters">
                                                <div className="col col-md-2 col-lg-2 align-self-center text-center">
                                                <input type="checkbox" defaultChecked="checked"/> 
                                                </div>
                                                <div className="col col-md-10 col-lg-10">
                                                    <div className="card-body text-info">
                                                        <h6 className="card-title">Lo coordino con el locatario</h6>
                                                        <span>Una vez realizada la reserva, el nuevo locatario tendrá hasta 48hrs para contactarse contigo y coordinar el pago. Pasadas esas 48hrs la reserva caducará sin costo alguno.</span><br/>
                                                        <span className="badge badge-dark mt-2"> 
                                                            <i className="material-icons align-middle">attach_money</i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col col-sm-12 col-md-12 col-lg-12">
                                        <div className="card">
                                            <div className="row no-gutters">
                                                <div className="col col-md-2 col-lg-2 align-self-center text-center">
                                                <input type="checkbox" disabled/> 
                                                </div>
                                                <div className="col col-md-10 col-lg-10">
                                                    <div className="card-body text-secondary">
                                                        <h6 className="card-title">Pago en el momento con MercadoPago</h6>
                                                        <span>Office4U gestionará el pago por medio de la plataforma de MercadoPago. No tendrás que hacer nada.</span><br/>
                                                        <span className="mt-2"> 
                                                            <img alt="MercadoPago" className="mt-2" src={mercadopago}/>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row mt-5">
                            <div className="col ms-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input mt-2" onChange={(event) => this.handleCheckAcceptedTerms(event)}/>
                                    <label className="form-check-label">
                                        Acepto los  
                                        <button 
                                            type="button" 
                                            className="btn btn-link btn-terms-and-conditions"
                                            disabled>
                                                Términos y condiciones
                                        </button>
                                        al momento de publicar mi oficina en Office4U.
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4 mb-5">
                            <div className="col">
                                { this.state.acceptedTerms ? 
                                    <button 
                                        type="button" 
                                        className="btn btn-office4u"
                                        name="Post"
                                        onClick={this.handleSubmit}>
                                            Finalizar y Publicar
                                    </button> : 
                                    <button 
                                        type="button" 
                                        className="btn btn-office4u"
                                        disabled >
                                            Finalizar y Publicar
                                    </button> 
                                }
                            </div>    
                            <div className="col text-end">
                                { this.state.acceptedTerms ? 
                                    <button 
                                        type="button" 
                                        className="btn btn-office4u-outline me-4"
                                        onClick={this.handleSubmit}>
                                            Guardar
                                    </button> : 
                                    <button 
                                        type="button" 
                                        className="btn btn-office4u-outline me-4"
                                        disabled >
                                            Guardar
                                    </button> 
                                }
                                <button 
                                    type="button" 
                                    className="btn btn-office4u-outline"
                                    onClick={this.Home}>
                                        Salir
                                </button>
                            </div>    
                        </div>

                    </div>
                </div>
            )
            
        case "success":
            return(
                <div>    
                    <div className="card mt-5 card-succes-form">
                        <div className="card-body text-center">
                                <div className="mt-4"></div>
                                <i className="material-icons ico-success">done</i>
                                <br/>
                                <h2>Listo!</h2>
                                <p><span className="font-weight-bold"> {this.state.office_address} {this.state.office_address_number} </span> ya est&aacute; publicada.</p>
                                {/* <p><span className="font-weight-bold"> Godoy Cruz 2234 </span> ya est&aacute; publicada.</p> */}
                                <small className="text-muted">La podés ver en la sección: &nbsp;
                                   
                                </small>
                                <button 
                                        type="button" 
                                        className="btn btn-link btn-new-office pad-left" 
                                        onClick={this.Published}>Publicados.
                                    </button>
                                <div className="mb-5"></div>
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
            )
            
        case "error":
                return(
                    <div>
                        <div className="card mt-5 border-secondary">
                            <div className="card-body text-center">
                            <div className="mt-4"></div>
                                <i className="material-icons ico-error">priority_high</i>
                                <br/>
                                <h2>Algo salió mal.</h2>
                                <p>No se pudo cargar la oficina <span className="font-weight-bold">{this.state.property_address} {this.state.office_address_number}</span></p>
                                {/* <p>No pudimos cargar la oficina <span className="font-weight-bold">Godoy Cruz 2234</span>, pero no te preocupes. </p> */}
                                <div className="mb-4"></div>
                                <button 
                                    type="button" 
                                    className="btn btn-office4u-outline btn-sm"
                                    onClick={this.Post}>
                                        Volvamos a intentarlo
                                </button>
                                <div className="mb-5"></div>
                            </div>
                        </div>
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

export default FormNewOffice;