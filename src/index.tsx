import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import DrawChart from './chart'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <DrawChart />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
