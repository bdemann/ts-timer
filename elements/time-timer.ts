import {
    html,
    render as litRender,
} from 'lit-html'

import {
    createObjectStore
} from 'reduxular'

import './timer-timer-input'
import './time-time-display'
import { millisToHourMinSecString } from '../ts/utils';

type displaytype = 'input' | 'timers';
type State = Readonly<{
    runTime: number;
    currentDisplayType: displaytype;
    currentTimer: number;
    timers: Timer[];
}>;
type Timer = Readonly<{
    timerLength: number;
    timeLeft: number;
    timeElapsed: number;
    startTime: Date;
    previousTimeElapsed: number;
    running: boolean;
    elapsed: boolean;
    paused: boolean;
}>

const InitialState: State = {
    runTime: 0,
    currentDisplayType: 'input',
    currentTimer: 0,
    timers: [createNewTimer()]
};

class TIMETimer extends HTMLElement {

    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this), this);

    connectedCallback() {
        setInterval(() => this.updateTimer(), 10);
    }

    updateTimer() {
        this.store.timers = this.store.timers.map((timer, index, array) => {
            if (timer.paused) {
                return timer;
            } else if (timer.running) {
                return {
                    ...timer,
                    timeElapsed: timer.previousTimeElapsed + new Date().getTime() - timer.startTime.getTime(),
                    timeLeft: timer.timerLength - timer.timeElapsed,
                    elapsed: timer.timeLeft < 0
                };
            } else {
                return {
                    ...timer,
                    timeLeft: timer.timerLength
                };
            }
        });
    }

    handleDelete() {
        if(this.store.timers.length - 1 < 1){
            this.store.currentDisplayType = 'input'
            this.store.timers = [createNewTimer()];
        } else {
            this.store.currentTimer = Math.max(0, this.store.currentTimer - 2);
        }
        this.store.timers = this.store.timers.filter((element, index) => {
            return this.store.currentTimer + 1 != index;
        });
    }

    handleCancel() {
        this.store.currentTimer = Math.max(
            0,
            Math.min(this.store.currentTimer - 1, this.store.timers.length - 2)
        );
        this.store.currentDisplayType = 'timers';
        this.store.timers = this.store.timers.filter((element, index, array) => {
            return index != array.length - 1;
        })
    }

    onInputChange(event: CustomEvent) {
        this.store.timers = this.store.timers.map((timer:Timer, index) => {
            if (index === this.store.currentTimer) {
                return {
                    ...timer,
                    timerLength: event.detail
                };
            };
            return timer;
        })
    }

    handleStartTimer() {
        this.store.currentDisplayType = 'timers';
        this.store.timers = this.store.timers.map((timer:Timer, index) => {
            if (index === this.store.currentTimer) {
                return {
                    ...timer,
                    running: true
                };
            }
            return timer;
        });
        this.store.timers = this.store.timers.map((timer:Timer, index) => {
            if (index === this.store.currentTimer) {
                return {
                    ...timer,
                    startTime: new Date()
                }
            }
            return timer;
        });
    }

    handleAddTimer() {
        this.store.timers = [
            ...this.store.timers,
            createNewTimer()         
        ];
        this.store.currentTimer = this.store.timers.length - 1;
        this.store.currentDisplayType = 'input';
    }

    handlePrevious() {
        this.store.currentTimer = Math.max(0, this.store.currentTimer - 1);
    }

    handleNext() {
        this.store.currentTimer = Math.min(this.store.timers.length - 1, this.store.currentTimer + 1);
    }

    // time elapsed = time elapsed + new start time
    handlebutton() {
        this.store.timers = this.store.timers.map((timer, index) => {
            if (this.store.currentTimer === index) {
                if (timer.running) {
                    if (timer.elapsed) {
                        return {
                            ...timer,
                            running: false,
                            elapsed: false,
                            previousTimeElapsed: 0,
                            timeElapsed: 0
                        }
                    } else if (timer.paused) {
                        return {
                            ...timer,
                            paused: false,
                            startTime: new Date()
                        }
                    }
                    return {
                        ...timer,
                        paused: true,
                        previousTimeElapsed: timer.timeElapsed
                    }
                }
                return {
                    ...timer,
                    running: true,
                    startTime: new Date()
                }
            }
            return timer;
        });
    }

    onTestInputChange(event: CustomEvent, self: TIMETimer) {
        console.log(event.detail)
    }

    render(state: State) {
        return html`
            <style>
                @import 'vars.css';
                #timer-body {
                    height: 100%;
                }
                #timer-controls, #input-controls {
                    text-align: center;
                }
                .controls {
                    height: 40px;
                }
                #previous-button {
                    text-align: right;
                }
                #start-stop-pause-button {
                    color: var(--activeColor);
                    font-size: 45pt;
                }
            </style>
            <div id="timer-body">
                <!-- <time-timedisplay paused="true" elapsed="true" .paused=${true}></time-timedisplay> -->
                <time-timerinput .value=${state.timers[state.currentTimer].timerLength} ?hidden=${state.currentDisplayType !== 'input'} @input=${(e:CustomEvent)=>this.onInputChange(e)}></time-timerinput>
                <time-timedisplay ?hidden=${state.currentDisplayType !== 'timers'} .timerLength=${state.timers[state.currentTimer].timerLength} .elapsed=${state.timers[state.currentTimer].elapsed} .paused=${state.timers[state.currentTimer].paused} .radius=${100} .timeElapsed=${state.timers[state.currentTimer].timeElapsed}></time-timedisplay>
                <div ?hidden=${state.currentDisplayType !== 'input'} id="input-controls" class="row controls">
                    <div class="four columns" @click=${() => this.handleCancel()}>&nbsp;${(state.timers.length < 2 ? "" : 'Cancel')}</div>
                    <button ?hidden=${state.timers[state.currentTimer].timerLength === 0} class="four columns" @click=${() => this.handleStartTimer()}>Begin Timer</button>
                    <div class="four columns">&nbsp;</div>
                </div>
                <div ?hidden=${state.currentDisplayType !== 'timers'} id="timer-controls" class="row controls">
                    <div class="four columns" @click=${() => this.handleDelete()}>Delete</div>
                    <span class="material-icons four columns" id="start-stop-pause-button" @click=${() => this.handlebutton()}>
                        ${state.timers[state.currentTimer].paused ? "play_circle_filled" : state.timers[state.currentTimer].elapsed ? "cancel" : state.timers[state.currentTimer].running ? "pause_circle_filled" : "play_circle_filled"}
                    </span>
                    <div class="four columns" @click=${() => this.handleAddTimer()}>Add timer</div>
                </div>
                <div class="row" ?hidden=${state.currentDisplayType !== 'timers'}>
                    <div id="previous-button" class="six columns">
                        &nbsp;
                        <button ?hidden=${state.currentTimer === 0} @click=${() => this.handlePrevious()}>&#8592;</button>
                    </div>
                    <div class="six columns">
                        <button ?hidden=${state.currentTimer === state.timers.length -1} @click=${() => this.handleNext()}>&#8594;</button>
                        &nbsp;
                    </div>
                </div>
                <br>
            </div>
        `;
    }

}

function createNewTimer():Timer{
    return {
        timerLength: 0,
        timeElapsed: 0,
        startTime: new Date(),
        previousTimeElapsed: 0,
        running: false,
        elapsed: true,
        paused: false,
        timeLeft: 0
    }
}

customElements.define('time-timer', TIMETimer);