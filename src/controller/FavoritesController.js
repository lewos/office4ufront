import urlWebServices from './WebServices.js';


export const CreateFavourite = async (userName, favourite) => {
    //url webservices
    let URL_API = urlWebServices.createFavourite;

    let req = JSON.stringify({
        userName: userName,
        idOficina: favourite
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
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo crear el favorito del usuario."});
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

export const GetFavorites = async (userName) => {
    //url webservices
    let URL_API = urlWebServices.getFavorites;

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
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo obtener los favoritos del usuario."});
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

export const DeleteFavourite = async (favouriteId) => {
    //url webservices
    let URL_API = urlWebServices.deleteFavourite;

    try {
        const response = await fetch('http://' + URL_API + '/' + favouriteId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        let rdo = response.status;

        switch(rdo) {
            case 200: {
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 400: {
                // Usuario invalido
                return ({rdo:1, mensaje:"No se pudo borrar el favorito del usuario."});
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