import React from 'react';
import {AuthContext, useAuthState} from './AuthContext';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGGED_IN_USER_QUERY = gql`
    query getLoggedInUser {
        loggedInUser {
            id
            username
            email
            createdTasks {
                id
                title
                description
                assignedTo {
                    id
                    username
                }
                createdOn
                modified
            }
            assignedTasks {
                id
                title
                description
                createdBy {
                    id
                    username
                }
                createdOn
                modified
            }
        }
    }
`;

const AllContext: React.FC = ({children}) => {
    const {currentUser, logout, setCurrentUser} = useAuthState();
    const {data, loading} = useQuery(LOGGED_IN_USER_QUERY);
    const TOKEN = localStorage.getItem('TOKEN');

    React.useEffect(
        () => {
            if (!loading && TOKEN && data) {
                setCurrentUser({...data.loggedInUser});
            }
        },
        [loading, TOKEN],
    );

    return (
        <AuthContext.Provider value={{currentUser, logout, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AllContext;
