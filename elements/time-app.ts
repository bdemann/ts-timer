import {
    html,
    LitElement
} from 'lit-element'

import './time-alarm'
import './time-clock'
import './time-stopwatch'
import './time-timer'

enum App{
    alarm, timer, clock, stopwatch
};

type apptype = 'alarm' | 'timer' | 'clock' | 'stopwatch'

let thing : apptype

class TIMEApp extends LitElement {

    constructor() {
        super();
        this.setup();
    }

    setup(){
        return
        for (let i in App) {
            // TODO make these be bound to the elements instead of this
            if (!isNaN(parseInt(i))) {
                document.getElementById(App[i] + '-app').style.display = 'none';
                document.getElementById(App[i] + '-button').classList.remove('active');
            }
        }
        document.getElementById('clock-app').style.display = 'block';
        document.getElementById('clock-button').classList.add('active')
    }

    showApp(app: App) {
        console.log("This is the handler");
        return
        for (let i in App) {
            if (!isNaN(parseInt(i))) {
                document.getElementById(App[i] + '-app').style.display = 'none';
                document.getElementById(App[i] + '-button').classList.remove('active');
            }
        }
        document.getElementById(App[app] + '-app').style.display = 'block';
        document.getElementById(App[app] + '-button').classList.add('active')
    }

    render() {
        return html`
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/skeleton.css">

        <link href="node_modules/material-components-web/dist/material-components-web.min.css" rel="stylesheet">
        <script src="node_modules/material-components-web/dist/material-components-web.min.js"></script>

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
            <div class="app-body">
                <div class='app-title'>Alarm</div>
                <time-alarm id="alarm-app"></time-alarm>
                <time-clock id="clock-app"></time-clock>
                <time-timer id="timer-app"></time-timer>
                <time-stopwatch id="stopwatch-app"></time-stopwatch>
            </div>
            <div id="app-menu" class="row">
                <div class="app-button three columns" id="alarm-button" @click="${() => this.showApp(App.alarm)}">
                    <span class="material-icons">access_alarm</span>
                    <br>Alarm
                </div>
                <div class="app-button three columns" id="clock-button" @click=${() => this.showApp(App.clock)}>
                    <span class="material-icons">schedule</span>
                    <br>Clock
                </div>
                <div class="app-button three columns" id="timer-button" @click=${() => this.showApp(App.timer)}>
                    <span class="material-icons">hourglass_bottom</span>
                    <br>Timer
                </div>
                <div class="app-button three columns" id="stopwatch-button" @click=${() => this.showApp(App.stopwatch)}>
                    <span class="material-icons">timer</span>
                    <br>Stopwatch
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('time-app', TIMEApp);