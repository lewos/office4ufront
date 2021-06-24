import urlWebServices from './WebServices.js';

export const CheckOfficeAvailability = async (officeId, dateIn, dateOut) => {
    //url webservices
    let URL_API = urlWebServices.checkOfficeAvailability;

    let req = JSON.stringify({

        desde: dateIn,
        hasta: dateOut,
        idOficina: officeId,
        
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: req

        });

        let rdo = response.status;

        let data = await response.json();

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo validar disponibilidad."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const NewReservation = async (dateIn, dateOut, tenant, officeId, finalPrice, outstanding) => {
    //url webservices
    let URL_API = urlWebServices.newReservation;

    let req = JSON.stringify({

        desde: dateIn,
        hasta: dateOut,
        inquilino: tenant,
        idOficina: officeId,
        monto: parseInt(finalPrice),
        pendiente_pago: outstanding
    })

    try {
        const response = await fetch('http://' + URL_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: req

        });

        let rdo = response.status;

        switch(rdo) {
            case 201: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear la reserva."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}

export const GetReservationByTenant = async (userName) => {
    //url webservices
    let URL_API = urlWebServices.getReservationByTenant;

    try {
        const response = await fetch('http://' + URL_API + '/' + userName, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

        });

        let rdo = response.status;

        let data = await response.json();

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok", data}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo recuperar las reservas."});
            }
            default: {
                // Otro error
                return ({rdo:1, mensaje:"Ha ocurrido un error"});                
            }
        }
    }
    catch (error) {
        console.log(error);
    };
}