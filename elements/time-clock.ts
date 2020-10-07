import {
    html,
    render as litRender
} from 'lit-html'

class TIMEClock extends HTMLElement {
    constructor() {
        super();
        litRender(this.render(), this);
    }

    render() {
        return html`
            <div id="clock-body">
                <div class="row">
                    <div class='twelve columns app-title'>Clock</div>
                </div>
                <div id="clock">
                    <div id="main-clock">
                        <div class="row">
                            <div class="twelve columns" id="main-clock-time">4:12 PM</div>
                        </div>
                        <div id="main-clock-date">Wed, Sep 23</div>
                    </div>
                    </hr>
                    <div id="secondary-clocks">

                    </div>
                    
                </div>
            </div
        `;
    }

}

window.customElements.define('time-clock', TIMEClock);