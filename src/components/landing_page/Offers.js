import React, { Component } from 'react';
import Office from './search/Office'
import img1 from '../../assets/img/office1.jpg'
import {GetOfficesByProvince as GetOfficesByProvinceAPI} from "../../controller/OfficeController";


class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offices: []
        }
    }

    searchOffice = () => {
        this.props.history.push('/buscar_oficina');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    componentDidMount() {
        this.getOffices();
    }

    getOffices = async () => {
        // Ejecuto el endopoint para consultar todas las officinas

        let office_province = "Buenos Aires"

        this.setState({loading: true});

        let getOfficesByProvinceAPI = await GetOfficesByProvinceAPI(office_province);

        this.setState({loading: false});

        if(getOfficesByProvinceAPI.rdo === 0) {
            this.setState({
                offices: getOfficesByProvinceAPI.data,
            })
        }
    }

    render() {
        return (
            <div className="altura-minima" id="offersView">
                <div className="categorias-box">
                    <div className="row"  >
                        <div className="title-Cateogrias">Ofertas</div>
                    </div>
                    <div className="row">
                        <div className="description-Cateogrias">Oficinas de oferta de Buenos Aires solo por hoy, no te las pierdas!!</div>
                    </div>
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
        )
    }
}

export default Offers;

