import React, { Component } from 'react';

// Logo del proyecto.
import oficina from '../../assets/img/health-safety.jpg'

class OurCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (

            <div className="altura-minima" id="weView">
                <div className="categorias-box">
                    <div className="row mb-4">
                        <div className="title-Cateogrias">Nuestra compañía</div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-7" >
                            <img src={oficina} className="img-fluid" alt="Oficina" />
                        </div>
                        <div className="col-5 text-start">
                            <h4 className="text-decoration-underline">La nueva normalidad del espacio de trabajo</h4>
                            <p className="rr16 mt-4 mb-5 text-justify">Office4U se fundó en 2021 con el objetivo de unir espacios de encuentro de personas y empresas en los que pudieran realizar el mejor trabajo posible. Desde el alquiler de nuestra primera oficina, hemos crecido hasta convertirnos en un proveedor de lugares de trabajo a nivel nacional con el firme compromiso de ofrecer soluciones flexibles, espacios inspiradores y seguros, y experiencias comunitarias inigualables. En la actualidad, trabajamos para transformar la forma en la que el lugar de trabajo puede ayudar a todos a sentirse más motivados, productivos y felices: porque así es como funciona el mañana.</p>
                            <button type="button" className="btn btn-dark">Contactate con nosotros</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-secondary" role="alert">
                                <i className="material-icons align-middle guardar">coronavirus</i>
                                <button 
                                    type="button" 
                                    className="btn btn-link link-guardar text-reset">
                                    Conocé más sobre nuestra respuesta frente al COVID-19.
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4"><hr/></div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OurCompany;

