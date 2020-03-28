
class ApiHandler {
    constructor(cookies) {
        this.baseURL = 'https://financial-modeling-backend-sd.herokuapp.com';
        this.cookies = cookies;
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
                headers: { 'Authorization': `Basic ${btoa(`${username}:${password}`)}` }
            })
                .then((response) => { return response.json() })
                .then((json) => { this.cookies.set("stockAppCookie", json.token) })
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

    handleApiError(error) {
        console.log(`${error.name}: ${error.message}`);
    }

    getAuthToken() {
        return this.cookies.get("stockAppCookie")
    }
}

export default ApiHandler;