import React, { EffectCallback } from 'react';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {IUser} from '../types/index';

const FEED_QUERY = gql`
    query userQuery($userId: ID!) {
        singleUser(userId: $userId) {
            id
            email
            username
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

const Feed = () => {
    const {currentUser} = React.useContext(AuthContext);
    const {userData, setUser} = React.useContext(UserContext);
    const [userQuery, {data, loading}] = useLazyQuery<{singleUser: IUser | null}, {userId: number}>(FEED_QUERY);

    const getUserData = async () => {
        if (currentUser && setUser) {
            await userQuery({variables: {userId: currentUser.id}});
            if (data && data.singleUser) {
                setUser({...userData, ...data.singleUser});
            }
        }
    };
    React.useEffect(() => {
        getUserData();
    }, [loading]);

    console.log('DATA', data, userData);
    return (
        <div>
            <h3>Feed Here</h3>
        </div>
    )
};

export default Feed;
