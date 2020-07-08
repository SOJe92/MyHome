import 'bootstrap'
import 'jquery-validation'
import 'jquery-validation-unobtrusive'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Redux from 'redux';
import React from 'react'
import { render } from 'react-dom'
import { Provider, ReactReduxContext } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import App from './App'
import { apiService, customstore } from './system/system';
import * as serviceWorker from './serviceWorker';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });
const store = customstore.default();

async function boot() {
    // set environment to be visible on global scope
    (window as any).process = { env: { NODE_ENV: process.env.NODE_ENV } };

    // set base url for api calls
    apiService.setBaseUrl(`${baseUrl}api/`);
    apiService.setPrivateApiDomain(`/private`);

    // fetch access token (for dev-mode impersonation)
    //await apiService.getAccessToken();

    // apply module and activity permissions
    //await permissionsService.apply(MODULE_ID);

    // set initial route to load if route is empty (/)
    //locationReduxBinder.defaultRoute = '/overview/dashboard';

    // load the root element
    render(
        <Provider store={store}>
          <ConnectedRouter history={history} context={ReactReduxContext}>
            <App />
          </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    )
	serviceWorker.register();
}
boot();
