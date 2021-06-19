import React, { Component } from 'react';

// Imagenes
import ReactImg from '../../assets/img/react.png'
import LogoImg from '../../assets/img/Logo_White.png'

class Footer extends Component {
    render() {
        return (
            <div>
               <footer className="footer-color">
                    <div className="container">
                        <div className="row align-items-center mt-3">
                            <div className="col col-sm-12 col-md-6 col-lg-6 text-center">
                                <img 
                                    src={LogoImg} 
                                    width="134" 
                                    height="32" 
                                    alt="Office4U"/>
                            </div>
                            <div className="col col-sm-12 col-md-6 col-lg-6 justify-content-center">
                            {/*<!-- Social buttons -->*/}
                                <div className="text-center">
                                    <button
                                        className="btn text-reset cabecera-btn">
                                        <i className="fas fa-globe-americas text-white footer-icon-size"/>
                                    </button >
                                    <button
                                        className="btn text-reset cabecera-btn">
                                        <i className="fab fa-facebook text-white footer-icon-size"/>
                                    </button >
                                    <button
                                        className="btn text-reset cabecera-btn">
                                        <i className="fab fa-twitter text-white footer-icon-size"/>
                                    </button >
                                    <button
                                        className="btn text-reset cabecera-btn">
                                        <i className="fab fa-instagram text-white footer-icon-size"/>
                                    </button >
                                    <button
                                        className="btn text-reset cabecera-btn">
                                        <i className="fab fa-linkedin text-white footer-icon-size"/>
                                    </button >
                                    <button
                                        className="btn text-reset cabecera-btn">
                                        <i className="fab fa-youtube text-white footer-icon-size"/>
                                    </button >
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-white text-center py-4 mt-3">
                        Trabajá con nosotros &nbsp;&nbsp;
                        Términos y condiciones &nbsp;&nbsp;
                        Cómo cuidamos tu privacidad &nbsp;&nbsp;
                        Información financiera legal &nbsp;&nbsp;
                        Ayuda &nbsp;&nbsp;
                        Avisos legales &nbsp;&nbsp;
                    </div>
                    <hr/>
                    <div className="text-muted text-center py-3">© 2021 Copyright &nbsp;&nbsp;
                        Seminario II - Grupo 2  &nbsp;&nbsp; Powered by
                        <span className="text-white"></span>
                        <img src={ReactImg} alt="react" className="footer-size-img" />
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;