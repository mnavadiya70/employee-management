import React, { Component } from "react";
import i18next from 'i18next';

import '../langauge/configuration';
import { setLocalStorage as SetLocalStorage, getLocalStorage as GetLocalStorage} from '../store/localStorage';

class header extends Component {

    languageChangeHandler = (e) => {
        
        i18next.changeLanguage(e.target.value);
        SetLocalStorage("language", e.target.value);
    }

    render() {
        const lang = GetLocalStorage("language");
        return (
            <div>
                <select onChange={(e) => this.languageChangeHandler(e)}>
                    <option value="en" selected={lang === "en"}>English</option>
                    <option value="es" selected={lang === "es"}>Spanish</option>
                </select>
            </div>
        )
    }
}

export default header;