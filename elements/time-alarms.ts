import {
    html,
    render as litRender,
} from 'lit-html';

import './time-alarm'

import {
    Alarm
} from './time-alarm'

import {
    createObjectStore
} from 'reduxular'

type State = Readonly<{
    selectedAlarm: number;
    alarms: Alarm[];
}>;

const InitialState: State = {
    selectedAlarm: 0,
    alarms: [
        {
        time: '6:15pm',
        on: true,
        repeat: true,
        days: {
            sunday: true,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
        },
        song: 'The Morning Breaks',
        vibrate: true,
        label: 'Wake Up',
        selected: true
        },
        {
        time: '9:00pm',
        on: true,
        repeat: true,
        days: {
            sunday: true,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
        },
        song: 'Claxon',
        vibrate: false,
        label: 'Wind down',
        selected: false
        },
        {
        time: '9:30pm',
        on: false,
        repeat: true,
        days: {
            sunday: true,
            monday: false,
            tuesday: true,
            wednesday: false,
            thursday: true,
            friday: false,
            saturday: true,
        },
        song: 'Meow Mix Theme',
        vibrate: false,
        label: 'Feed the cat',
        selected: false
        },
        {
        time: '7:00am',
        on: true,
        repeat: false,
        days: {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
        },
        song: 'Flight of the Silverbird',
        vibrate: true,
        label: 'Wake Up',
        selected: false
        }
    ]
    
}

class TIMEAlarms extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this.shadowRoot), this);
    readonly shadow = this.attachShadow({
        mode: 'open'
    });

    render(state: State) {
        console.log('is it because we are rending here? no because the value reports as false')
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <style>
                #alarms {
                    margin-bottom: 150px;
                }
                .alarm {
                    padding: 0 25px;
                }
                .alarm hr {
                    width: 95%;
                }
            </style>
            <div id="alarms">
                ${state.alarms.map((alarm, index) => html`
                    <div class="alarm">
                        <hr>
                        <time-alarm
                            .alarm=${alarm}
                        ></time-alarm>
                    </div>
                `)}
            </div>
            <hr>
                <div class="controls">
                    <div class="control-button"> 
                        <span class="material-icons main-button control-button" @click=${() => console.log("Add alarm")}>
                            add
                        </span>
                    </div>
                </div>
        `;
    }

}

customElements.define('time-alarms', TIMEAlarms);