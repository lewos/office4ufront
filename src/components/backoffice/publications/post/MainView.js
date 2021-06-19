import React, { Component } from 'react';

// Componentes
import Nav from '../../Nav'
import LateralNav from '../../LateralNav'
import Rooms from './Rooms'
import Footer from '../../Footer'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            text_search: '',
            loading: false,
        };
        
    }

    render() {
        return (
            <div>
                <Nav history={this.props.history} />
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                <LateralNav history={this.props.history}/>
                            </div>
                            <div className="col">
                                <div className="container-fluid">
                                    <div className="row mt-4">
                                        <nav className="navbar navbar-light w-100">
                                            <h4 className="rr22">¡Hola! Antes que nada contanos,<br/>¿cómo es el espacio de trabajo que vas a publicar?</h4>
                                        </nav>
                                    </div>
                                    <hr/>
                                    
                                    <Rooms history={this.props.history}/>

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

export default Main;