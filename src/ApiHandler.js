
class ApiHandler {
    constructor(cookies, debug=true) {
        this.baseURL = debug ? 
            'http://localhost:5000' : 
            'https://financial-modeling-backend-sd.herokuapp.com';
        this.cookies = cookies;
        this.validTickers = {};
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
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}` ,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then((response) => { return response.json(); })
                .then((json) => { this.cookies.set("stockAppCookie", json.token); })
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
            .then((json) => { getFavoritesCallback(json); })
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

    getValidTickers(getValidTickersCallback) {
        if (this.validTickers.length == 0) {
            fetch(`${this.baseURL}/getvalidtickers/`, {
                method: 'GET',
                mode: 'cors',
            })
                .then((response) => { return response.json() })
                .then((json) => { 
                    this.validTickers = json; 
                    getValidTickersCallback(this.validTickers);
                })
                .catch(this.handleApiError);
        } else {
            getValidTickersCallback(this.validTickers);
        }
    }

    handleApiError(error) {
        console.log(`${error.name}: ${error.message}`);
    }

    getAuthToken() {
        return this.cookies.get("stockAppCookie");
    }
}

export default ApiHandler;