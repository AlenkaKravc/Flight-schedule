import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routers';
import {storeFactory} from './reducers';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import initialState from './data/flights';



const store = storeFactory(initialState);

const render = () =>
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'));

store.subscribe(render);
render();

registerServiceWorker();
