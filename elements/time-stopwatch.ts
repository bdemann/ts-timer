import {
    html,
    render as litRender,
} from 'lit-html';

import {
    formatTwoDigits,
    millisToHourMinSec
} from '../ts/utils';

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

    handleReset() {
        this.running = false;
        this.runTime = 0;
        litRender(this.render(), this);
    }

    toStopwatchMillis(time: number) {
        return formatTwoDigits(Math.floor((time % 1000)/10));
    }

    render() {
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <style>
                #stopwatch-time {
                    padding: 30% 0;
                    color: #8ab4f8;
                    text-align: center;
                    font-size: 50pt;
                }
                #millis-display {
                    font-size: 50%;
                }
                #sw-controls {
                    text-align: center;
                }
            </style>
            <div id="stopwatch-body">
                <div id="stopwatch-time">
                    <span>${millisToHourMinSec(this.runTime)}</span>
                    <span id='millis-display'>
                        ${this.toStopwatchMillis(this.runTime)}
                    </span>
                </div>
                <div id="timer-controls" class="row controls">
                    <div class="control-button" @click=${() => this.handleReset()}>Reset</div>
                    <div class="control-button">
                        <span class="material-icons main-button" @click=${() => this.handleStopwatch()}>
                            ${this.running ? "pause" : "play_arrow"}
                        </span>
                    </div>
                    <div class="control-button" @click=${() => console.log("lap")}>Lap</div>
                </div>
            </div>
        `;
    }

}

customElements.define('time-stopwatch', TIMEStopwatch);