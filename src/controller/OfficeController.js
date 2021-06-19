import urlWebServices from './WebServices.js';

export const NewOffice = async (office_owner, category, office_province, office_city, office_neighborhood, office_address, office_address_number, office_surface, unit_floor, number_of_garages, antiquity, expenses, number_of_bathrooms, office_orientation, office_layout, arrServices, value_per_day, value_per_week, value_per_month, arrImage, published) => {
    //url webservices
    let URL_API = urlWebServices.newOffice;

    let req = JSON.stringify({

        propietario: office_owner,
        categoria: category,

        "ubicación": {
            "provincia": office_province,
            "ciudad": office_city,
            "barrio": office_neighborhood,
            "direccion": {
                "calle": office_address,
                "numero": parseInt(office_address_number),
            } ,
        },
        "propiedad": {
            "superficie": parseInt(office_surface),
            "piso": parseInt (unit_floor),
            "cocheras": parseInt (number_of_garages),
            "antiguedad": parseInt (antiquity),
            "expensas": parseFloat (expenses),
            "baños": parseInt (number_of_bathrooms),
            "orientación": office_orientation,
            "disposicion": office_layout
        },

        servicios: arrServices,

        "precio": {
            "dia": parseInt (value_per_day),
            "semana": parseInt (value_per_week),
            "mes": parseInt (value_per_month)
        },
        "opiniones": [
            {
              "calificación": 0,
              "comentario": "string",
              "dia": "2021-05-23T22:53:17.567Z"
            }
        ],
        "metodos_pago": 0,
        "estado": "string",
        "publicado": published,
        "imagenes": arrImage,

        "calendario_alquileres": [
            {
            "desde": "2021-05-23T22:53:17.567Z",
            "hasta": "2021-05-23T22:53:17.567Z",
            "inquilino": "string"
            }
        ]
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

        console.log(req)

        let rdo = response.status;

        switch(rdo) {
            case 201: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear la oficina."});
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

export const GetOfficesByOwner = async (userName) => {
    //url webservices
    let URL_API = urlWebServices.getOfficesByOwner;

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
                return ({rdo:1, mensaje:"No se pudo recuperar las officinas del usuario."});
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

export const GetOfficeById = async (officeId) => {
    //url webservices
    let URL_API = urlWebServices.getOfficeById;

    try {
        const response = await fetch('http://' + URL_API + '/' + officeId, {
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
                return ({rdo:1, mensaje:"No se pudo recuperar las officinas del usuario."});
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

export const GetOfficesByProvince = async (office_province) => {
    //url webservices
    let URL_API = urlWebServices.getOfficesByProvince;

    try {
        const response = await fetch('http://' + URL_API  + '/' + office_province, {
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
                return ({rdo:1, mensaje:"No se pudo recuperar las officinas."});
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

export const UpdateOfficeStatus = async (officeId, published) => {
    //url webservices
    let URL_API = urlWebServices.updateOfficeStatus;

    let req = JSON.stringify({

        publicado: published,
        
    })
    
    try {
        const response = await fetch('http://' + URL_API + '/' + officeId, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: req
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo actualizar la oficina."});
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