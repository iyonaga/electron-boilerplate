import * as React from 'react';
import * as ReactDom from 'react-dom';

import './styles/styles.global.scss';
import App from './components/App';

const render = (Component: any) : void => {
  ReactDom.render(<Component />, document.getElementById('app'));
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
