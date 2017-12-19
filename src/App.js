import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { injectGlobal } from 'styled-components';

import { Main } from './Lottery/Main'
/*eslint-disable */

injectGlobal`
  body {
    font-size: 16px;
    @media only screen and (max-width: 320px) {
        font-size: 14px;
    }
    @media only screen and (min-width: 480px) {
        font-size: 21px;
        font-family: 'Taviraj', serif;
    }
    .map-layer {
      fill: #fff;
      stroke: #aaa;
    }
  }
`;
/*eslint-enable */

// window.sr = ScrollReveal();
// window.sr.reveal('.sr');

const App = () => (
  <Router>
    <div>
      <Route path="/" component={Main}/>
    </div>
  </Router>
)

export default App;


    //"json2xls": "^0.1.2",
    //"lokka": "^1.7.0",
    //"lokka-transport-http": "^1.6.1",
    //"randomcolor": "^0.5.3",
    //"react-wordcloud": "0.0.1",