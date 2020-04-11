

class LocalStorageHandler {
    constructor() {
        this.changeListeners = [];
    }

    set = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
        for (let listener of this.changeListeners)
            listener(key, value);
    }

    remove = (key) => {
        localStorage.removeItem(key);
        for (let listener of this.changeListeners)
            listener(key, null);
    }

    get = (key) => {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
    }

    getKeys = () => {
        return Object.keys(localStorage);
    }

    removeAllKeys = () => {
        for (let key of this.getKeys())
            this.remove(key);
    }

    addListener = (listener) => {
        if (this.getIndiciesOfListener(listener) == 0)
            this.changeListeners.push(listener);
    }

    removeListener = (listener) => {
        const indexes = this.getIndiciesOfListener(listener);
        for (let i = indexes.length - 1; i >= 0; i--) {
            this.changeListeners.splice(this.indexes[i], 1);
        }
    }

    getIndiciesOfListener = (listener) => {
        let indexes = []
        for (let i = 0; i < this.changeListeners.length; i++) {
            if (listener.toString() === this.changeListeners[i].toString()) {
                indexes.push(i)
            }
        }
        return indexes;
    }
}

export default LocalStorageHandler;