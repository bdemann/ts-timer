import {
    html,
    render as litRender
} from 'lit-html'

class TIMEStopwatch extends HTMLElement {
    constructor() {
        super();
        litRender(this.render(), this);
    }

    render() {
        return html`
            <div id="stopwatch-body">
                <div class='app-title'>Stopwatch</div>
                <div id="stopwatch"></div>
            </div>
        `;
    }

}

window.customElements.define('time-stopwatch', TIMEStopwatch);