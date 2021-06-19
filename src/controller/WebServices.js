const URL_API = "seminario-2.herokuapp.com";
//const URL_API = "seminario1alquilar.herokuapp.com";
// const URL_API = "http://localhost:3000/";

const urlWebServices = {
    login: URL_API + "/api/Users/login",
    signup: URL_API + "/api/Users",

    // Office
    newOffice: URL_API + "/api/Offices",
    getOfficesByOwner: URL_API + "/api/Offices/GetOfficeByOwner",
    getOfficeById: URL_API + "/api/Offices",
    getOfficesByProvince: URL_API + "/api/Offices/GetPublisedOfficesByProvince",
    updateOfficeStatus: URL_API + "/api/Offices/UpdatePublishedState",

    // Favorites
    createFavourite: URL_API + "/api/Favourites",
    getFavorites: URL_API + "/api/Favourites/GetFavouritesOfficesById",
    deleteFavourite: URL_API + "/api/Favourites",
    
}

export default urlWebServices;