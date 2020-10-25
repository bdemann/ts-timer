import {
    html,
    render as litRender,
} from 'lit-html'

import {
    formatTwoDigits,
    millisToHourMinSec
} from '../ts/utils';

type displaytype = 'input' | 'timers';

class TIMETimer extends HTMLElement {
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
    currentDisplayType: displaytype;
    hourInput: number;
    minuteInput: number;
    secondInput: number;
    input: number[];

    constructor() {
        super();
        this.timerLength = 12000;
        this.percentComplete = 0;
        this.timeElapsed = 0;
        this.previousTimeElapsed = 0;
        this.running = false;
        this.elapsed = false;
        this.paused = false;
        this.currentDisplayType = 'input';
        this.hourInput = 0;
        this.minuteInput = 0;
        this.secondInput = 0;
        this.input = [];
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateTimer(this), 10);
    }

    updateTimer(self: TIMETimer) {
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

    convertTimeToMillis() {
        let millis = 0;
        millis += this.hourInput * 3.6e+6;
        millis += this.minuteInput * 60000;
        millis += this.secondInput * 1000;
        return millis
    }

    convertInputToTime() {
        if (this.input.length > 0) {
            this.secondInput = this.input[0];
        } else {
            this.secondInput = 0;
        }
        if (this.input.length > 1) {
           this.secondInput += this.input[1] * 10;
        }
        if (this.input.length > 2) {
            this.minuteInput = this.input[2];
        } else {
            this.minuteInput = 0;
        }
        if (this.input.length > 3) {
            this.minuteInput += this.input[3] * 10;
        }
        if (this.input.length > 4) {
            this.hourInput = this.input[4];
        } else {
            this.hourInput = 0;
        }
        if (this.input.length > 5) {
            this.hourInput += this.input[5] * 10;
        }
    }

    handleStartTimer() {
        this.timerLength = this.convertTimeToMillis();
        this.currentDisplayType = 'timers';
        this.running = true;
        this.startTime = new Date();
    }

    handleAddTimer() {
        this.currentDisplayType = 'input';
    }

    handleBackspace()  {
        this.input.splice(0, 1);
        this.convertInputToTime();
        litRender(this.render(), this);
    }

    handleInput(input: number) {
        if (this.input.length >= 6) {
            return;
        }
        this.input.splice(0, 0, input);
        this.convertInputToTime();

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
                .elapsed {
                    animation: blinker 1s linear infinite;
                }
                @keyframes blinker { 
                    50% {
                        opacity: 0;
                    }
                }
                .input-number-display {
                    font-size: 30pt;
                }
                .input-unit-display {
                    font-size: 15pt;
                }
                #timer-input {
                    margin: 10% auto;
                    text-align: center;
                    font-size: 18pt;
                    user-select: none;
                }
                .input-row {
                    margin-bottom: 25px;
                }
            </style>
            <div id="timer-body">
                <div id="timer-input" ?hidden=${this.currentDisplayType !=='input'}>
                    <div id="timer-length-input">
                        <span class="input-number-display">
                            ${formatTwoDigits(this.hourInput)}
                        </span>
                        <span class="input-unit-display">h</span>
                        <span class="input-number-display">
                            ${formatTwoDigits(this.minuteInput)}
                        </span>
                        <span class="input-unit-display">m</span>
                        <span class="input-number-display">
                            ${formatTwoDigits(this.secondInput)}
                        </span>
                        <span class="input-unit-display">s</span>
                        &nbsp;
                        <span class="material-icons" @click=${() => this.handleBackspace()}>
                            backspace
                        </span>
                    </div>
                    <hr>
                    <div class="row input-row">
                        <div class="four columns input-number" @click=${() => this.handleInput(1)}>1</div>
                        <div class="four columns input-number" @click=${() => this.handleInput(2)}>2</div>
                        <div class="four columns input-number" @click=${() => this.handleInput(3)}>3</div>
                    </div>
                    <div class="row input-row">
                        <div class="four columns input-number" @click=${() => this.handleInput(4)}>4</div>
                        <div class="four columns input-number" @click=${() => this.handleInput(5)}>5</div>
                        <div class="four columns input-number" @click=${() => this.handleInput(6)}>6</div>
                    </div>
                    <div class="row input-row">
                        <div class="four columns input-number" @click=${() => this.handleInput(7)}>7</div>
                        <div class="four columns input-number" @click=${() => this.handleInput(8)}>8</div>
                        <div class="four columns input-number" @click=${() => this.handleInput(9)}>9</div>
                    </div>
                    <div class="row input-row">
                        <div class="four columns input-number">&nbsp;</div>
                        <div class="four columns input-number" @click=${() => this.handleInput(0)}>0</div>
                        <div class="four columns input-number">&nbsp;</div>
                    </div>
                    <button @click=${() => this.handleStartTimer()}>Start</button>
                </div>
                <div id="timers" ?hidden=${this.currentDisplayType !=='timers'}>
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

customElements.define('time-timer', TIMETimer);