import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Gallery from './components/Gallery';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Router>
        <div>
          <Switch>
				    <Route exact path="/" component={App} />
            <Route path="/gallery" component={Gallery} />
          </Switch>
        </div>
    </Router>
  </Web3ReactProvider>,
  document.getElementById('root')
);

