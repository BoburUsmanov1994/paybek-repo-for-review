import React from 'react';
import ReactDOM from 'react-dom';
import Theme from "./theme";
import Router from "./router";
import 'react-toastify/dist/ReactToastify.css';
import 'react-tabs/style/react-tabs.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './assets/styles/style.scss';
import Auth from "./services/auth/Auth";
import Store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <Store>
            <Auth>
                <Theme>
                    <Router/>
                </Theme>
            </Auth>
        </Store>
    </React.StrictMode>,
    document.getElementById('root')
);


