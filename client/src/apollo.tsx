import React from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import App from './App';

const TOKEN = localStorage.getItem('TOKEN');

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    headers: {
        Authorization: TOKEN ? `JWT ${TOKEN}` : '',
    },
});

const ApolloApp: React.FC = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default ApolloApp;
