import React, { Component } from 'react';

// Componentes
import Nav from './Nav'
import LateralNav from './LateralNav'
import Footer from './Footer'

import LogoImg from '../../assets/img/Logo_Black.png'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_search: '',
        };
        
    }

    setTextFilter(event){
        var text_search = event.target.value
        this.setState({
            text_search: text_search,
        })
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
                                            <h4 className="rr22">Bienvenido!</h4>
                                            <form class="d-flex"> 
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
                                    <hr/>
                                    
                                    <div className="row mt-5 mb-5"></div>
                                    <div className="row mt-5 mb-5"></div>

                                    <div className="row mt-5">
                                        <div className="col align-self-center text-center">
                                            <img 
                                                src={LogoImg} 
                                                className="img-watermark"
                                                alt="Office4U"/>
                                        </div>
                                    </div>

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