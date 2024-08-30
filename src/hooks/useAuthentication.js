import api from "../utils/api"

const fetchUseAuthentication = () => {

    const APP_KEY = process.env.REACT_APP_API_KEY;

    api.get(`/authentication`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${APP_KEY}`
        }
    }).then(response => response.data).catch(error => {console.log(error)})
}
