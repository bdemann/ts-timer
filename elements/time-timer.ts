import {
    html,
    render as litRender,
} from 'lit-html'

import {
    createObjectStore
} from 'reduxular'

import './timer-timer-input'
import './time-time-display'

type displaytype = 'input' | 'timers';
type State = Readonly<{
    runTime: number;
    currentDisplayType: displaytype;
    currentTimer: number;
    timers: Timer[];
}>;
type Actions = DELETE_TIMER
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
type DELETE_TIMER = Readonly<{
    type: 'DELETE_ACTION',
    timer_index: number
}>

const InitialState: State = {
    runTime: 0,
    currentDisplayType: 'input',
    currentTimer: 0,
    timers: [createNewTimer()]
};
const InitialStateTest: State = {
    runTime: 0,
    currentDisplayType: 'timers',
    currentTimer: 0,
    timers: [createNewTestTimer()]
};

class TIMETimer extends HTMLElement {

    readonly store = createObjectStore(InitialStateTest, (state) => litRender(this.render(state), this.shadowRoot), this, (state: State, action:Actions) => {
        if (action.type === 'DELETE_ACTION') {
            let newTimers = state.timers.filter((element, index) => {
                return state.currentTimer != index;
            });
            if(newTimers.length < 1){
                let newDisplay: displaytype = 'input';
                return {
                    ...state,
                    // currentDisplayType: 'input',
                    // TODO Why doesn't this work?
                    currentDisplayType: newDisplay,
                    timers: [createNewTimer()]
                }
            } else {
                return {
                    ...state,
                    currentTimer: Math.max(0, state.currentTimer - 1),
                    timers: newTimers
                }
            }
        }
        return state;
    });
    readonly shadow = this.attachShadow({
        mode: 'open'
    })

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
        //this.querySelector()
        //this.shadow.querySelector()
        this.store.dispatch({
            type: 'DELETE_ACTION',
            timer_index: this.store.currentTimer,
        })
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
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <style>
                @import 'vars.css';
                #timer-body {
                    height: 100%;
                }
                #previous-button {
                    text-align: right;
                }
            </style>
            <div id="timer-body">
                <time-timerinput .value=${state.timers[state.currentTimer].timerLength} ?hidden=${state.currentDisplayType !== 'input'} @input=${(e:CustomEvent)=>this.onInputChange(e)}></time-timerinput>
                <time-timedisplay ?hidden=${state.currentDisplayType !== 'timers'} .timerLength=${state.timers[state.currentTimer].timerLength} .elapsed=${state.timers[state.currentTimer].elapsed} .paused=${state.timers[state.currentTimer].paused} .radius=${100} .timeElapsed=${state.timers[state.currentTimer].timeElapsed}></time-timedisplay>
                <div ?hidden=${state.currentDisplayType !== 'input'}>
                    <div id="input-controls" class="row controls">
                        <div class="control-button" @click=${() => this.handleCancel()}>&nbsp;${(state.timers.length < 2 ? "" : 'Cancel')}</div>
                        <div class="control-button">
                            <!-- The hidding is messing up my layout... so I have one that has a &nbsp; that is visible when the other isn't. Is there a better was to do this? I could just always have the nbsp but I worry that will shift my button over -->
                            <div ?hidden=${state.timers[state.currentTimer].timerLength === 0}>
                                <span class="material-icons main-button" @click=${() => this.handleStartTimer()}>
                                    play_arrow
                                </span>
                            </div>
                            <div ?hidden=${state.timers[state.currentTimer].timerLength != 0}>&nbsp;</div>
                        </div>
                        <div class="control-button">&nbsp;</div>
                    </div>
                </div>
                <div ?hidden=${state.currentDisplayType !== 'timers'}>
                    <div id="timer-controls" class="controls">
                        <div class="control-button" @click=${() => this.handleDelete()}>Delete</div>
                        <div class="control-button"> 
                            <span class="material-icons main-button control-button" @click=${() => this.handlebutton()}>
                                ${state.timers[state.currentTimer].paused ? "play_arrow" : state.timers[state.currentTimer].elapsed ? "stop" : state.timers[state.currentTimer].running ? "pause" : "play_arrow"}
                            </span>
                        </div>
                        <div class="control-button" @click=${() => this.handleAddTimer()}>Add timer</div>
                    </div>
                </div>
                <div id="timer-nav" ?hidden=${state.currentDisplayType !== 'timers'}>
                    <div class="row" >
                        <div class="col" id="previous-button">
                            &nbsp;
                            <button ?hidden=${state.currentTimer === 0} @click=${() => this.handlePrevious()}>&#8592;</button>
                        </div>
                        <div class="col">
                            <button ?hidden=${state.currentTimer === state.timers.length -1} @click=${() => this.handleNext()}>&#8594;</button>
                            &nbsp;
                        </div>
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
function createNewTestTimer():Timer{
    return {
        timerLength: 10000,
        timeElapsed: 0,
        startTime: new Date(),
        previousTimeElapsed: 0,
        running: false,
        elapsed: false,
        paused: false,
        timeLeft: 0
    }
}

customElements.define('time-timer', TIMETimer);