import React, { Component } from 'react';

// Logo del proyecto.
import Logo from "../../assets/img/Logo_Black.png"

// Importo llamada a endpoint
import {Login as LoginAPI} from "../../controller/LoginController";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_pass: '',
            usuarioValido: false,
            msj_error: false,
            className: 'form-control',
            source: window.location.hash,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Validacion de usuario segun el rol del mismo.
    handleSubmit = async (event) =>{
        event.preventDefault();
        
        // Ejecuto el endopoint para validar login
        let getLogin = await LoginAPI(this.state.user_name, this.state.user_pass);

        if(getLogin.rdo === 0 ) {
            this.setState({usuarioValido: true});
            
            if(this.state.source === "#?searchView") {
                this.props.history.push({
                    pathname: '/buscar_oficina',
                })
            } else {
                this.props.history.push({
                    pathname: '/home',
                })
            }
        } else {
            if(this.state.msj_error === false) {
                this.setState({msj_error: !this.state.msj_error})
                this.setState({className: "form-control is-invalid"});
            }
        }
    }
    
    // Maneja los datos ingresados por el usuario.
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    // signUp = () => {
    //     this.props.history.push({
    //         pathname: '/nuevo_usuario',
    //     })
    // }
    render() {
        return (

            <div className="fondo-login">
                <div className="container">
                    <div className="row align-items-center justify-content-center vh-100">
                        <div className="col-sm-12 col-md-5 col-lg-5 align-self-center">
                            <div className="card">
                                <div className="card-body" >
                                    <img src={Logo} className="mx-auto d-block mt-2" width="180" alt="Usuario"/>
                                    <h4 className="text-center p-3 mt-2">Bienvenido</h4>

                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row justify-content-center p-3">
                                            <div className="col-sm-12 col-md-10 col-lg-10">
                                                <div className="mb-3">
                                                    <input 
                                                        name="user_name" 
                                                        type="text" 
                                                        className={this.state.className}
                                                        autoComplete="off" 
                                                        autoFocus={true}
                                                        required
                                                        placeholder="Correo electr&oacute;nico"
                                                        value={this.state.user_name}
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-10 col-lg-10">
                                                <div className="mb-3">
                                                    <input 
                                                        name="user_pass" 
                                                        type="password" 
                                                        className={this.state.className}
                                                        autoComplete="off" 
                                                        required
                                                        placeholder="Contrase&ntilde;a" 
                                                        value={this.state.user_pass }
                                                        onChange={this.myChangeHandler} />
                                                </div>
                                            </div>
                                            { this.state.msj_error ? ( <small className="text-danger text-center">Ingresa un correo electr&oacute;nico y contrase&ntilde;a validos</small> ) : null }
                                        </div>
                                        
                                        <div className="row p-3 justify-content-center">
                                            <div className="col-sm-12 col-md-10 col-lg-10 d-grid gap-2">
                                                    <button 
                                                        type="submit" 
                                                        id="submit-btn" 
                                                        className="btn btn-dark">
                                                        Iniciar sesi&oacute;n
                                                    </button>
                                                <div className="text-right">
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link float-end text-muted" >
                                                            <small>¿Necesitas ayuda?</small>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> 
                                    </form>
                                </div>
                                <div className="card-footer text-muted text-center mb-2 mt-2">
                                    <div style={{fontSize: "14px"}}>¿Primera vez?
                                    <button 
                                        type="button" 
                                        className="btn btn-link pad-left"
                                        style={{fontSize: "14px"}}
                                        // onClick={this.signUp}
                                        >
                                        Crea tu cuenta
                                    </button>
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

export default Login;