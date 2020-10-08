import {
    html,
    LitElement
} from 'lit-element'

class TIMEStopwatch extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <div id="stopwatch-body">
                <div id="stopwatch"></div>
            </div>
        `;
    }

}

customElements.define('time-stopwatch', TIMEStopwatch);