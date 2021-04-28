import {
    html,
    render as litRender,
} from 'lit-html'

import {
    createObjectStore
} from 'reduxular'

import {
    timeZones
}from '../assets/timezones'

import './time-world-clock'

type Clock = {
    timeZone: string;
    label: string;
}
type display = 'input' | 'clock';
type State = Readonly<{
    display: display;
    time: Date;
    hour12: boolean,
    clocks: Clock[];
}>;
const InitialState: State = {
    display: 'clock',
    time: new Date(),
    hour12: true,
    clocks: []
}

class TIMEClock extends HTMLElement {

    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this.shadowRoot), this);
    readonly shadow = this.attachShadow({
        mode: 'open'
    })

    updateClock() {
        this.store.time = new Date();
    }

    connectedCallback() {
        setInterval(() => this.updateClock(), 1000);
    }

    handleAddTimer() {
        if (this.store.display === 'input') {
            let timeZone = (<HTMLSelectElement>this.shadow.querySelector('#timeZone')).selectedOptions[0].value;
            let label = (<HTMLInputElement>this.shadow.querySelector('#label input')).value
            if (label === '') {
                label = timeZone.slice(timeZone.search('/') + 1).replace(/_/g, ' ');
            }
            this.store.clocks = [
                ...this.store.clocks,
                {
                    timeZone: timeZone,
                    label: label
                }
            ];
            this.store.display = 'clock';
        } else {
            this.store.display = 'input';
        }
    }

    render(state: State) {
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <style>
                #clock-body {
                    margin-bottom: 150px;
                }
                #main-clock {
                    margin-top: 40px;
                    margin-bottom: 25px;
                }
                #main-clock-time {
                    color: #8ab4f8;
                    text-align: center;
                    font-size: 50pt;
                }

                #main-clock-date {
                    text-align: center;
                    font-size: 15pt;
                }
                #secondary-clocks {
                    padding: 0 30px;
                }
                #secondary-clocks hr{
                    border: 1px solid #555;
                    width: 95%;
                }
                .small-clock {
                    margin: 15px 0;
                }
                #new-clock-input {
                    margin: 50px 0;
                }
                #input-background {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #label {
                    margin: auto;
                    margin-bottom: 25px;
                }
                #timeZone {
                    margin: auto;
                }
                #label input {
                    background: none;
                    border: none;
                    color: var(--bodyColor);
                    border-bottom: 2px solid var(--inactiveColor);
                    outline: none;
                }
            </style>
            <div id="clock-body">
                <div id="clock" ?hidden=${state.display !== 'clock'}>
                    <div id="main-clock">
                        <div>
                            <div id="main-clock-time">
                                ${state.time.toLocaleString('default', { hour12: state.hour12, hour: 'numeric', minute: '2-digit'}).toLowerCase()}
                            </div>
                        </div>
                        <div id="main-clock-date">${state.time.toLocaleString('default', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                    </div>
                    <div id="secondary-clocks">
                        ${state.clocks.map((clock) => html`
                            <hr>
                            <div class="small-clock">
                                <time-smallclock .timeZone=${clock.timeZone} .label=${clock.label}></time-smallclock>
                            </div>
                        `)}
                    </div>
                </div>
                <div id="new-clock-input" ?hidden=${state.display !== 'input'}>
                    <div id="input-background">
                        <div id="#input-window">
                            <div id="label">
                                <span>Label: </span>
                                <input>
                            </div>
                            <select name="timeZone" id="timeZone">
                                ${timeZones.map((timeZone) => html`
                                    <option value="${timeZone}">${timeZone.replace(/_/g, ' ')}</option>
                                `)}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="controls">
                    <div class="control-button"> 
                        <span class="material-icons main-button control-button" @click=${() => this.handleAddTimer()}>
                            ${state.display === 'clock' ? 'language' : 'add'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

}

window.customElements.define('time-clock', TIMEClock);