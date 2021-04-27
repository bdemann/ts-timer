import {
    html,
    render as litRender,
} from 'lit-html'

import {
    createObjectStore
} from 'reduxular'

type State = Readonly<{
}>;

const InitialState: State = {
}

class TIMETemplate extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state) => litRender(this.render(state), this.shadowRoot), this);
    readonly shadow = this.attachShadow({
        mode: 'open'
    });

    render(state: State) {
        return html`
        `;
    }

}

customElements.define('time-template', TIMETemplate);