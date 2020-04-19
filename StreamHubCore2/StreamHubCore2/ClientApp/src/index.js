import React from "react";
import ReactDOM from 'react-dom';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import './index.css';
import App from './components/App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();