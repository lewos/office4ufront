import React, { Component } from 'react';


class HowToPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    searchOffice = () => {
        this.props.history.push('/buscar_oficina');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    render() {
        return (

            <div className="altura-minima" id="rentMyOfficeView">
                <div className="categorias-box">
                    <div className="row">
                        <div className="title-Cateogrias">Quiero alquilar mi oficina</div>
                    </div>
                    <div className="row">
                        <div className="description-Cateogrias">Conocé el paso a paso para publicarla.</div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="card text-center">
                            <span className="material-icons ico-published mt-4 mb-3">login</span>
                                <div className="card-body">
                                    <h5 className="card-title">Registrate</h5>
                                    <p className="card-text">Inicia sesión en nuestro sistema donde encontrarás distintas secciones para cargar tu oficina, administrarla, elegir medios de pago, seleccionar las fechas en la que va a estar disponible y gestionar las reservas. Además podrás editar tus propiedades favoritas.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card text-center">
                            <span className="material-icons ico-published mt-4 mb-3">fact_check</span>
                                <div className="card-body">
                                    <h5 className="card-title">Seleccioná tu espacio de trabajo</h5>
                                    <p className="card-text">En esta sección podrás elegir entre 4 tipos distintos de espacios de trabajo según lo que se adapte mejor a tus necesidades. Contamos con las categorías: Oficina de planta completa, Espacio de oficina, Espacio individual y Espacio de trabajo libre. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card text-center">
                            <span className="material-icons ico-published mt-4 mb-3">publish</span>
                                <div className="card-body">
                                    <h5 className="card-title">Publicá</h5>
                                    <p className="card-text">Por último, deberás completar un formulario con los datos básicos sobre tu propiedad, detallando sus servicios y comodidades así como también el precio al cual la vas a publicar ya sea por día, semana o mes. Al finalizar tu propiedad ya estará disponible para ser alquilada. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                            <div className="col-4"></div>
                            <div className="col-4 d-grid gap-2">
                                <button type="button" className="btn btn-dark mt-4">Publicá tu oficina ahora.</button>
                            </div>
                            <div className="col-4"></div>
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

export default HowToPost;