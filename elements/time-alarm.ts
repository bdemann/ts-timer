import {
    html,
    LitElement
} from 'lit-element'

class TIMEAlarm extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
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
            </style>
            <div id="alarm-body">
                <div class="alarm">
                    <div class="alarm-header row">
                        <div class="alarm-time on ten columns">6:15 am</div>
                        <div class="alarm-switch on two columns"><i class="material-icons">toggle-on</i></div>
                    </div>
                    <div class="row">
                        <div class="twelve columns">
                            <i class="material-icons">check_box</i> Repeat
                        </div>
                    </div>
                    <div class="row">
                        S M T W T F S
                    </div>
                    <div class="row">
                        <div class="eight columns">
                            <i class="material-icons">notifications-active</i>&nbsp;&nbsp;The Morning Breaks
                        </div>
                        <div class="four columns">
                            <i class="fas fa-check-square"></i> Vibrate
                        </div>
                    </div>
                    <div class="row">
                        <div class="eight columns">
                            <i class="fas fa-tag"></i>&nbsp;&nbsp;&nbsp;Wake up
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        `;
    }

}

customElements.define('time-alarm', TIMEAlarm);