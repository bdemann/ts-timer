import {
    html,
    render as litRender,
} from 'lit-html'

import {
    millisToHourMinSec
} from '../ts/utils';

class TIMETimeDispaly extends HTMLElement {
    percentComplete: number;
    running: boolean;
    runTime: number;
    startTime: Date;
    timerLength: number;
    timeLeft: number;
    timeElapsed: number;
    elapsed: boolean;
    paused: boolean;
    previousTimeElapsed: number;

    constructor() {
        super();
        this.percentComplete = 0;
        this.timeElapsed = 0;
        this.previousTimeElapsed = 0;
        console.log('Are we really calling the constructor here?')
        this.running = false;
        this.elapsed = false;
        this.paused = false;
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateTimer(this), 10);
    }

    updateTimer(self: TIMETimeDispaly) {
        if (self.paused) {

        } else if (self.running) {
            self.timeElapsed = self.previousTimeElapsed + new Date().getTime() - self.startTime.getTime();
            self.timeLeft = self.timerLength - self.timeElapsed;
            if (self.timeLeft > 0) {
                self.percentComplete = self.timeElapsed / self.timerLength * 100;
            } else {
                self.percentComplete = 100;
                self.elapsed = true;
            }
        } else {
            self.timeLeft = self.timerLength;
            self.percentComplete = 0;
        }
        litRender(self.render(), self);
    }

    handleDelete() {

    }

    onInputChange(event: CustomEvent, self) {
        self.timerLength = event.detail;
        console.log(self.timerLength);
    }

    handleStartTimer() {
        console.log(this.timerLength);
        this.running = true;
        this.startTime = new Date();
        litRender(this.render(), this);
    }

    handleAddTimer() {
        litRender(this.render(), this);
    }

    // time elapsed = time elapsed + new start time
    handlebutton() {
        if (this.running) {
            if (this.elapsed) {
                this.running = false;
                this.elapsed = false;
                this.previousTimeElapsed = 0;
            } else if (this.paused) {
                this.paused = false;
                this.startTime = new Date();
            }else{
                this.paused = true;
                this.previousTimeElapsed = this.timeElapsed;
            }
        } else {
            this.running = true;
            this.startTime = new Date();
        }
        litRender(this.render(), this);
    }

    render() {
        return html`
            <style>
                @import 'vars.css';

                #timer-body {
                    height: 100%;
                }
                #standin-timer {
                    position: absolute;
                    top: 50px;
                    width: 100%;
                    color: var(--activeColor);
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
                    stroke-width: 6;
                    stroke-dasharray: 630;
                    stroke-dashoffset: 630;
                    stroke-linecap: round; 
                }
                #progressbar circle:nth-child(1){ 
                    stroke-dashoffset: 0; 
                    stroke: var(--bodyColor); 
                } 
                #progressbar circle:nth-child(2){
                    stroke-dashoffset: calc(630 - (630 * ${this.percentComplete}) / -100);
                    stroke: var(--activeColor);
                }
                .elapsed {
                    animation: blinker 1s linear infinite;
                }
                @keyframes blinker { 
                    50% {
                        opacity: 0;
                    }
                }
            </style>
            <div id="timer-body">
                <div id="timers">
                    <div class="timer">
                        <svg id="progressbar" class="${(this.elapsed ? 'elapsed':'')}">
                            <circle cx="103", cy="103" r="100"></circle>
                            <circle cx="103", cy="103" r="100"></circle>
                        </svg>
                        <div id="standin-timer" class="${(this.paused ? 'elapsed':'')}">${(this.timeLeft < 0 ? '-': '')}${millisToHourMinSec(Math.abs(this.timeLeft))}</div>
                    </div>
                    <div id="sw-controls" class="row">
                        <div class="four columns" @click=${() => this.handleDelete()}>Delete</div>
                        <button class="four columns" @click=${() => this.handlebutton()}>start</button>
                        <div class="four columns" @click=${() => this.handleAddTimer()}>Add timer</div>
                    </div>
                </div>
            </div>
        `;
    }

}

customElements.define('time-timer', TIMETimeDispaly);