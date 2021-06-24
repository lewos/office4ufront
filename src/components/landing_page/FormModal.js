import React, { Component } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const send = require('gmail-send')({
    user: 'notificacioneso4u@gmail.com',
    pass: 'rowcjikneadsrcfb',
    to:   'matiasdv@uai.edu.ar',
    subject: 'Contacto Office 4U',
  });

class FormModal extends Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }

    handleSubmit() {
      send({
        text:    'gmail-send example 1',  
      }, (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
      })

          this.setState({ showModal: false });
      }
    
    render () {
      return (
        <div>
          <button className="btn btn-dark" onClick={this.handleOpenModal}>Coordinar visita</button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Minimal Modal Example"
             style={customStyles}
          >

    <form>
        <h5 class="modal-title">Coordinar visita</h5>
        
        <div class="modal-body">
            <p>Completar los siguientes campos y en breve nos comunicaremos con usted</p>
            
            <div className="row" style={{padding:'10px'}}>
                <input type="text" className="form-control" placeholder="Nombre" required/>
            </div>
            <div className="row" style={{padding:'10px'}}>
                <input type="text" className="form-control" placeholder="Apellido" required/>
            </div>
            <div className="row" style={{padding:'10px'}}>
                <input type="email" className="form-control" placeholder="Email" required/>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>Cancelar</button>
            <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Enviar</button>
        </div>
        </form>


          </ReactModal>
        </div>
      );
    }
  }
  
  export default FormModal;

  //<button onClick={this.handleCloseModal}>Close Modal</button>