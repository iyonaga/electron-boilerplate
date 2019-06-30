import React from 'react';
import ReactDom from 'react-dom';

import './assets/styles/styles.global.scss';
import App from './components/App';

const render = Component => {
  ReactDom.render(<Component />, document.getElementById('app'));
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
