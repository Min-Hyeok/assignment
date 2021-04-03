export class Repository {
    #key;

    constructor (key) {
        this.#key = key;
    }

    set (data) {
        localStorage.setItem(this.#key, JSON.stringify(data))
    }

    get () {
        return JSON.parse(localStorage.getItem(this.#key)) || null;
    }
}
