import {
    html,
    render as litRender,
} from 'lit-html'

class TIMETest extends HTMLElement {
    constructor() {
        super();
        litRender(this.render(), this);
    }

    callback() {
        console.log("We clicked the button");
    }

    render() {
        return html`
            <p>This is a paragraph</p>
            <button @click=${() => this.callback()}>This is a button</button>
        `
    }

}

customElements.define('time-test', TIMETest);