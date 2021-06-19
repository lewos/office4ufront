import React, { Component } from 'react';
import FullFloorOffice from '../../../../assets/img/full-floor-office.jpg'


class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            office: 'none',
        };
     
        this.NewOffice = this.NewOffice.bind(this);
    }

    NewOffice = async (event) =>{
        let office = await this.setState({office: "Oficina de planta completa / 1 a +50"});
        await localStorage.setItem("office",office);
        this.redirect();
    }

    redirectToCompletePlant = () => {
        this.props.history.push({
            pathname: '/nueva_oficina',
            hash: '?planta_completa'
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    redirectToOfficeSpace = () => {
        this.props.history.push({
            pathname: '/nueva_oficina',
            hash: '?espacio_oficina'
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    redirectToIndividualSpace = () => {
        this.props.history.push({
            pathname: '/nueva_oficina',
            hash: '?espacio_individual'
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    redirectToFreeSpace = () => {
        this.props.history.push({
            pathname: '/nueva_oficina',
            hash: '?espacio_libre'
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    render() {
        return (
            <div>
                <div className="row align-items-center justify-content-center">
                    <div className="col col-sm-12 col-md-5 col-lg-5 align-self-center text-center">
                        <div className="d-grid gap-2">
                            <button 
                                type="button"
                                className="btn mt-4"
                                name="Oficina de planta completa / 1 a +50"
                                onClick={this.redirectToCompletePlant} > 
                                <div className="card sombra">
                                    <div className="row no-gutters">
                                        <div className="col-md-4 col-lg-4">
                                            <img src={FullFloorOffice} className="me-2 card-img img-rooms" alt="Full-Floor-Office" />
                                        </div>
                                        <div className="col-md-8 col-lg-8">
                                            <div className="card-body">
                                                <span>Oficina de planta completa</span> <br/>
                                                <span className="badge bg-dark mt-2">
                                                    <i className="material-icons align-middle me-2 size-ico-19">person</i>    
                                                    1 a +50
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-md-5 col-lg-5 align-self-center text-center">
                        <div className="d-grid gap-2">
                            <button 
                                type="button"
                                className="btn mt-4"
                                onClick={this.redirectToOfficeSpace} >  
                                <div className="card sombra">
                                    <div className="row no-gutters">
                                        <div className="col-md-4 col-lg-4">
                                            <img src="https://ctfassets.imgix.net/vh7r69kgcki3/2wwIw8X4gOhY1BM0GrJEEp/71ca4efc9af1ad9585e4a876ee8ee732/PRIVATE_ICON.png?auto=format%20compress&fit=crop&q=50&w=400&h=400 2x" className="card-img img-rooms" alt="Miniatura" />
                                        </div>
                                        <div className="col-md-8 col-lg-8">
                                            <div className="card-body">
                                                <span>Espacio de oficina</span><br/>
                                                <span className="badge bg-dark mt-2"> 
                                                    <i className="material-icons align-middle me-2 size-ico-19">person</i>    
                                                    1 a 15
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="row align-items-center justify-content-center mb-5">
                    <div className="col col-sm-12 col-md-5 col-lg-5 align-self-center text-center">
                        <div className="d-grid gap-2">
                            <button 
                                type="button"
                                className="btn mt-4" 
                                onClick={this.redirectToIndividualSpace} >  
                                <div className="card sombra">
                                    <div className="row no-gutters">
                                        <div className="col-md-4 col-lg-4">
                                            <img src="https://ctfassets.imgix.net/vh7r69kgcki3/5unWhnHyutQ31UR1e2Sn8f/efb3aabb71975d24a80e5f0c66bc0c10/DEDICATED_ICON.png?auto=format%20compress&fit=crop&q=50&w=200&h=200" className="card-img img-rooms" alt="Miniatura" />
                                        </div>
                                        <div className="col-md-8 col-lg-8">
                                            <div className="card-body">
                                                <span>Espacio individual</span> <br/>
                                                <span className="badge bg-dark mt-2">
                                                    <i className="material-icons align-middle me-2 size-ico-19">person</i>    
                                                    1
                                                </span>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-md-5 col-lg-5 align-self-center text-center">
                        <div className="d-grid gap-2">
                            <button 
                                type="button"
                                className="btn mt-4" 
                                onClick={this.redirectToFreeSpace} >  
                                <div className="card sombra">
                                    <div className="row no-gutters">
                                        <div className="col-md-4 col-lg-4">
                                            <img src="https://ctfassets.imgix.net/vh7r69kgcki3/3j9aqbBpEAl7GYPX1CbAIo/49ca5c0cade38cb65f9de4f3241706bc/HOTDESK_ICON.png?auto=format%20compress&fit=crop&q=50&w=200&h=200" className="card-img img-rooms" alt="Miniatura" />
                                        </div>
                                        <div className="col-md-8 col-lg-8">
                                            <div className="card-body">
                                                <span>Espacio de trabajo libre</span> <br/>
                                                <span className="badge bg-dark mt-2">
                                                    <i className="material-icons align-middle me-2 size-ico-19">person</i>    
                                                    1 a 6
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Rooms;