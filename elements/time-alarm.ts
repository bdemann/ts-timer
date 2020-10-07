import {
    html,
    render as litRender
} from 'lit-html'

class TIMEAlarm extends HTMLElement {
    constructor() {
        super();
        litRender(this.render(), this);
    }

    render() {
        return html`
            <div id="alarm-body">
                <div class='app-title'>Alarm</div>
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

window.customElements.define('time-alarm', TIMEAlarm);