import React from 'react';
import ReactDOM from 'react-dom/client';

import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import {rootReducer} from './services/reducers';
import thunk from 'redux-thunk';

import './styles/vars.css';
import './styles/normalize.css';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
