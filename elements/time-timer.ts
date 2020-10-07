import {
    html,
    render as litRender
} from 'lit-html'

class TIMETimer extends HTMLElement {
    constructor() {
        super();
        litRender(this.render(), this);
    }

    render() {
        return html`
            <div id="timer-body">
                <div class='app-title'>Timer</div>
                <div id="timer">0:00</div>
                <button>start</button>
            </div>
        `;
    }

}

window.customElements.define('time-timer', TIMETimer);