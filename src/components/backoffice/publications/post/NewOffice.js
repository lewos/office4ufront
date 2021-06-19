import React, { Component } from 'react';

// Componentes
import Nav from '../../Nav'
import LateralNav from '../../LateralNav'
import FormNewOffice from './FormNewOffice'
import Footer from '../../Footer'


class NewOffice extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChangeValue = e => this.setState({value: e.target.value});

    render() {
        return (
            <div>
                <Nav history={this.props.history} />
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-sm-12 col-md-5 col-lg-2 bg-light text-secondary margen-lateralNav border-right">
                                <LateralNav history={this.props.history} />
                            </div>
                            <div className="col">
                                

                                <FormNewOffice history={this.props.history} />


                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default NewOffice;