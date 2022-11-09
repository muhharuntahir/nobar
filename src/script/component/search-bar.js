class SearchBar extends HTMLElement{
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    set clickEvent(event){
        this._clickEvent = event;
        this.render();
    }

    get value(){
        return this.shadowDOM.querySelector('#searchElement').value;
    }

    render() {
        this.shadowDOM.innerHTML = `
      <style>
      .search-container {
            max-width: 900px;
            padding: 14px;
            border-radius: 5px;
            display: flex;
            position: sticky;
            top: 10px;
            background-color: white;
            margin : 0 auto;
        }
        
        .search-container > input {
            width: 75%;
            padding: 16px;
            border: 0;
            font-weight: bold;
            color: #6C4AB6;
        }
        
        .search-container > input:focus {
            outline: 0;
            color : #6C4AB6;
        }
        
        .search-container > input:focus::placeholder {
            font-weight: bold;
        }
        
        .search-container >  input::placeholder {
            color:  #d6c6ff;
            font-weight: normal;
        }
        
        .search-container > button {
            border-radius: 5px;
            width: 25%;
            cursor: pointer;
            margin-left: auto;
            padding: 16px;
            background-color: #6C4AB6;
            color: white;
            border: 0;
            text-transform: uppercase;
        }
        
        @media screen and (max-width: 550px){
            .search-container {
                flex-direction: column;
                position: static;
            }
        
            .search-container > input {
                width: 100%;
                margin-bottom: 12px;
            }
        
            .search-container > button {
                width: 100%;
            }
        }
      </style>
      
      <div id="search-container" class="search-container">
            <input placeholder="Search movie name" id="searchElement" type="search">
            <button id="searchButtonElement" type="submit">Search</button>
        </div>
    `;

        this.shadowDOM.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
    }
}

customElements.define('search-bar', SearchBar);