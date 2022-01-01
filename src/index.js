import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/scss/main.scss'
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';


const store = createStore(()=>{
  return {birds:'furat',}
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
