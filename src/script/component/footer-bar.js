class FooterBar extends HTMLElement{
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowDOM.innerHTML = `
        <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        :host {
          display: flex;
          width: 100%;
          background-color: #6C4AB6;
          color: white;
        }
        p {
          padding: 24px 0;   
          margin : 0 auto;       
        }
        </style>

        <p>© 2022 Reserved by Muhammad Harun | Powered by Dicoding.com</p>
        `;
    }
}

customElements.define('footer-bar', FooterBar);