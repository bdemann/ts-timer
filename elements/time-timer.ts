import {
    html,
    render as litRender,
} from 'lit-html'

import './timer-timer-input'
import './time-time-display'

type displaytype = 'input' | 'timers';

class Timer {
    running: boolean;
    runTime: number;
    startTime: Date;
    timerLength: number;
    timeLeft: number;
    timeElapsed: number;
    elapsed: boolean;
    paused: boolean;
    previousTimeElapsed: number;

    constructor () {
        this.timeElapsed = 0;
        this.previousTimeElapsed = 0;
        this.running = false;
        this.elapsed = false;
        this.paused = false;
    }

}

class TIMETimer extends HTMLElement {
    currentDisplayType: displaytype;
    currentTimer: number;
    timers: Timer[];

    constructor() {
        super();
        this.currentDisplayType = 'input';
        this.timers = [new Timer()];
        this.currentTimer = 0;
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateTimer(this), 10);
    }

    updateTimer(self: TIMETimer) {
        self.timers.forEach((timer) => {
                if (timer.paused) {

                } else if (timer.running) {
                    timer.timeElapsed = timer.previousTimeElapsed + new Date().getTime() - timer.startTime.getTime();
                    timer.timeLeft = timer.timerLength - timer.timeElapsed;
                    if (timer.timeLeft < 0) {
                        timer.elapsed = true;
                    }
                } else {
                    timer.timeLeft = timer.timerLength;
                }
            }
        )
        litRender(self.render(), self);
    }

    handleDelete() {

    }

    handleCancel() {

    }

    onInputChange(event: CustomEvent, self: TIMETimer) {
        self.timers[self.currentTimer].timerLength = event.detail;
    }

    handleStartTimer() {
        this.currentDisplayType = 'timers';
        this.timers[this.currentTimer].running = true;
        this.timers[this.currentTimer].startTime = new Date();
        litRender(this.render(), this);
    }

    handleAddTimer() {
        this.timers.push(new Timer());
        this.currentTimer = this.timers.length - 1;
        this.currentDisplayType = 'input';
        litRender(this.render(), this);
    }

    handlePrevious() {
        this.currentTimer = Math.max(0, this.currentTimer - 1);
    }

    handleNext() {
        this.currentTimer = Math.min(this.timers.length - 1, this.currentTimer + 1);
    }

    // time elapsed = time elapsed + new start time
    handlebutton(timer: Timer) {
        if (timer.running) {
            if (timer.elapsed) {
                timer.running = false;
                timer.elapsed = false;
                timer.previousTimeElapsed = 0;
                timer.timeElapsed = 0;
            } else if (timer.paused) {
                timer.paused = false;
                timer.startTime = new Date();
            }else{
                timer.paused = true;
                timer.previousTimeElapsed = timer.timeElapsed;
            }
        } else {
            timer.running = true;
            timer.startTime = new Date();
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
                #timer-controls, #input-controls {
                    text-align: center;
                }
            </style>
            <div id="timer-body">
                <!-- <time-timedisplay paused="true" elapsed="true" .paused=${true}></time-timedisplay> -->
                <time-timerinput ?hidden=${this.currentDisplayType !== 'input'} @input=${(e:CustomEvent)=>this.onInputChange(e, this)}></time-timerinput>
                <time-timedisplay ?hidden=${this.currentDisplayType !== 'timers'} .timerLength=${this.timers[this.currentTimer].timerLength} .elapsed=${this.timers[this.currentTimer].elapsed} .paused=${this.timers[this.currentTimer].paused} .radius=${100} .timeElapsed=${this.timers[this.currentTimer].timeElapsed}></time-timedisplay>
                <div ?hidden=${this.currentDisplayType !== 'input'} id="input-controls" class="row">
                    <div class="four columns" @click=${() => this.handleCancel()}>Cancel</div>
                    <button class="four columns" @click=${() => this.handleStartTimer()}>Begin Timer</button>
                    <div class="four columns">&nbsp;</div>
                </div>
                <div ?hidden=${this.currentDisplayType !== 'timers'} id="timer-controls" class="row">
                    <div class="four columns" @click=${() => this.handleDelete()}>Delete</div>
                    <button class="four columns" @click=${() => this.handlebutton(this.timers[this.currentTimer])}>start</button>
                    <div class="four columns" @click=${() => this.handleAddTimer()}>Add timer</div>
                </div>
                <div class="row">
                    <button class="six columns" @click=${() => this.handlePrevious()}>Previous Timer</button>
                    <button class="six columns" @click=${() => this.handleNext()}>Next Timer</button>
                </div>
                <br>
            </div>
        `;
    }

}

customElements.define('time-timer', TIMETimer);