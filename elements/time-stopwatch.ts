import {
    html,
    render as litRender,
} from 'lit-html';

class TIMEStopwatch extends HTMLElement {
    running: boolean;
    startTime: Date;
    endTime: Date;
    runTime: number;

    constructor() {
        super();
        this.startTime = new Date();
        this.runTime = 0;
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateStopwatch(this), 10);
    }

    updateStopwatch(self: TIMEStopwatch) {
        if (self.running) {
            self.runTime = new Date().getTime() - self.startTime.getTime();
            litRender(self.render(), self);
        }
    }

    handleStopwatch() {
        if (this.running) {
            this.endTime = new Date();
            this.runTime = this.endTime.getTime() - this.startTime.getTime();
        } else {
            this.startTime = new Date();
        }
        this.running = !this.running
    }

    formatTwoDigits(number: number) {
        let numberString = number.toString();
        if (numberString.length === 1) {
            return `0${numberString}`
        }
        else return numberString
    }

    toStopwatchString(time: number) {
        let hour = Math.floor(time / 3.6e+6);
        let hourString = (hour > 0 ? hour.toString() + ':' : '');
        let minute = Math.floor(time / 60000) % 60;
        let minuteString = (minute > 0 ? minute.toString() + ':' : '');
        let second = Math.floor(time / 1000) % 60;
        let secondString = (minute > 0 ? this.formatTwoDigits(second): second.toString());
        return `${hourString}${minuteString}${secondString}`
    }

    toStopwatchMillis(time: number) {
        return this.formatTwoDigits(Math.floor((time % 1000)/10));
    }

    render() {
        return html`
            <style>
                #stopwatch-time {
                    color: #8ab4f8;
                    text-align: center;
                    font-size: 50pt;
                }
                #millis-display {
                    font-size: 50%;
                }
            </style>
            <div id="stopwatch-body">
                <div id="stopwatch-time"><span>${this.toStopwatchString(this.runTime)}</span><span id='millis-display'>${this.toStopwatchMillis(this.runTime)}</span></div>
                <button @click=${() => this.handleStopwatch()}>Start</button>
            </div>
        `;
    }

}

customElements.define('time-stopwatch', TIMEStopwatch);