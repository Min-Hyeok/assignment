import { observe } from "./Observer";

export class Component {

    el;
    state = {};
    props = {};

    constructor(el, props = {}) {
        this.el = el;
        this.props = props;
        this.setup();
    }

    setup() {
        this.state = this.stateInit();
        this.eventInit();
        observe(this.render);
        this.componentDidMounted();
    }

    render = () => {
        this.componentBeforeUpdate();
        this.el.innerHTML = this.template();
        this.componentDidUpdate();
    }

    template() { return ''; }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
    
    stateInit() {
        return {};
    }
    eventInit() {}
    componentDidMounted() {}
    componentBeforeUpdate() {}
    componentDidUpdate() {}
    
}