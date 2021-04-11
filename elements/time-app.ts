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
        this.currentDisplayType = 'timer'
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
            @import 'vars.css';

            #app-menu {
                background-color: #36373a;
                box-sizing: border-box;
                padding: 8px 15px;
                width: 100%;
                font-size: 0;

                position: fixed;
                bottom: 0;

                overflow: hidden;
            }

            #app-nav {
                max-width: 500px;
                min-width: 275px;
                margin: auto;
            }

            .app-button {
                color: var(--inactiveColor);
                text-align: center;
                font-size: 12pt;
            }
            .app-button-icon {
                font-size: 20pt;
            }

            .app-button.active {
                color: var(--activeColor);
            }

            .selected-app {
                color: var(--activeColor);
            }

            #app-body {
                box-sizing: border-box;
                padding-top:10px;
                height: 100%;
                max-width: 500px;
                min-width: 275px;
                margin: auto;
            }

            .app-title {
                color: white;
                text-align: center;
                font-size: 12pt;
            }

        </style>

        <div id="app-body">
            <div class='app-title'>${capitalize(this.currentDisplayType)}</div>
            <time-alarm id="alarm-app" ?hidden=${this.currentDisplayType !== 'alarm'}></time-alarm>
            <time-clock id="clock-app" ?hidden=${this.currentDisplayType !== 'clock'}></time-clock>
            <time-timer id="timer-app" ?hidden=${this.currentDisplayType !== 'timer'}></time-timer>
            <time-stopwatch id="stopwatch-app" ?hidden=${this.currentDisplayType !== 'stopwatch'}></time-stopwatch>
        </div>
        <div id="app-menu">
            <div id="app-nav" class="row">
                <span class="app-button cols ${this.isSelected("alarm")}" id="alarm-button" @click="${() => this.setDisplay("alarm")}">
                    <span class="material-icons app-button-icon">access_alarm</span>
                    <br>Alarm
                </span>
                <span class="app-button cols ${this.isSelected("clock")}" id="clock-button" @click=${() => this.setDisplay("clock")}>
                    <span class="material-icons app-button-icon">schedule</span>
                    <br>Clock
                </span>
                <span class="app-button cols ${this.isSelected("timer")}" id="timer-button" @click=${() => this.setDisplay("timer")}>
                    <span class="material-icons app-button-icon">hourglass_bottom</span>
                    <br>Timer
                </span>
                <span class="app-button cols ${this.isSelected("stopwatch")}" id="stopwatch-button" @click=${() => this.setDisplay("stopwatch")}>
                    <span class="material-icons app-button-icon">timer</span>
                    <br>Stopwatch
                </span>
                <span class="stretch"></span>
            </div>
        </div>
        `;
    }
}

customElements.define('time-app', TIMEApp);