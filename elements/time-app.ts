import {
    html,
    render as litRender,
} from 'lit-html'

import {
   capitalize 
} from '../ts/utils';

import './time-alarm'
import './time-clock'
import './time-stopwatch'
import './time-timer'

enum App{
    alarm, timer, clock, stopwatch
};

type apptype = 'alarm' | 'timer' | 'clock' | 'stopwatch'

class TIMEApp extends HTMLElement {

    currentDisplayType: apptype

    connectedCallback() {
        this.setup();
        litRender(this.render(), this)
    }

    setup(){
        this.currentDisplayType = 'stopwatch'
        return;
    }

    setDisplay(display: apptype) {
        this.currentDisplayType = display;
        litRender(this.render(), this);
    }

    isSelected(display: apptype) {
        if (display === this.currentDisplayType) {
            return 'selected-app'
        }
        return ''
    }

    render() {
        return html`
        <style>

            #app-menu {
                padding: 5px;
                background-color: #36373a;
            }

            .app-button {
                color: #bdc1c6;
                text-align: center;
            }

            .app-button.active {
                color: #8ab4f8;
            }

            .selected-app {
                color: #8ab4f8;
            }

            #app-body {
                height: 500px;
            }

            .app-title {
                color: white;
                text-align: center;
                font-size: 14pt;
            }

        </style>

        <div id="app" class="container">
            <div id="app-body">
                <div class='app-title'>${capitalize(this.currentDisplayType)}</div>
                <time-alarm id="alarm-app" ?hidden=${this.currentDisplayType !== 'alarm'}></time-alarm>
                <time-clock id="clock-app" ?hidden=${this.currentDisplayType !== 'clock'}></time-clock>
                <time-timer id="timer-app" ?hidden=${this.currentDisplayType !== 'timer'}></time-timer>
                <time-stopwatch id="stopwatch-app" ?hidden=${this.currentDisplayType !== 'stopwatch'}></time-stopwatch>
            </div>
            <div id="app-menu" class="row">
                <div class="app-button three columns ${this.isSelected("alarm")}" id="alarm-button" @click="${() => this.setDisplay("alarm")}">
                    <span class="material-icons">access_alarm</span>
                    <br>Alarm
                </div>
                <div class="app-button three columns ${this.isSelected("clock")}" id="clock-button" @click=${() => this.setDisplay("clock")}>
                    <span class="material-icons">schedule</span>
                    <br>Clock
                </div>
                <div class="app-button three columns ${this.isSelected("timer")}" id="timer-button" @click=${() => this.setDisplay("timer")}>
                    <span class="material-icons">hourglass_bottom</span>
                    <br>Timer
                </div>
                <div class="app-button three columns ${this.isSelected("stopwatch")}" id="stopwatch-button" @click=${() => this.setDisplay("stopwatch")}>
                    <span class="material-icons">timer</span>
                    <br>Stopwatch
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('time-app', TIMEApp);