import {
    html,
    LitElement
} from 'lit-element'

class TIMEClock extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <style>
                #main-clock-time {
                    color: #8ab4f8;
                    text-align: center;
                    font-size: 50pt;
                }

                #main-clock-date {
                    text-align: center;
                    font-size: 15pt;
                }
            </style>
            <div id="clock-body">
                <div id="clock">
                    <div id="main-clock">
                        <div class="row">
                            <div class="twelve columns" id="main-clock-time">4:12 PM</div>
                        </div>
                        <div id="main-clock-date">Wed, Sep 23</div>
                    </div>
                    <hr/>
                    <div id="secondary-clocks">

                    </div>
                    
                </div>
            </div>
        `;
    }

}

window.customElements.define('time-clock', TIMEClock);