
class ApiHandler {
    constructor(cookies) {
        this.baseURL = 'https://financial-modeling-backend-sd.herokuapp.com';
        this.cookies = cookies;
    }

    signup(username, password) {
        fetch(`${this.baseURL}/signup/`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        })
            .then((response) => {
                if (response.status == 201) {
                    alert('User successfully created!');
                } else {
                    alert('There was a problem while creating your account!');
                }
            })
    }

    login(username, password) {
        console.log('sending login request');
        fetch(`${this.baseURL}/login/`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Authorization': `Basic ${btoa(`${username}:${password}`)}` }
        })
            .then((response) => { return response.json() })
            .then((json) => { this.cookies.set("stockAppCookie", json.token) })
            .catch(this.handleApiError);
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

    handleApiError(error) {
        alert(`Error while sending Api request!`);
    }

    getAuthToken() {
        return this.cookies.get("stockAppCookie")
    }
}

export default ApiHandler;