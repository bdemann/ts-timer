import {
    html,
    render as litRender,
} from 'lit-html'

class TIMEClock extends HTMLElement {
    twelveHour: boolean;
    time: Date;

    constructor() {
        super();
        this.twelveHour = true;
        this.time = new Date()
        // this.time = new Date(2018, 0O5, 0O5, 24, 59, 42, 11);  
    }

    toTimeString() {
        if (this.twelveHour) {
            let meridiem = (this.time.getHours() > 11 ? 'pm': 'am');
            let hours = (this.time.getHours() > 12 ? this.time.getHours() - 12: (this.time.getHours() === 0 ? 12 : this.time.getHours()));
            return `${hours}:${this.formatMinutes(this.time.getMinutes())}:${this.formatMinutes(this.time.getSeconds())} ${meridiem}`;
        } else {
            return `${this.time.getHours}:${this.formatMinutes(this.time.getMinutes())}`;
        }
    }

    updateClock(self: TIMEClock) {
        this.time = new Date();
        litRender(self.render(), self);
    }

    formatMinutes(minutes: number) {
        let minuteString = minutes.toString();
        if (minuteString.length === 1) {
            return `0${minuteString}`
        }
        else return minuteString
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateClock(this), 1000);
    }

    // timeToString() {
    //     if (this.twelveHour) {
    //         return `${this.time.getHours()}:${this.time.getMinutes() ${this.time.}} `
    //     }
    // }

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
                            <div class="twelve columns" id="main-clock-time">${this.toTimeString()}</div>
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