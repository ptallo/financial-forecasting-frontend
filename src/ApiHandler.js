
class ApiHandler {
    constructor(localStorageHandler, debug = true) {
        this.baseURL = debug ?
            'http://localhost:5000' :
            'https://financial-modeling-backend-sd.herokuapp.com';
        this.localStorageHandler = localStorageHandler;
        this.getValidTickers();
    }

    signup(username, password) {
        fetch(`${this.baseURL}/signup/`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        })
            .then((response) => {
                let alertText = response.status == 200 ?
                    'User successfully created!' :
                    'There was a problem while creating your account!'
                alert(alertText);
            })
    }

    login(username, password) {
        if (username.length != 0 && password.length != 0) {
            fetch(`${this.baseURL}/login/`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then((response) => { return response.json(); })
                .then((json) => { this.localStorageHandler.set("stockAppCookie", json.token); })
                .catch(this.handleApiError);
        }

    }

    getTickerInfo(ticker, startDate, endDate, updateTickerCallback) {
        fetch(`${this.baseURL}/getstockinfo/?stock=${ticker}&start=${startDate}&end=${endDate}`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Authorization': `Bearer ${this.getAuthToken()}` }
        })
            .then((response) => { return response.json() })
            .then((json) => { updateTickerCallback('filler', ticker, json.x, json.y, json.names); })
            .catch(this.handleApiError);
    }

    getFavorites(getFavoritesCallback) {
        fetch(`${this.baseURL}/getfavorites/`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Authorization': `Bearer ${this.getAuthToken()}` }
        })
            .then((response) => { return response.json() })
            .then((json) => { this.localStorageHandler.set('favorites', json); })
            .catch(this.handleApiError);
    }

    addFavorite(ticker) {
        fetch(`${this.baseURL}/addfavorite/?ticker=${ticker}`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Authorization': `Bearer ${this.getAuthToken()}` }
        })
            .catch(this.handleApiError);
    }

    deleteFavorite(ticker) {
        fetch(`${this.baseURL}/delfavorite/?ticker=${ticker}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Authorization': `Bearer ${this.getAuthToken()}` }
        })
            .catch(this.handleApiError);
    }

    getValidTickers() {
        fetch(`${this.baseURL}/getvalidtickers/`, {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => { return response.json() })
            .then((json) => {  })
            .catch(this.handleApiError);
    }

    handleApiError(error) {
        throw error;
    }

    getAuthToken() {
        return this.localStorageHandler.get("stockAppCookie");
    }
}

export default ApiHandler;