import urlWebServices from './WebServices.js';

export const Login = async (userId, pass) => {
    //url webservices
    let URL_API = urlWebServices.login;

    let req = JSON.stringify({
        userMail: userId,
        userPass: pass
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

        const json = await response.json();
        let rdo = response.status;

        switch(rdo) {
            case 201: {
                // Guardo usuario logueado
                let user = json;
                localStorage.setItem("usuarioId",user.id);
                localStorage.setItem("nombre",user.userName);
                localStorage.setItem("rol",user.userRol);
                localStorage.setItem("email",user.userMail);
                localStorage.setItem("usuarioValido", true);
                return ({rdo:0, mensaje:"Ok"}); // Correcto
            }
            case 401: {
                // Usuario invalido
                return ({rdo:1, mensaje:"El usuario ingresado no existe en nuestra base."});
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