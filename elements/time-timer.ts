import {
    html,
    render as litRender,
} from 'lit-html'

class TIMETimer extends HTMLElement {
    percentComplete: number;
    running: boolean;
    runTime: number;
    startTime: Date;

    constructor() {
        super();
        this.startTime = new Date();
        this.percentComplete = 0;
        this.running = true;
    }

    connectedCallback() {
        litRender(this.render(), this);
        setInterval(() => this.updateStopwatch(this), 10);
    }

    updateStopwatch(self: TIMETimer) {
        if (self.running) {
            self.runTime = new Date().getTime() - self.startTime.getTime();
            self.percentComplete = 4 * self.runTime / 1000;
            litRender(self.render(), self);
        }
    }

    render() {
        return html`
            <style>
                #timer {
                    padding-top: 150px;
                    color: #8ab4f8;
                    font-size: 50pt;
                    text-align: center;
                }
                .box {
                    margin: 0 auto;
                    position: relative;
                    width: 206px;
                    height: 206px;
                    justify-content: center;
                    align-items: center;
                }
                .box .percent {
                    position: relative;
                    width: 206px;
                    height: 206px;
                }
                .box .percent svg {
                    transform: rotate(-90deg);
                    position: relative;
                    width: 206px;
                    height: 206px;
                }
                
                .box .percent svg circle {
                    width: 150px;
                    height: 150px;
                    fill: none;
                    stroke: black;
                    stroke-width: 6;
                    transform: translate(3px, 3px);
                    stroke-dasharray: 630;
                    stroke-dashoffset: 630;
                    stroke-linecap: round;
                }

                .box .percent svg circle:nth-child(1){
                    stroke-dashoffset: 0;
                    stroke: white;
                }
                .box .percent svg circle:nth-child(2){
                    stroke-dashoffset: calc(630 - (630 * ${this.percentComplete}) / -100);
                    stroke: #8ab4f8;
                }
            </style>
            <div id="timer-body">
                <div class="box">
                    <div class="percent">
                        <svg>
                            <circle cx="100", cy="100" r="100"></circle>
                            <circle cx="100", cy="100" r="100"></circle>
                        </svg>
                    </div>
                </div>
                <div id="timer">0:00</div>
                <button>start</button>
            </div>
        `;
    }

}

customElements.define('time-timer', TIMETimer);