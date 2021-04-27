import {
    html,
    render as litRender,
} from 'lit-html'

import {
    createObjectStore
} from 'reduxular'

import {
    formatTwoDigits,
    millisToHourMinSec,
    hourMinSecToMillis
} from '../ts/utils';

type State = Readonly<{
    hourInput: number;
    minuteInput: number;
    secondInput: number;
    input: number[];
}>;

const InitialState: State = {
    hourInput: 0,
    minuteInput: 0,
    secondInput: 0,
    input: []
}

class TIMETimerInput extends HTMLElement {

    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this.shadowRoot), this);
    readonly shadow = this.attachShadow({
        mode: 'open'
    });

    get value() {
        return this.convertTimeToMillis();
    }
    set value(value: number) {
        if (value > 0){
            return
        }
        this.store.input = this.convertTimeToInput(value);
        this.convertInputToTime();
    }

    convertTimeToMillis() {
        return hourMinSecToMillis(
            this.store.hourInput,
            this.store.minuteInput,
            this.store.secondInput
        );
    }

    convertTimeToInput(time: number) {
        let times = millisToHourMinSec(time);
        let hourInput = times[0];
        let minuteInput = times[1];
        let secondInput = times[2];
        let input = [0, 0, 0, 0, 0, 0];
        if (hourInput > 0) {
            input[4] = hourInput % 10;
            if (hourInput > 9) {
                input[5] = Math.floor(hourInput / 10);
            }
        }
        if (minuteInput > 0) {
            input[2] = minuteInput % 10;
            if (minuteInput > 9) {
                input[3] = Math.floor(minuteInput / 10);
            }
        }
        if (secondInput > 0) {
            input[0] = secondInput % 10;
            if (secondInput > 9) {
                input[1] = Math.floor(secondInput / 10);
            }
        }
        for (var i = input.length - 1; i >= 0; i--) {
            if(input[i] === 0) {
                input.pop();
            } else {
                break;
            }
        }
        return input;
    }

    convertInputToTime() {
        if (this.store.input.length > 0) {
            this.store.secondInput = this.store.input[0];
        } else {
            this.store.secondInput = 0;
        }
        if (this.store.input.length > 1) {
           this.store.secondInput += this.store.input[1] * 10;
        }
        if (this.store.input.length > 2) {
            this.store.minuteInput = this.store.input[2];
        } else {
            this.store.minuteInput = 0;
        }
        if (this.store.input.length > 3) {
            this.store.minuteInput += this.store.input[3] * 10;
        }
        if (this.store.input.length > 4) {
            this.store.hourInput = this.store.input[4];
        } else {
            this.store.hourInput = 0;
        }
        if (this.store.input.length > 5) {
            this.store.hourInput += this.store.input[5] * 10;
        }
    }

    handleBackspace()  {
        this.store.input = this.store.input.filter((element, index) => {
            return index != 0
        })
        this.convertInputToTime();
        this.dispatchEvent(new CustomEvent('input', {detail: this.convertTimeToMillis()}));
    }

    handleInput(input: number) {
        if (this.store.input.length >= 6) {
            return;
        }
        if (this.store.input.length === 0 && input === 0) {
            return;
        }
        this.store.input = [
            input,
            ...this.store.input
        ]
        this.convertInputToTime();

        this.dispatchEvent(new CustomEvent('input', {detail: this.convertTimeToMillis()}));
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
                .active {
                    color: var(--activeColor);
                }
                .inactive {
                    color: var(--inactiveColor);
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
                    margin-bottom: 40px;
                }
                .input-number {
                    font-size: 18pt;
                }
                #keypad {
                    padding: 30px 50px 0 50px;
                }
                hr {
                    width: 80%;
                    border-color: darkgray;
                }
            </style>
            <div id="timer-input">
                <div id="timer-length-input" class="${(state.input.length > 0 ? 'active' : 'inactive')}">
                    <span class="input-number-display">
                        ${formatTwoDigits(state.hourInput)}
                    </span>
                    <span class="input-unit-display">h</span>
                    <span class="input-number-display">
                        ${formatTwoDigits(state.minuteInput)}
                    </span>
                    <span class="input-unit-display">m</span>
                    <span class="input-number-display">
                        ${formatTwoDigits(state.secondInput)}
                    </span>
                    <span class="input-unit-display">s</span>
                    &nbsp;
                    <span class="material-icons" @click=${() => this.handleBackspace()}>
                        backspace
                    </span>
                </div>
                <hr>
                <div id="keypad">
                    <div class="row input-row">
                        <div class="col input-number" @click=${() => this.handleInput(1)}>1</div>
                        <div class="col input-number" @click=${() => this.handleInput(2)}>2</div>
                        <div class="col input-number" @click=${() => this.handleInput(3)}>3</div>
                    </div>
                    <div class="row input-row">
                        <div class="col input-number" @click=${() => this.handleInput(4)}>4</div>
                        <div class="col input-number" @click=${() => this.handleInput(5)}>5</div>
                        <div class="col input-number" @click=${() => this.handleInput(6)}>6</div>
                    </div>
                    <div class="row input-row">
                        <div class="col input-number" @click=${() => this.handleInput(7)}>7</div>
                        <div class="col input-number" @click=${() => this.handleInput(8)}>8</div>
                        <div class="col input-number" @click=${() => this.handleInput(9)}>9</div>
                    </div>
                    <div class="row input-row" id="bottom-row">
                        <div class="col input-number">&nbsp;</div>
                        <div class="col input-number" @click=${() => this.handleInput(0)}>0</div>
                        <div class="col input-number">&nbsp;</div>
                    </div>
                </div>
            </div>
        `;
    }

}

customElements.define('time-timerinput', TIMETimerInput);