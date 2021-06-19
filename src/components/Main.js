import React, { Component } from 'react';

// Componentes
import Nav from './landing_page/Nav'
import Category from './landing_page/Category'
import Image from './landing_page/Image'
import OurCompany from './landing_page/OurCompany'
import HowToPost from './landing_page/HowToPost'
import Offers from './landing_page/Offers'
import Footer from './landing_page/Footer'

// Importo llamada a endpoint
//import {GetPropertyByOwnerId as PropertiesAPI} from "../controller/MainController";

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
                        <div className="row ">
                            <div className="col col-sm-12 col-md-12 col-lg-12 text-center">
                                <Image history={this.props.history}/>
                                <Category history={this.props.history}/>
                                <OurCompany history={this.props.history}/>
                                <HowToPost history={this.props.history}/>
                                <Offers history={this.props.history}/>
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