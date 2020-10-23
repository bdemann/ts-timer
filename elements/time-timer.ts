import {
    html,
    render as litRender,
} from 'lit-html'

import {
    millisToHourMinSec
} from '../ts/utils';

class TIMETimer extends HTMLElement {
    percentComplete: number;
    running: boolean;
    runTime: number;
    startTime: Date;
    timerLength: number;
    timeLeft: number;
    timeElapsed: number;

    constructor() {
        super();
        this.timerLength = 120000;
        this.startTime = new Date();
        this.percentComplete = 0;
        this.running = true;
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateTimer(this), 10);
    }

    updateTimer(self: TIMETimer) {
        if (self.running) {
            self.timeElapsed = new Date().getTime() - self.startTime.getTime();
            self.timeLeft = self.timerLength - self.timeElapsed;
            self.percentComplete = 4 * self.runTime / 1000;
            self.percentComplete = self.timeElapsed / self.timerLength * 100;
            litRender(self.render(), self);
        }
    }

    render() {
        return html`
            <style>
                #timer-body {
                    height: 100%;
                }
                #standin-timer {
                    position: absolute;
                    top: 50px;
                    width: 100%;
                    color: #8ab4f8;
                    font-size: 50pt;
                    text-align: center;
                }
                .timer {
                    position: relative;
                    margin: 40px auto;
                    margin-top: 40px;
                    width: 206px;
                    height: 206px;
                }
                #progressbar {
                    transform: rotate(-90deg);
                    width: 206px;
                    height: 206px;
                }
                #progressbar circle {
                    width: 150px;
                    height: 150px; 
                    fill: none; 
                    stroke: black;
                    stroke-width: 6;
                    stroke-dasharray: 630;
                    stroke-dashoffset: 630;
                    stroke-linecap: round; 
                }
                #progressbar circle:nth-child(1){ 
                    stroke-dashoffset: 0; 
                    stroke: white; 
                } 
                #progressbar circle:nth-child(2){
                    stroke-dashoffset: calc(630 - (630 * ${this.percentComplete}) / -100);
                    stroke: #8ab4f8;
                }
            </style>
            <div id="timer-body">
                <div class="timer">
                    <svg id="progressbar">
                        <circle cx="103", cy="103" r="100"></circle>
                        <circle cx="103", cy="103" r="100"></circle>
                    </svg>
                    <div id="standin-timer">${millisToHourMinSec(this.timeLeft)}</div>
                </div>
                <button>start</button>
            </div>
        `;
    }

}

customElements.define('time-timer', TIMETimer);