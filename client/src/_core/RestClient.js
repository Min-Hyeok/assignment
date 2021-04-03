export class RestClient {
    #baseURL;
    #timeout;

    constructor (baseURL, timeout) {
        this.#baseURL = baseURL;
        this.#timeout = timeout;
    }

    async get (path,) {
        const result = await Promise.race([
            fetch(`${this.#baseURL}${path}`),
            new Promise((resolve) => setTimeout(() => resolve(false), this.#timeout))
        ]);
        const contentType = result.headers.get('content-type').includes('json') ? 'json' : 'text';
        if (result === false) {
            throw new Error('시간 초과');
        }
        return result[contentType]();
    }
}
