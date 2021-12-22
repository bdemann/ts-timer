import {
    html,
    render as litRender,
} from 'lit-html';

import {
    createObjectStore
} from 'reduxular'

type Days = Readonly<{
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
}>;

export type Alarm = Readonly<{
    time: string;
    on: boolean;
    repeat: boolean;
    days: Days;
    song: string;
    vibrate: boolean;
    label: string;
    selected: boolean;
}>;

type State = Readonly<{
    alarm: Alarm;
}>;

const InitialState: State = {
    alarm: {
        time: '12:00pm',
        on: false,
        repeat: false,
        days: {sunday: false, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false},
        song: 'None',
        vibrate: true,
        label: 'label',
        selected: true
    }
}

class TIMEAlarm extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this.shadowRoot), this);
    readonly shadow = this.attachShadow({
        mode: 'open'
    });

    // set alarm(value: Alarm) {
    //     this.store.alarm = value;
    // }

    handleLess() {
        this.store.alarm = {
            ...this.store.alarm,
            selected: false
        };
    }

    handleMore() {
        this.store.alarm = {
            ...this.store.alarm,
            selected: true
        };
    }

    render(state: State) {
        if(!state.alarm.selected) {
            return html`
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
                <link rel="stylesheet" href="css/styles.css">
                <div class="alarm-header row">
                    <div class="alarm-time col">${state.alarm.time}</div>
                    <div class="alarm-switch col ${state.alarm.on ? "on" : "off"}">
                        <span class="material-icons" id="alarm-toggle">
                            ${state.alarm.on ? 'toggle_on' : 'toggle_off'}
                        </span>
                    </div>
                </div>
                
                <div>
                    <span>Everyday: </span><span>${state.alarm.label}</span><span @click=${() => this.handleMore()} class="material-icons">expand_more</span>
                </div>
            `;
        }
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <style>
                .alarm-time {
                    font-size: 30pt;
                }
                .alarm-switch {
                    font-size: 20pt;
                    padding-top: 20px;
                }
                .alarm-switch.on, .alarm-time.on {
                    color: #8ab4f8;
                }
                .icon {
                    margin-right: 10px;
                }
                .wide {
                    flex: 4;
                }
                .day {
                    display: block;
                    width: 25px;
                    height: 25px;
                    text-align: center;
                }
                .day-on {
                    border-radius: 25px;
                }
                .day-off {

                }
                #alarm-song {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .on .day-on {
                    background-color: var(--activeColor);
                }
                .off .day-on {
                    background-color: var(--inactiveColor);
                    color: var(--bodyColor);
                }
                .off {
                    color: var(--inactiveColor);
                }
                .on .alarm-time {
                    color: var(--activeColor);
                }
                .off .alarm-time {
                    color: var(--inactiveColor);
                }
                #alarm-toggle {
                    font-size: 30pt;
                    display: block;
                    text-align: right;
                }
                .row {
                    margin-bottom: 15px;
                }
            </style>
            <div class="alarm ${state.alarm.on ? "on" : "off"}">
                <div class="alarm-header row">
                    <div class="alarm-time col">${state.alarm.time}</div>
                    <div class="alarm-switch col ${state.alarm.on ? "on" : "off"}">
                        <span class="material-icons" id="alarm-toggle">
                            ${state.alarm.on ? 'toggle_on' : 'toggle_off'}
                        </span>
                    </div>
                </div>
                <div>
                    <div class="row">
                        <span class="material-icons icon">
                            ${state.alarm.repeat ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span class="wide">Repeat</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col"><span class="day ${state.alarm.days.sunday ? "day-on" : "day-off"}">S</span></div>
                    <div class="col"><span class="day ${state.alarm.days.monday ? "day-on" : "day-off"}">M</span></div>
                    <div class="col"><span class="day ${state.alarm.days.tuesday ? "day-on" : "day-off"}">T</span></div>
                    <div class="col"><span class="day ${state.alarm.days.wednesday ? "day-on" : "day-off"}">W</span></div>
                    <div class="col"><span class="day ${state.alarm.days.thursday ? "day-on" : "day-off"}">T</span></div>
                    <div class="col"><span class="day ${state.alarm.days.friday ? "day-on" : "day-off"}">F</span></div>
                    <div class="col"><span class="day ${state.alarm.days.saturday ? "day-on" : "day-off"}">S</span></div>
                </div>
                <div>
                    <div class="row">
                        <div class="col" id="alarm-song">
                            <span class="material-icons icon">notifications_active</span>
                            <span>${state.alarm.song}</span>
                        </div>
                        <div class="col">
                            <span class="material-icons icon">
                                ${state.alarm.vibrate ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            <span>Vibrate</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="row">
                        <span class="material-icons icon">label</span>
                        <div class="wide">${state.alarm.label}</div>
                        <span @click=${() => this.handleLess()} class="material-icons">expand_less</span>
                    </div>
                </div>
            </div>
            </div>
        `;
    }

}

customElements.define('time-alarm', TIMEAlarm);