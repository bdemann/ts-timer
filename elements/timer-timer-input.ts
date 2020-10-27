import {
    html,
    render as litRender,
} from 'lit-html'

import {
    formatTwoDigits,
} from '../ts/utils';

class TIMETimerInput extends HTMLElement {
    hourInput: number;
    minuteInput: number;
    secondInput: number;
    input: number[];

    constructor() {
        super();
        this.hourInput = 0;
        this.minuteInput = 0;
        this.secondInput = 0;
        this.input = [];
    }

    connectedCallback() {
        litRender(this.render(), this);
    }

    convertTimeToMillis() {
        let millis = 0;
        millis += this.hourInput * 3.6e+6;
        millis += this.minuteInput * 60000;
        millis += this.secondInput * 1000;
        return millis
    }

    get inputTime() {
        return this.convertTimeToMillis();
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
                <div id="timer-length-input" class="${(this.input.length > 0 ? 'active' : 'inactive')}">
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
            </div>
        `;
    }

}

customElements.define('time-timerinput', TIMETimerInput);