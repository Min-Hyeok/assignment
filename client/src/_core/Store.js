import { observable } from './Observer';

export class Store {

    state; 
    commit
    
    constructor({ state, mutations }) {
        this.state = observable(state);
        this.commit = (mutation, params) => {
            mutations[mutation](this.state, params);
        }
    }
}
