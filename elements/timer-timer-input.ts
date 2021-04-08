import {
    html,
    render as litRender,
} from 'lit-html'

import {
    formatTwoDigits,
    millisToHourMinSec
} from '../ts/utils';

class TIMETimerInput extends HTMLElement {
    private _hourInput: number;
    private _minuteInput: number;
    private _secondInput: number;
    private _input: number[];

    get value() {
        return this.convertTimeToMillis();
    }
    set value(value: number) {
        this._input = this.convertTimeToInput(value);
        this.convertInputToTime();
        litRender(this.render(), this);
    }

    constructor() {
        super();
        this._hourInput = 0;
        this._minuteInput = 0;
        this._secondInput = 0;
        this._input = [];
    }

    connectedCallback() {
        litRender(this.render(), this);
    }

    convertTimeToMillis() {
        let millis = 0;
        millis += this._hourInput * 3.6e+6;
        millis += this._minuteInput * 60000;
        millis += this._secondInput * 1000;
        return millis
    }

    get inputTime() {
        return this.convertTimeToMillis();
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
        if (this._input.length > 0) {
            this._secondInput = this._input[0];
        } else {
            this._secondInput = 0;
        }
        if (this._input.length > 1) {
           this._secondInput += this._input[1] * 10;
        }
        if (this._input.length > 2) {
            this._minuteInput = this._input[2];
        } else {
            this._minuteInput = 0;
        }
        if (this._input.length > 3) {
            this._minuteInput += this._input[3] * 10;
        }
        if (this._input.length > 4) {
            this._hourInput = this._input[4];
        } else {
            this._hourInput = 0;
        }
        if (this._input.length > 5) {
            this._hourInput += this._input[5] * 10;
        }
    }

    handleBackspace()  {
        this._input.splice(0, 1);
        this.convertInputToTime();
        litRender(this.render(), this);
        this.dispatchEvent(new CustomEvent('input', {detail: this.convertTimeToMillis()}));
    }

    handleInput(input: number) {
        if (this._input.length >= 6) {
            return;
        }
        this._input.splice(0, 0, input);
        this.convertInputToTime();

        litRender(this.render(), this);
        this.dispatchEvent(new CustomEvent('input', {detail: this.convertTimeToMillis()}));
    }

    render() {
        return html`
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
                    margin-bottom: 25px;
                }
            </style>
            <div id="timer-input">
                <div id="timer-length-input" class="${(this._input.length > 0 ? 'active' : 'inactive')}">
                    <span class="input-number-display">
                        ${formatTwoDigits(this._hourInput)}
                    </span>
                    <span class="input-unit-display">h</span>
                    <span class="input-number-display">
                        ${formatTwoDigits(this._minuteInput)}
                    </span>
                    <span class="input-unit-display">m</span>
                    <span class="input-number-display">
                        ${formatTwoDigits(this._secondInput)}
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
                    <!-- <div class="four columns input-number">&nbsp;</div> -->
                    <div class="four columns input-number">&nbsp;</div>
                    <div class="four columns input-number" @click=${() => this.handleInput(0)}>0</div>
                    <div class="four columns input-number">&nbsp;</div>
                </div>
            </div>
        `;
    }

}

customElements.define('time-timerinput', TIMETimerInput);