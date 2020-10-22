import {
    html,
    render as litRender,
} from 'lit-html';

class TIMEStopwatch extends HTMLElement {
    running: boolean;
    startTime: Date;
    endTime: Date;
    runTime: Date;

    constructor() {
        super();
        this.startTime = new Date();
        this.runTime = new Date();
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateStopwatch(this), 10);
    }

    updateStopwatch(self: TIMEStopwatch) {
        if (self.running) {
            self.runTime = new Date(new Date().getTime() - self.startTime.getTime());
            litRender(self.render(), self);
        }
    }

    handleStopwatch() {
        if (this.running) {
            this.endTime = new Date();
            this.runTime = new Date(this.endTime.getTime() - this.startTime.getTime());
        } else {
            this.startTime = new Date();
        }
        this.running = !this.running
    }

    toStopwatchString(time: Date) {
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        let millis = time.getMilliseconds();
        return `${hour}:${minute}:${second}.${millis}`
    }

    render() {
        return html`
            <style>
                #stopwatch-time {
                    color: #8ab4f8;
                    text-align: center;
                    font-size: 50pt;
                }
            </style>
            <div id="stopwatch-body">
                <div id="stopwatch-time">${this.toStopwatchString(this.runTime)}</div>
                <button @click=${() => this.handleStopwatch()}>Start</button>
            </div>
        `;
    }

}

customElements.define('time-stopwatch', TIMEStopwatch);