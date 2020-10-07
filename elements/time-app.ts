import {
    html,
    render as litRender,
} from 'lit-html'
import './time-alarm'
import './time-clock'
import './time-stopwatch'
import './time-timer'

class TIMEApp extends HTMLElement {


    constructor() {
        super();
        litRender(this.render(), this);
    }

    render() {
        return html`
        <div id="app" class="container">
            <div class="app-body">
                <time-alarm></time-alarm>
                <time-clock></time-clock>
                <time-timer></time-timer>
                <time-stopwatch></time-stopwatch>
            </div>
            <div id="app-menu" class="row">
                <div class="app-button three columns" id="alarm-button"><i class="far fa-bell"></i></br>Alarm</div>
                <div class="app-button three columns" id="clock-button"><i class="far fa-clock"></i></br>Clock</div>
                <div class="app-button three columns" id="timer-button"><i class="fas fa-hourglass-end"></i></br>Timer</div>
                <div class="app-button three columns" id="stopwatch-button"><i class="fas fa-stopwatch"></i></br>Stopwatch</div>
            </div>
        </div>
        `;
    }
}

window.customElements.define('time-app', TIMEApp);