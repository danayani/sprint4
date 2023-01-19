import React from 'react'
import ReactDOM from 'react-dom/client'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { RootCmp } from './root-cmp'
import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RootCmp />
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
