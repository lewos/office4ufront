import React, { Component } from 'react';

// Logo del proyecto.
//import LogoImg from '../../assets/img/logo.jpg'
import oficina from '../../assets/img/Home.jpg'
//import oficina from '../Images/oficina2.jpg'

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (

            <div className="altura-minima">
                <div>
                    <img src={oficina} className="img-fluid" alt="..."/>
                </div>
            </div>
        )
    }
}

export default Image;

//<img src={oficina} className="imagen-box" alt="Oficina"></img>