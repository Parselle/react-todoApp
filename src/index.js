import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store';

import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';
import ApiService from './services/api-service';
import {ApiServiceProvider} from './components/ApiServiceContext/ApiServiceContext';
import App from './components/App/App';

import './styles/main.sass';

const apiService = new ApiService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ApiServiceProvider value={apiService}>
        <Router>
          <App />
        </Router>
      </ApiServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);