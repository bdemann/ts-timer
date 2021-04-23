import {
    html,
    render as litRender,
} from 'lit-html';

class TIMEAlarm extends HTMLElement {

    connectedCallback() {
        litRender(this.render(), this);
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
                    <div class="alarm-header">
                        <div class="alarm-time on">6:15 am</div>
                        <div class="alarm-switch on"><i class="material-icons">toggle-on</i></div>
                    </div>
                    <div>
                        <div>
                            <i class="material-icons">check_box</i> Repeat
                        </div>
                    </div>
                    <div>
                        S M T W T F S
                    </div>
                    <div>
                        <div>
                            <i class="material-icons">notifications-active</i>&nbsp;&nbsp;The Morning Breaks
                        </div>
                        <div>
                            <i class="fas fa-check-square"></i> Vibrate
                        </div>
                    </div>
                    <div>
                        <div>
                            <i class="fas fa-tag"></i>&nbsp;&nbsp;&nbsp;Wake up
                        </div>
                    </div>
                </div>
                <hr>
                <div class="controls">
                    <div class="control-button"> 
                        <span class="material-icons main-button control-button" @click=${() => console.log("Add alarm")}>
                            add
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

}

customElements.define('time-alarm', TIMEAlarm);