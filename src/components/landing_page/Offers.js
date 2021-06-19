import React, { Component } from 'react';


class Offers extends Component {
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

            <div className="altura-minima" id="offersView">
                <div className="categorias-box">
                    <div className="row">
                        <div className="title-Cateogrias">Ofertas</div>
                    </div>
                    <div className="row">
                        <div className="description-Cateogrias">Ofertas disponibles para el día de hoy.</div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="text-center mt-5">
                                <i className="material-icons size-ico-120 text-secondary">engineering</i>
                                <br/>
                                <span className="text-secondary">Estamos construyendo esta sección.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Offers;