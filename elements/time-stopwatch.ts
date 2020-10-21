import {
    html,
    render as litRender,
} from 'lit-html';

class TIMEStopwatch extends HTMLElement {

    connectedCallback() {
        litRender(this.render(), this);
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