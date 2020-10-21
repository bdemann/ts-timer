import {
    html,
    render as litRender,
} from 'lit-html'

class TIMETimer extends HTMLElement {

    connectedCallback() {
        litRender(this.render(), this);
    }

    render() {
        return html`
            <style>
                #timer {
                    padding-top: 150px;
                    color: #8ab4f8;
                    font-size: 50pt;
                    text-align: center;
                }
            </style>
            <div id="timer-body">
                <div id="timer">0:00</div>
                <button>start</button>
            </div>
        `;
    }

}

customElements.define('time-timer', TIMETimer);