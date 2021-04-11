import {
    html,
    render as litRender,
} from 'lit-html'

import {
    createObjectStore
} from 'reduxular'

import {
    millisToHourMinSecString
} from '../ts/utils';

type State = Readonly<{
    radius: number,
    stroke: number,
    elapsed: boolean,
    paused: boolean,
    runTime: number,
    timerLength: number,
    timeElapsed: number,
}>;

const InitialState: State = {
    radius: 100,
    stroke: 6,
    elapsed: false,
    paused: false,
    runTime: 0,
    timeElapsed: 0,
    timerLength: 100000,
};

class TIMETimeDispaly extends HTMLElement {
    
    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this.shadowRoot), this);
    readonly shadow = this.attachShadow({
        mode: 'open'
    })

    static get properties() {
        return {
            paused: {attribute: true, type: Boolean},
            elapsed: {type: Boolean}
        };
    }

    // Display Properties
    set paused(value: boolean) {
        this.store.paused = value;
    }
    set radius(value: number) {
        this.store.radius = value;
    }
    set elapsed(value: boolean) {
        this.store.elapsed = value;
    }
    set stroke(value: number) {
        this.store.stroke = value;
    }

    // Time Properties
    set runTime(value: number) {
        this.store.runTime = value;
    }
    set timerLength(value: number) {
        this.store.timerLength = value;
    }
    set timeElapsed(value: number) {
        this.store.timeElapsed = value;
    }

    // Time helpers
    private _percentComplete() {
        return Math.min(this.store.timeElapsed / this.store.timerLength * 100, 100);
    }
    private _timeLeft() {
        return this.store.timerLength - this.store.timeElapsed;
    }

    // Display helpers
    private _pos() {
        return this.store.radius + (this.store.stroke/2);
    }
    private _width() {
        return (this.store.radius * 2) + this.store.stroke;
    }
    private _circumference() {
        return 2 * Math.PI * this.store.radius;
    }

    render(state:State) {
        // TODO This is all good and clever but it only works if there is one of them. As soon as you add a second time-display then this css is going to change and its going to affect both of the time-displays because they both have the same classes and ids
        // Obviously I would like to learn the best way to avoid that but for right now we only need one. So lets keep moving forward
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <style>
                @import 'vars.css';

                #standin-timer {
                    position: absolute;
                    top: ${this._timeLeft() > 3.6e+7 - 1000 ? 64 : this._timeLeft() > 3.6e+6 - 1000 ? 60 : 50}px;
                    width: 100%;
                    color: var(--activeColor);
                    font-size: ${this._timeLeft() > 3.6e+7 - 1000 ? 34 : this._timeLeft() > 3.6e+6 - 1000 ? 40 : 50}pt;
                    text-align: center;
                }
                .timer {
                    position: relative;
                    margin: 40px auto;
                    margin-top: 40px;
                    width: ${this._width()}px;
                    height: ${this._width()}px;
                }
                #progressbar {
                    transform: rotate(-90deg);
                    width: ${this._width()}px;
                    height: ${this._width()}px;
                }
                #progressbar circle {
                    fill: none;
                    stroke-width: ${this.store.stroke};
                    stroke-dasharray: ${this._circumference()};
                    stroke-dashoffset: ${this._circumference()};
                    stroke-linecap: round; 
                }
                #progressbar circle:nth-child(1){ 
                    stroke-dashoffset: 0; 
                    stroke: var(--bodyColor); 
                } 
                #progressbar circle:nth-child(2){
                    stroke-dashoffset: calc(${this._circumference()} - (${this._circumference()} * ${this._percentComplete()}) / -100);
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
            <div class="timer">
                <svg id="progressbar" class="${(this.store.elapsed ? 'elapsed':'')}">
                    <circle cx="${this._pos()}", cy="${this._pos()}" r="${this.store.radius}"></circle>
                    <circle cx="${this._pos()}", cy="${this._pos()}" r="${this.store.radius}"></circle>
                </svg>
                <!-- TODO I like adding the 1000 ms to the timer so that it start with the time you put in and ends as 1 turns to zero instead of having a whole second where its at zero but the timer isn't elapsed.
                But there is still the problem that we have two whole seconds of what is displayed as zero. from 0.999 seconds to -0.999 seconds. 
                How do I handle that. One hack I am trying is to only add those 999 when we are positive still. It still feels hacky. This whole thing feels hacky-->
                ${""/* By doing 999 instead of 1000 then it won't ever display to the user what we are up to.*/}
                <div id="standin-timer" class="${(this.store.paused ? 'elapsed':'')}">
                    ${(this._timeLeft() < 0 ? '-': '')}${millisToHourMinSecString(Math.abs(this._timeLeft() + (this._timeLeft() < 0 ? 0 : 999)))}
                </div>
            </div>
        `;
    }

}

customElements.define('time-timedisplay', TIMETimeDispaly);