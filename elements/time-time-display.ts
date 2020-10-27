import {
    html,
    render as litRender,
} from 'lit-html'

import {
    millisToHourMinSec
} from '../ts/utils';

class TIMETimeDispaly extends HTMLElement {
    okToRender: boolean;
    static get properties() {
        return {
            paused: {attribute: true, type: Boolean},
            elapsed: {type: Boolean}
        };
    }

    // Display Properties
    private _radius: number;
    private _elapsed: boolean;
    private _stroke: number;
    private _paused: boolean;
    set paused(value: boolean) {
        this._paused = value;
    }
    set radius(value: number) {
        this._radius = value;
    }
    set elapsed(value: boolean) {
        this._elapsed = value;
    }
    set stroke(value: number) {
        this._stroke = value;
    }

    // Time Properties
    private _runTime: number;
    private _timerLength: number;
    private _timeElapsed: number;
    set runTime(value: number) {
        this._runTime = value;
    }
    set timerLength(value: number) {
        this._timerLength = value;
    }
    set timeElapsed(value: number) {
        this._timeElapsed = value;
    }

    // Time helpers
    private _percentComplete() {
        return Math.min(this._timeElapsed / this._timerLength * 100, 100);
    }
    private _timeLeft() {
        return this._timerLength - this._timeElapsed;
    }

    // Display helpers
    private _pos() {
        return this._radius + (this._stroke/2);
    }
    private _width() {
        return (this._radius * 2) + this._stroke;
    }
    private _circumference() {
        return 2 * Math.PI * this._radius;
    }

    constructor() {
        super();
        this.okToRender = false;
        this.stroke = 6;
        this.radius = 100;
        this._timeElapsed = 0;
        this._timerLength = 100000;
    }

    connectedCallback() {
        this.okToRender = true;
        litRender(this.render(), this);
        //TODO why does it freeze up when I try to update it just when the properites are updated?
        setInterval(() => litRender(this.render(), this), 10);
    }

    render() {
        // TODO This is all good and clever but it only works if there is one of them. As soon as you add a second time-display then this css is going to change and its going to affect both of the time-displays because they both have the same classes and ids
        // Obviously I would like to learn the best way to avoid that but for right now we only need one. So lets keep moving forward
        if (!this.okToRender) {
            return html``;
        }
        return html`
            <style>
                @import 'vars.css';

                #standin-timer {
                    position: absolute;
                    top: ${this._radius/2}px;
                    width: 100%;
                    color: var(--activeColor);
                    font-size: 50pt;
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
                    stroke-width: ${this._stroke};
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
                <svg id="progressbar" class="${(this._elapsed ? 'elapsed':'')}">
                    <circle cx="${this._pos()}", cy="${this._pos()}" r="${this._radius}"></circle>
                    <circle cx="${this._pos()}", cy="${this._pos()}" r="${this._radius}"></circle>
                </svg>
                <!-- TODO I like adding the 1000 ms to the timer so that it start with the time you put in and ends as 1 turns to zero instead of having a whole second where its at zero but the timer isn't elapsed. But there is still the problem that we have two whole seconds of what is displayed as zero. from 0.999 seconds to -0.999 seconds. How do I handle that -->
                <div id="standin-timer" class="${(this._paused ? 'elapsed':'')}">${(this._timeLeft() < 0 ? '-': '')}${millisToHourMinSec(Math.abs(this._timeLeft() + 1000))}</div>
            </div>
        `;
    }

}

customElements.define('time-timedisplay', TIMETimeDispaly);