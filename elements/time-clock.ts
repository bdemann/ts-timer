import {
    html,
    render as litRender,
} from 'lit-html'

class TIMEClock extends HTMLElement {
    twelveHour: boolean;
    time: Date;
    time_options;
    date_options;

    constructor() {
        super();
        this.twelveHour = true;
        this.time = new Date()
        this.time_options = { hour12: true, hour: 'numeric', minute: '2-digit'}
        this.date_options = { weekday: 'short', month: 'short', day: 'numeric' }
        this.time_options.hour12 = true
        // this.time = new Date(2018, 0O5, 0O5, 24, 59, 42, 11);  
    }

    updateClock(self: TIMEClock) {
        this.time = new Date();
        litRender(self.render(), self);
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateClock(this), 1000);
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
                        <div>
                            <div id="main-clock-time">
                                ${this.time.toLocaleString('default', this.time_options).toLowerCase()}
                            </div>
                        </div>
                        <div id="main-clock-date">${this.time.toLocaleString('default', this.date_options)}</div>
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