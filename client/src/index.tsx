import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ApolloApp from './apollo';

ReactDOM.render(
    <BrowserRouter>
        <ApolloApp />
    </BrowserRouter>,
    document.getElementById('root'),
);

serviceWorker.unregister();
