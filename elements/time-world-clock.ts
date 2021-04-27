import {
    html,
    render as litRender,
} from 'lit-html'

import {
    createObjectStore
} from 'reduxular'

type State = Readonly<{
    timeZone: string;
    label: string;    
    date: Date;
}>;

const InitialState: State = {
    timeZone: 'UTC',
    label: 'UTC',
    date: new Date()
}

class TIMESmallClock extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this.shadowRoot), this);
    readonly shadow = this.attachShadow({
        mode: 'open'
    });

    set timeZone(value: string) {
        this.store.timeZone = value;
    }
    set label(value: string) {
        this.store.label = value;
    }

    calculateTimeOffset() {
        let localDate:Date = new Date()
        let timeZoneDate:Date = new Date(new Date().toLocaleString("en-US", {timeZone: this.store.timeZone}))
        if (localDate.getDate() < timeZoneDate.getDate() || localDate.getMonth() < timeZoneDate.getMonth() || localDate.getFullYear() < timeZoneDate.getFullYear()) {
            return 24 + timeZoneDate.getHours() - localDate.getHours();
        }
        return timeZoneDate.getHours() - localDate.getHours();
    }

    displayTimeOffset():string {
        let timeOffset = this.calculateTimeOffset() 
        let display: string = '';
        if (timeOffset === 0) {
            return "Local time";
        }
            display += Math.abs(timeOffset);
            display += " hour";
            if (Math.abs(timeOffset) !== 1) {
                display += "s";
            }
            if (timeOffset < 0) {
                display += " behind";
            } else {
                display += " ahead";
            }

        return display;
    }

    connectedCallback() {
        setInterval(() => this.store.date = new Date(), 1000);
    }

    render(state: State) {
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <style>
                #label {
                    font-size: 12pt;
                }
                #ahead {
                    font-size: 10pt;
                    color: var(--inactiveColor);
                }
                #time {
                    text-align: right;
                    font-size: 20pt;
                }
                #clock-container {
                    height: 100%;
                }
            </style>
            <div id="clock-container" class="row">
                <div class="col">
                    <div id="label">
                        ${state.label}
                    </div>
                    <div id="ahead">
                        ${this.displayTimeOffset()}
                    </div>
                </div>
                <div class="col" id="time">
                ${state.date.toLocaleString('en-US', {
                    hour12: true, hour: 'numeric', minute: '2-digit', timeZone: state.timeZone
                    })
                }
                </div>
            </div>
        `;
    }

}

customElements.define('time-smallclock', TIMESmallClock);